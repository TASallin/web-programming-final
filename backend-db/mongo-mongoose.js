const mongoose = require('mongoose');

const Comment = require('./models/comment');
const Score = require('./models/score');

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

const createScore = async (req, res, next) => {
	console.log('Creating a new score object!');
	const createdScore = new Score({
	  game: req.body.game,
	  player: req.body.player,
	  score: req.body.score
	});

	const existence = await Score.exists({game: req.body.game, player: req.body.player});
	if (existence === null) {
	  const result = await createdScore.save();
	  console.log('Result: ' + JSON.stringify(result));
	  // res.json(result);
	  res.status(201)
      .json({ message: 'Created new score.', comment: result });
	} else {
	  const filter = {game: req.body.game, player: req.body.player, score: {$lte: req.body.score}};
	  const update = {score: req.body.score};
	  const doc = await Score.findOneAndUpdate(filter, update);
	  res.status(201)
      .json({ message: 'Updated score.', comment: doc });
	}
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

const getScores = async (req, res, next) => {
	console.log('Requesting the list of scores!');
	if (req.body.game) {
	  const scores = await Score.find({game: req.body.game, score: {$gte: 1}}).sort({score: -1}).exec();
	  // console.log('Result: ' + JSON.stringify(products));
	  // res.json(products);
	  res.status(200).json({ scores: scores });
	} else if (req.body.player) {
      const scores = await Score.find({player: req.body.player, score: {$gte: 1}}).sort({score: -1}).exec();;
	  res.status(200).json({ scores: scores });
	} else {
	  const scores = await Score.find().exec();
	  res.status(200).json({ scores: scores });
	}
	
  }
  
exports.createComment = createComment;
exports.getComments = getComments;
exports.createScore = createScore;
exports.getScores = getScores;
  
