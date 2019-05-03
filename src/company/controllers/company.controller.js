const Company = require('../models/company.model');

module.exports = {
    create(req, h) {
        if (!req.payload.name) {
            console.log('no name');
            return h.response({
                err: 'name is required field'
            }).code(400);
        }

        return Company.create({
            name: req.payload.name,
            city: req.payload.city,
            address: req.payload.address
        }).then((savedCompany) => {

            return {
                message: "Company created successfully",
                company: savedCompany
            };

        }).catch((err) => {

            return {
                err: err
            };

        });

    },
    find(req, h) {
        return Company.find({}).exec().then((company) => {
            return {
                companies: company
            };
        }).catch((err) => {
            return {
                err: err
            };
        });
    },
    findOne(req, reply) {
        return Company.findById(req.params.id).exec().then((company) => {

            if (!company) return {
                message: 'Company not Found'
            };

            return {
                company: company
            };

        }).catch((err) => {

            return {
                err: err
            };

        });
    },
    update(req, reply) {

        return Company.findById(req.params.id).exec().then((company) => {

            if (!company) return {
                err: 'Company not found'
            };

            if (req.payload.name) {
                company.name = req.payload.name;
            }
            if (req.payload.city) {
                company.city = req.payload.city;
            }
            if (req.payload.address) {
                company.address = req.payload.address;
            }

            company.save();

        }).then((data) => {

            return {
                message: "Company data updated successfully"
            };

        }).catch((err) => {

            return {
                err: err
            };

        });

    },
    delete(req, h) {

        return Company.findByIdAndRemove(req.params.id).exec().then((company) => {

            if (!company) return { message: 'Company not found' };

            return {
                success: true
            };
        }).catch((err) => {
            return {
                dberror: err
            };
        });

    }

};