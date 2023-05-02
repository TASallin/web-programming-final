import React, { useState, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import './WebGLMoth.css';

//See WebGLApple for more detailed comments
//The webGL window for the Moth Simulator game
const WebGLWindow = props => {

  const [loaded, setLoaded] = useState(false);
  const [finished, setFinished] = useState(true);
  const [score, setScore] = useState(0);

  let {  unityProvider , loadingProgression, isLoaded, unload, addEventListener, removeEventListener} = useUnityContext({
    loaderUrl: "./games/moth/play.loader.js",
    dataUrl: "./games/moth/play.data",
    frameworkUrl: "./games/moth/play.framework.js",
    codeUrl: "./games/moth/play.wasm",
  }); 

  useEffect(() => {
    addEventListener("SetScore", setScore);
    return () => {
      removeEventListener("SetScore", setScore);
    };
  }, [addEventListener, removeEventListener, setScore]);

  async function unloadGame() {
    if (loaded === true) {
      props.onAddScore(score);
      setLoaded(false);
      await unload();
      setFinished(true);
    }
  }

  if (props.active) {
    if (loaded === false) {
      setLoaded(true);
    }
    if (finished === true) {
      setFinished(false);
    }
    return <div className="unity">
      <Unity unityProvider={unityProvider} style={{ width: "800px", height: "600px" }} />;
    </div>
  } else {
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