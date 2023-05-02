import React, { useState, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import './WebGLApple.css';

//Uses the react-unity-webgl libary found at https://react-unity-webgl.dev/ with lots of code being taken from there as well
//The webGL window for the Apple game
const WebGLWindow = props => {

  const [loaded, setLoaded] = useState(false); //is true whenever the game window is rendered
  const [finished, setFinished] = useState(true); //is true between the time when the game starts unloading and when it is finished
  const [score, setScore] = useState(0); //this game uses a score

  //Each game window is its own file because this here is pretty hardcoded to only let one unityProvide exist per file
  let {  unityProvider , loadingProgression, isLoaded, unload, addEventListener, removeEventListener} = useUnityContext({
    loaderUrl: "./games/apple/build/play.loader.js",
    dataUrl: "./games/apple/build/play.data",
    frameworkUrl: "./games/apple/build/play.framework.js",
    codeUrl: "./games/apple/build/play.wasm",
  }); 

  //This combined with some special code in the unity game lets the score from the game be stored in the javascript
  useEffect(() => {
    addEventListener("SetScore", setScore);
    return () => {
      removeEventListener("SetScore", setScore);
    };
  }, [addEventListener, removeEventListener, setScore]);

  //The game has to fully unload before the window can be removed from the screen or it causes an error
  async function unloadGame() {
    if (loaded === true) {
      props.onAddScore(score); //The score is updated on the server side once the game is unloaded, not when the game assigns the player a score
      setLoaded(false);
      await unload();
      setFinished(true);
    }
  }

  //The width and height need to be placed here and not in the css file or the window will expand forever and crash your computer
  if (props.active) { //if the game is supposed to be active, simply display it
    if (loaded === false) {
      setLoaded(true);
    }
    if (finished === true) {
      setFinished(false);
    }
    return <div className="unity">
      <Unity unityProvider={unityProvider} style={{ width: "800px", height: "600px" }} />;
    </div>
  } else { //if the game is supposed to be unloaded, first wait for the game to unload before getting rid of the Unity element
    if (loaded === true) {
      unloadGame();
    }

    if (finished === true) {
      return <div/>;
    } else {
      return <div className="unity">
        <Unity unityProvider={unityProvider} style={{ width: "800px", height: "600px" }} />;
      </div>
    }
  }
  
};

export default WebGLWindow;