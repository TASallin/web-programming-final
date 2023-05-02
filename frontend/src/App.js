import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import NewComment from './components/Comments/NewComment';
import GameList from './components/Games/GameList';
import WebGLWindow from './components/WebGL/WebGLWindow';
import WebGLApple from './components/WebGL/WebGLApple';
import WebGLEscape from './components/WebGL/WebGLEscape';
import WebGLMusic from './components/WebGL/WebGLMusic';
import WebGLMoth from './components/WebGL/WebGLMoth';
import { Unity, useUnityContext } from "react-unity-webgl";
import Post from './components/Comments/Post';
import PostList from './components/Comments/PostList';
import Login from './components/Login/Login';
import Leaderboard from './components/Scores/Leaderboard';
import './App.css';

function App() {
  const [loadedComments, setLoadedComments] = useState([]); //list of comments either for the game or player based on screen
  const [loadedScores, setLoadedScores] = useState([]); //list of high scores either for the game or player based on screen
  const [isLoading, setIsLoading] = useState(false); //true when the server is busy or not running
  const [path, setPath] = useState(0); //represents which of the games was most recently selected
  const [isGame, setIsGame] = useState(false); //true when a game window is loaded
  const [active0, setActive0] = useState(false); //these four variables are for sending to the game windows telling them to load or unload
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const [username, setUsername] = useState("Guest"); //username. Defaults to Guest when no one is logged in
  const [isGuest, setIsGuest] = useState(true); //true when someone is logged in, controls the login/logout UI

  //the list of games, including their name, description, and image. The link and id fields are just for identification
  const [games, setGames] = useState([
    { id: 'game1', text: 'Survival Horror on a budget', link: 0, name: 'Resident Apple For', thumbnail: "./apple.png" },
    { id: 'game2', text: 'Get all the keys and escape!', link: 1, name: 'Escape Room', thumbnail: "./escapeRoom.png" },
    { id: 'game3', text: 'Find enough change to pay for the pizza and then eat it', link: 2, name: 'Wesker Orders a Pizza', thumbnail: "./pizza.png" },
    { id: 'game4', text: 'Find the secret and play music with your keyboard', link: 3, name: 'Music Land', thumbnail: "./musicLand.png" },
    { id: 'game5', text: 'Fly as far as you can!', link: 4, name: 'Moth Simulator', thumbnail: "./moth.png" },
  ]);

  //The useEffect is called whenever the scores and comments need to be reloaded, and requests them from the server
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      if (isGame) { //if in a game, get the comments and scores for that game
        const theGame = {
          game: games[path].name,
        };
        const response = await fetch('http://localhost:5000/comments', {
          method: 'PATCH',
          body: JSON.stringify(theGame),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const responseData = await response.json();
         
        setLoadedComments(responseData.comments);

        const response2 = await fetch('http://localhost:5000/highscores', {
          method: 'PATCH',
          body: JSON.stringify(theGame),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const responseData2 = await response2.json();
         
        setLoadedScores(responseData2.scores);

        setIsLoading(false);
      } else { //if not in a game, get the comments and scores for the player instead
        const theUser = {
          author: username,
        };
        console.log(username);
        const response = await fetch('http://localhost:5000/comments', {
          method: 'PATCH',
          body: JSON.stringify(theUser),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const responseData = await response.json();

        setLoadedComments(responseData.comments);

        const theUser2 = {
          player: username,
        };
        const response2 = await fetch('http://localhost:5000/highscores', {
          method: 'PATCH',
          body: JSON.stringify(theUser2),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const responseData2 = await response2.json();

        setLoadedScores(responseData2.scores);

        setIsLoading(false);
      }
      
      
    };

    fetchProducts();
  }, [path, isGame, username]);

  //Adds a new comment and makes a request to the server to add it to the database
  const addCommentHandler = async (comment) => {
    try {
      const newComment = {
        game: games[path].name,
        author: username,
        comment: comment,
      };
      let hasError = false;
      const response = await fetch('http://localhost:5000/comment', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        hasError = true;
      }

      const responseData = await response.json();

      if (hasError) {
        throw new Error(responseData.message);
      }
    } catch (error) {
      alert(error.message || 'Something went wrong!');
    }
  };

  // Adds a new score and sends a request to the server to update the high score if necessary
  const addScoreHandler = async (score) => {
    try {

      console.log(score);

      const newScore = {
        game: games[path].name,
        player: username,
        score: score,
      };
      let hasError = false;
      const response = await fetch('http://localhost:5000/highscore', {
        method: 'POST',
        body: JSON.stringify(newScore),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        hasError = true;
      }

      const responseData = await response.json();

      if (hasError) {
        throw new Error(responseData.message);
      }

    } catch (error) {
      alert(error.message || 'Something went wrong!');
    }
  };

  //Called when a play button is pressed. Heavily hard-coded due to similar hardcoding issues with the game windows themselves
  const playGameHandler = async (path) => {
    setPath(path);
    setIsGame(true);
    if (path == 0) {
      setActive0(true);
      setActive1(false);
      setActive2(false);
      setActive3(false);
      setActive4(false);
    } else if (path == 1) {
      setActive0(false);
      setActive1(true);
      setActive2(false);
      setActive3(false);
      setActive4(false);
    } else if (path == 2) {
      setActive0(false);
      setActive1(false);
      setActive2(true);
      setActive3(false);
      setActive4(false);
    } else if (path == 3) {
      setActive0(false);
      setActive1(false);
      setActive2(false);
      setActive3(true);
      setActive4(false);
    } else if (path == 4) {
      setActive0(false);
      setActive1(false);
      setActive2(false);
      setActive3(false);
      setActive4(true);
    }
  };

  //called when the stop button is pressed, and unloads the game window
  const stopGameHandler = async () => {
    setActive0(false);
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    setIsGame(false);
  }

  //called when the user clicks the login button
  const loginHandler = async (newName) => {
    setUsername(newName);
    setIsGuest(false);
  }

  //called when the user clicks the logout button and sets the username back to default
  const logoutHandler = async() => {
    setIsGuest(true);
    setUsername("Guest");
  }

  //Uses a grid to horizontally separate the elements, and keep the list of games at the bottom. Controls which elements are present
  //based on whether a game is loaded or if a user is logged in
  return (
    <React.Fragment>
      <Header />
      <main>
        <div className="grid-container">
          <div className="grid-item">
            <NewComment onAddComment={addCommentHandler} />
            {(!isLoading && isGame) && <PostList className = "comments" items={loadedComments} />}
          </div>
          <div className="grid-item">
            {<WebGLApple onAddScore={addScoreHandler} active={active0} />}
            {<WebGLEscape active={active1} />}
            {<WebGLWindow active={active2} />}
            {<WebGLMusic active={active3} />}
            {<WebGLMoth onAddScore={addScoreHandler} active={active4} />}
            {(!isLoading && !isGame) && <h2>My Comments</h2>}
            {(!isLoading && !isGame) && <PostList className = "comments" items={loadedComments} />}
            {(!isLoading && !isGame) && <Leaderboard className = "comments" items={loadedScores} />}
          </div>
          <div className="grid-item">
            <div className="login">
              {isGuest && <Login onLogin={loginHandler}/>}
              {!isGuest && <button type='button' className="logout-button" onClick={() => logoutHandler()}>Logout</button>}
              {!isGuest && <p className="welcome">Welcome, {username}</p>}
            </div>
            {(!isLoading && isGame && (active0 || active4)) && <Leaderboard className = "comments" items={loadedScores} />}
          </div>
        </div>
        
        
        <button type='button' className="stop-button" onClick={() => stopGameHandler()}>Stop Current Game</button>
        
        {isLoading && <p className="loader">Loading...</p>}
        
        {!isLoading && <GameList playGameHandler={playGameHandler} items={games} />}
      </main>
    </React.Fragment>
  );
}

export default App;
