const mongoose = require('mongoose');

const Comment = require('./models/comment');

const database = 'GameTrack';
const url = "mongodb+srv://TristanSallin:SoliIsAKitten133@cluster0.ohpsmwj.mongodb.net/GameTrack?retryWrites=true&w=majority";

// sample mongodb url- please generate your own
mongoose.connect(url).then(() => {
    console.log('Connected to database!')
}).catch(() => {
    console.log('Connection failed!')
});

const createComment = async (req, res, next) => {
	console.log('Creating a new comment object!');
	const createdComment = new Comment({
	  game: req.body.game,
	  author: req.body.author,
	  comment: req.body.comment
	});
	
	const result = await createdComment.save();
	console.log('Result: ' + JSON.stringify(result));
	// res.json(result);
	res.status(201)
    .json({ message: 'Created new comment.', comment: result });
  };
  
const getComments = async (req, res, next) => {
	console.log('Requesting the list of comments!');
	if (req.body.game) {
	  const comments = await Comment.find({game: req.body.game}).exec();
	  // console.log('Result: ' + JSON.stringify(products));
	  // res.json(products);
	  res.status(200).json({ comments: comments });
	} else if (req.body.author) {
      const comments = await Comment.find({author: req.body.author}).exec();;
	  res.status(200).json({ comments: comments });
	} else {
	  const comments = await Comment.find().exec();
	  res.status(200).json({ comments: comments });
	}
	
  }
  
exports.createComment = createComment;
exports.getComments = getComments;
  
