const mongoose = require('mongoose');

//Both models hold game and player information, as well as either the comment or score itself
const Comment = require('./models/comment');
const Score = require('./models/score');

const database = 'GameTrack';
const url = "mongodb+srv://TristanSallin:SoliIsAKitten133@cluster0.ohpsmwj.mongodb.net/GameTrack?retryWrites=true&w=majority";

// top part of code is from the mongoose example aside fom database, url name, and models
mongoose.connect(url).then(() => {
    console.log('Connected to database!')
}).catch(() => {
    console.log('Connection failed!')
});

//createComment adds a new comment to the database, keeping track of its game and author as well
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

// createScore is more particular than comments, and there can only be one score per player/game combination.
// if a score already exists, it is only changed if the new score is higher.
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
  
// getComments allows either a game or a player to be passed in as a filter. If neither exist, it returns all of the comments
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

 // getScores, like getComments, allows a game or player to be used as a filter, returning all scores if neither is found
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
  
