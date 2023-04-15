const mongoose = require('mongoose');

const Product = require('./models/product');

const database = 'GameTrack';
const url = "mongodb+srv://TristanSallin:SoliIsAKitten133@cluster0.ohpsmwj.mongodb.net/GameTrack?retryWrites=true&w=majority";

// sample mongodb url- please generate your own
mongoose.connect(url).then(() => {
    console.log('Connected to database!')
}).catch(() => {
    console.log('Connection failed!')
});

const createProduct = async (req, res, next) => {
	console.log('Creating a new product object!');
	const createdProduct = new Product({
	  title: req.body.title,
	  price: req.body.price,
	  description: req.body.description
	});
	
	const result = await createdProduct.save();
	console.log('Result: ' + JSON.stringify(result));
	// res.json(result);
	res.status(201)
    .json({ message: 'Created new product.', product: result });
  };
  
const getProducts = async (req, res, next) => {
	console.log('Requesting the list of products!');
	const products = await Product.find().exec();
	// console.log('Result: ' + JSON.stringify(products));
	// res.json(products);
	res.status(200).json({ products: products });
  }
  
exports.createProduct = createProduct;
exports.getProducts = getProducts;
  
