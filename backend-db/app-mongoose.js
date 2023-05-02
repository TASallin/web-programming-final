const express = require('express');
const bodyParser = require('body-parser');
const mongoPractice = require('./mongo-mongoose');


const app = express();

app.use(bodyParser.json());

//Most of this is copied from the mongoose example code
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
	  'Access-Control-Allow-Headers',
	  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader(
	  'Access-Control-Allow-Methods',
	  'GET, POST, PATCH, DELETE, OPTIONS'
	);
	next();
  });

//here are the routes. Patch is used over Get because there was an error when trying to send filters via JSON over a get method  
app.post('/comment', mongoPractice.createComment);

app.post('/highscore', mongoPractice.createScore);

app.patch('/comments', mongoPractice.getComments);

app.patch('/highscores', mongoPractice.getScores);

app.listen(5000);
