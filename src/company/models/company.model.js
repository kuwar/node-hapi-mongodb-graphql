const mongoose = require('mongoose');
const Database = require("../../config/database");

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: {
        required: true,
        type: String
    },
    city: String,
    address: String
});

let Company = mongoose.model('Company', CompanySchema);

module.exports = Company;