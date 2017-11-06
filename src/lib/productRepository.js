const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Product = require('../models/product');

class ProductsRepository {

    // get all the Products
    getProducts(callback) {
        console.log('*** ProductsRepository.getProducts');
        Product.count((err, custsCount) => {
            let count = custsCount;
            console.log(`Products count: ${count}`);

            Product.find({}, (err, Products) => {
                if (err) { 
                    console.log(`*** ProductsRepository.getProducts error: ${err}`); 
                    return callback(err); 
                }
                callback(null, {
                    count: count,
                    Products: Products
                });
            });

        });
    }

    getPagedProducts(skip, top, callback) {
        console.log('*** ProductsRepository.getPagedProducts');
        Product.count((err, custsCount) => {
            let count = custsCount;
            console.log(`Skip: ${skip} Top: ${top}`);
            console.log(`Products count: ${count}`);

            Product.find({})
                    .sort({name: 1})
                    .skip(skip)
                    .limit(top)
                    .exec((err, Products) => {
                        if (err) { 
                            console.log(`*** ProductsRepository.getPagedProducts error: ${err}`); 
                            return callback(err); 
                        }
                        callback(null, {
                            count: count,
                            Products: Products
                        });
                    });

        });
    }


    // get a  Product
    getProduct(id, callback) {
        console.log('*** ProductsRepository.getProduct');
        Product.findById(id, (err, Product) => {
            if (err) { 
                console.log(`*** ProductsRepository.getProduct error: ${err}`); 
                return callback(err); 
            }
            callback(null, Product);
        });
    }

    insertProduct(body, imgData, imgContentType, callback) {
        console.log('*** ProductsRepository.insertProduct');
        console.log(state);
        let Product = new Product();
        let newState = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }
        console.log(body);

        Product.name = body.name;
        Product.price = body.price;
        Product.stockQty = body.stockQty;
        Product.img.contentType = imgContentType;
        Product.img.data = imgData;

        Product.save((err, Product) => {
            if (err) { 
                console.log(`*** ProductsRepository insertProduct error: ${err}`); 
                return callback(err, null); 
            }

            callback(null, Product);
        });
    }
    
    // insert a  Product
    insertProduct2(body, state, callback) {
        console.log('*** ProductsRepository.insertProduct');
        console.log(state);
        let Product = new Product();
        let newState = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }
        console.log(body);

        Product.firstName = body.firstName;
        Product.lastName = body.lastName;
        Product.email = body.email;
        Product.address = body.address;
        Product.city = body.city;
        Product.state = newState;
        Product.stateId = newState.id;
        Product.zip = body.zip;
        Product.gender = body.gender;

        Product.save((err, Product) => {
            if (err) { 
                console.log(`*** ProductsRepository insertProduct error: ${err}`); 
                return callback(err, null); 
            }

            callback(null, Product);
        });
    }

    updateProduct(id, body, imgData, imgContentType, callback) {
        console.log('*** ProductsRepository.editProduct');

        Product.findById(id, (err, Product)  => {
            if (err) { 
                console.log(`*** ProductsRepository.editProduct error: ${err}`); 
                return callback(err); 
            }

            Product.name = body.name || Product.name;
            Product.price = body.price || Product.price;
            Product.stockQty = body.stockQty || Product.stockQty;
            //Product.img.contentType = 'image/png';
            Product.img.contentType = imgContentType;
            Product.img.data = imgData || Product.img.data;

            Product.save((err, Product) => {
                if (err) { 
                    console.log(`*** ProductsRepository.updateProduct error: ${err}`); 
                    return callback(err, null); 
                }

                callback(null, Product);
            });

        });
    }

    // delete a Product
    deleteProduct(id, callback) {
        console.log('*** ProductsRepository.deleteProduct');
        Product.remove({ '_id': id }, (err, Product) => {
            if (err) { 
                console.log(`*** ProductsRepository.deleteProduct error: ${err}`); 
                return callback(err, null); 
            }
            callback(null, Product);
        });
    }

}

module.exports = new ProductsRepository();