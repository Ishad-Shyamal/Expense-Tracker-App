// const model = require('../models/model');

// //post:http://localhost:8080/api/categories
// function create_categories(req, res){
//     const Create = new model.Categories({
//         type:"Savings",
//         color: '#1f3b5c' //dark
//     })

//     Create.save(function(err){
//         if(!err) return res.json(Create);
//         return res.status(400).json({ message: `Error while creating categories ${err}`});
//     })

// }

// module.exports = {
//     create_categories
// }

const model = require('../models/model');

//post:http://localhost:8080/api/categories
async function create_categories(req, res){
    try {
        const Create = new model.Categories({
            type:"Investment",
            color:'#fcbe44' 
        });

        await Create.save();
        return res.json(Create);
    } catch (err) {
        return res.status(400).json({ message: `Error while creating categories ${err}`});
    }
}

//get:http://localhost:8080/api/categories
async function get_Categories(req, res){
    let data = await model.Categories.find({});

    let filter = await data.map(v => Object.assign({}, { type: v.type, color: v.color}));
    return res.json(filter);
}

//post:http://localhost:8080/api/transaction
// async function create_Transaction(req, res){
//     if(!req.body) return res.status(400).json("Post HTTP Data not Provided.");
//     let {name, type, amount} = req.body;

//     const create = await new model.Transaction(
//         {
//             name,
//             type, 
//             amount,
//             date:new Date()
//         }
//     );

//     create.save(function(err){
//         if(!err) return res.json(create);
//         return res.status(400).json({ message: `Error while creating transaction ${err}`});
//     });

// }

//post:http://localhost:8080/api/transaction
async function create_Transaction(req, res){
    if(!req.body) return res.status(400).json("Post HTTP Data not Provided.");
    let {name, type, amount} = req.body;

    try {
        const create = new model.Transaction({
            name,
            type, 
            amount,
            date: new Date()
        });

        await create.save();
        return res.json(create);
    } catch (err) {
        return res.status(400).json({ message: `Error while creating transaction ${err}`});
    }
}

//get:http://localhost:8080/api/transaction
async function get_Transaction(req, res){
    let data = await model.Transaction.find({});
    return res.json(data);
}

// //delete:http://localhost:8080/api/transaction
// async function delete_Transaction(req, res){
//     if(!req.body) return res.status(400).json({ message: "Requested Body not Found"});
//     await model.Transaction.deleteOne(req.body, function(err){
//         if(!err) res.json("Record Deleted...!");
//     }).clone().catch(function(err){res.json("Error While Deleting Transaction Record")});
// }

//delete:http://localhost:8080/api/transaction
async function delete_Transaction(req, res){
    if(!req.body) return res.status(400).json({ message: "Requested Body not Found"});
    try {
        const result = await model.Transaction.deleteOne(req.body);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No matching record found to delete." });
        }
        res.json("Record Deleted...!");
    } catch (err) {
        res.status(400).json({ message: "Error While Deleting Transaction Record", error: err.message });
    }
}

//get:http://localhost:8080/api/labels
async function get_Labels(req, res){

    model.Transaction.aggregate([
        {
            $lookup : {
                from:"categories",
                localField: "type",
                foreignField: "type",
                as: "categories_info"
            }
        },
        {
            $unwind: "$categories_info"
        }
    ]).then(result => {
        let data = result.map(v => Object.assign({}, {_id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categories_info['color']}));
        res.json(data);
    }).catch(error => {
        res.status(400).json("Lookup Collection Error")
    })
}

module.exports = {
    create_categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
}