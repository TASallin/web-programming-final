import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import NewComment from './components/Comments/NewComment';
import GameList from './components/Games/GameList';
import WebGLWindow from './components/WebGL/WebGLWindow';
import WebGLApple from './components/WebGL/WebGLApple';
import WebGLEscape from './components/WebGL/WebGLEscape';
import WebGLMusic from './components/WebGL/WebGLMusic';
import { Unity, useUnityContext } from "react-unity-webgl";
import Post from './components/Comments/Post';
import PostList from './components/Comments/PostList';
import Login from './components/Login/Login';
import Leaderboard from './components/Scores/Leaderboard';
import './App.css';

function App() {
  const [loadedComments, setLoadedComments] = useState([]);
  const [loadedScores, setLoadedScores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [path, setPath] = useState(0);
  const [isGame, setIsGame] = useState(false);
  const [active0, setActive0] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [isGuest, setIsGuest] = useState(true);

  const [games, setGames] = useState([
    { id: 'game1', text: 'Survival Horror on a budget', link: 0, name: 'Resident Apple For', thumbnail: "./apple.png" },
    { id: 'game2', text: 'Get all the keys and escape!', link: 1, name: 'Escape Room', thumbnail: "./escapeRoom.png" },
    { id: 'game3', text: 'Find enough change to pay for the pizza and then eat it', link: 2, name: 'Wesker Orders a Pizza', thumbnail: "./pizza.png" },
    { id: 'game4', text: 'Find the secret and play music with your keyboard', link: 3, name: 'Music Land', thumbnail: "./musicLand.png" },
  ]);

  /*
  const {  unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "./games/pizza/build/play.loader.js",
    dataUrl: "./games/pizza/build/play.data",
    frameworkUrl: "./games/pizza/build/play.framework.js",
    codeUrl: "./games/pizza/build/play.wasm",
  });
  */

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      if (isGame) {
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

        console.log("Fetching comments: " + responseData);
         
        setLoadedComments(responseData.comments);

        const response2 = await fetch('http://localhost:5000/highscores', {
          method: 'PATCH',
          body: JSON.stringify(theGame),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const responseData2 = await response2.json();

        console.log("Fetching scores: " + responseData2);
         
        setLoadedScores(responseData2.scores);

        setIsLoading(false);
      } else {
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

        console.log("Fetching comments: " + responseData);

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

        console.log("Fetching scores: " + responseData2);

        setLoadedScores(responseData2.scores);

        setIsLoading(false);
      }
      
      
    };

    fetchProducts();
  }, [path, isGame, username]);


  const addCommentHandler = async (comment) => {
    try {

      console.log(comment);

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

      //setLoadedComments(prevComments => {
      //  return prevComments.concat({
      //    ...newComment,
      //    id: responseData.comment.id
      //  });
      //});
    } catch (error) {
      alert(error.message || 'Something went wrong!');
    }
  };

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

      //setLoadedComments(prevComments => {
      //  return prevComments.concat({
      //    ...newComment,
      //    id: responseData.comment.id
      //  });
      //});
    } catch (error) {
      alert(error.message || 'Something went wrong!');
    }
  };

  const playGameHandler = async (path) => {
    setPath(path);
    setIsGame(true);
    if (path == 0) {
      setActive0(true);
      setActive1(false);
      setActive2(false);
      setActive3(false);
    } else if (path == 1) {
      setActive0(false);
      setActive1(true);
      setActive2(false);
      setActive3(false);
    } else if (path == 2) {
      setActive0(false);
      setActive1(false);
      setActive2(true);
      setActive3(false);
    } else if (path == 3) {
      setActive0(false);
      setActive1(false);
      setActive2(false);
      setActive3(true);
    }
  };

  const stopGameHandler = async () => {
    setActive0(false);
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setIsGame(false);
  }

  const loginHandler = async (newName) => {
    setUsername(newName);
    setIsGuest(false);
  }

  const logoutHandler = async() => {
    setIsGuest(true);
    setUsername("Guest");
  }

  //return <Unity unityProvider={unityProvider} />;
  
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
            {(!isLoading && isGame && active0) && <Leaderboard className = "comments" items={loadedScores} />}
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
