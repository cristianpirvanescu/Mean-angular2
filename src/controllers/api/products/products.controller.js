const productsRepo = require('../../../lib/productsRepository'),
      util = require('util'),
      fs = require('fs'),
      multer = require('multer');
      

class ProductsController {

    constructor(router) {
        router.get('/', this.getProducts.bind(this));
        router.get('/page/:skip/:top', this.getProductsPage.bind(this));
        router.get('/:id', this.getProduct.bind(this));
        router.post('/', this.insertProduct.bind(this));
        router.put('/:id', this.updateProduct.bind(this));
        router.delete('/:id', this.deleteProduct.bind(this));
    }

    getProducts(req, res) {
        console.log('*** getProducts');
        productsRepo.getProducts((err, data) => {
            if (err) {
                console.log('*** getProducts error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getProducts ok');
                res.json(data.products);
            }
        });
    }

    getProductsPage(req, res) {
        console.log('*** getProductsPage');
        const topVal = req.params.top,
              skipVal = req.params.skip,
              top = (isNaN(topVal)) ? 10 : +topVal,
              skip = (isNaN(skipVal)) ? 0 : +skipVal;

        productsRepo.getPagedProducts(skip, top, (err, data) => {
            res.setHeader('X-InlineCount', data.count);
            if (err) {
                console.log('*** getProductsPage error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getProductsPage ok');
                res.json(data.products);
            }
        });
    }

    getProduct(req, res) {
        console.log('*** getProduct');
        const id = req.params.id;
        console.log(id);

        productsRepo.getProduct(id, (err, product) => {
            if (err) {
                console.log('*** getProduct error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getProduct ok');
                res.json(product);
            }
        });
    }

    insertProduct(req, res) {
        console.log('*** insertProduct');
        let imgData = fs.readFileSync(req.files.userPhoto.path)        
        productsRepo.insertProduct(req.body, imgData,'image/png', (err, product) => {
            if (err) {
                console.log('*** productsRepo.insertProduct error: ' + util.inspect(err));
                res.json({status: false, error: 'Insert failed', product: null});
            } else {
                console.log('*** insertProduct ok');
                res.json({ status: true, error: null, product: product });
            }
        });
    }

    updateCustomer(req, res) {
        console.log('*** updateCustomer');
        console.log('*** req.body');
        console.log(req.body);

        if (!req.body || !req.body.stateId) {
            throw new Error('Customer and associated stateId required');
        }

        statesRepo.getState(req.body.stateId, (err, state) => {
            if (err) {
                console.log('*** statesRepo.getState error: ' + util.inspect(err));
                res.json({ status: false, error: 'State not found', customer: null });
            } else {
                customersRepo.updateCustomer(req.params.id, req.body, state, (err, customer) => {
                    if (err) {
                        console.log('*** updateCustomer error: ' + util.inspect(err));
                        res.json({ status: false, error: 'Update failed', customer: null });
                    } else {
                        console.log('*** updateCustomer ok');
                        res.json({ status: true, error: null, customer: customer });
                    }
                });
            }
        });
    }

    deleteCustomer(req, res) {
        console.log('*** deleteCustomer');

        customersRepo.deleteCustomer(req.params.id, (err) => {
            if (err) {
                console.log('*** deleteCustomer error: ' + util.inspect(err));
                res.json({ status: false });
            } else {
                console.log('*** deleteCustomer ok');
                res.json({ status: true });
            }
        });
    }

}

module.exports = CustomersController;