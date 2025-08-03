const mongoose = requie('mongoose');
const Schema = mongoose.Schema;

//categories => field => ['type', 'color']
const categories_model = new Schema({
    type:{ type: String, default: "Investment"},
    color:{ type: String, default: '#FCBE44'}
})

//transactions => field => ['name', 'type', 'amount', 'date']
const transaction_model = new Schema({
    name: {type: String, default: "Anonymous"},
    type: {type: String, default: "Select a Transaction Type"}, 
    amount: {type: Number},
    date: {type: date, default: date.now}
})

mongoose.model('categories', categories_model)
mongoose.model('transaction', transaction_model);

exports.default = transaction_model;
module.exports = {
    Categories,
    Transaction
}