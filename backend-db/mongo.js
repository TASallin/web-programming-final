const MongoClient = require('mongodb').MongoClient;

const username = encodeURIComponent("classroom");
const password = encodeURIComponent("CSXu42BG855cOowd");
const database = 'SampleProducts';

const url = "mongodb+srv://classroom:CSXu42BG855cOowd@learningcluster.aj7eu.mongodb.net/?retryWrites=true&w=majority";

const createProduct = async (req, res, next) => {
	const newProduct = {
		title: req.body.title,
		price: req.body.price,
		description: req.body.description
	};

	console.log (req.body.title);
	console.log (req.body.price);
	const client = new MongoClient(url);

	try {
		await client.connect();
		const db = client.db(database);
		const result = await db.collection('products').insertOne(newProduct);
		console.log(result);
	} catch (error) {
		return res.json( { message: 'Could not store data: ' + error});
	} finally {
		await client.close();
	}

	//res.json(newProduct);
	res
    .status(201)
    .json({ message: 'Created new product.', product: newProduct });
};

const getProducts = async (req, res, next) => {
	const client = new MongoClient(url);
  
	let products;

	try {
	  await client.connect();
	  const db = client.db(database);
	  products = await db.collection('products').find().toArray();
	} catch (error) {
	  return res.json({message: 'Could not retrieve products: ' + error });
	} finally {
	  client.close();
	}
  
	res.json(products);
  };
  
exports.createProduct = createProduct;
exports.getProducts = getProducts;