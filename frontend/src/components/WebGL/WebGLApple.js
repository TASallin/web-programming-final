import React, { useState, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import './WebGLApple.css';

const WebGLWindow = props => {

  const [loaded, setLoaded] = useState(false);
  const [finished, setFinished] = useState(true);

  let {  unityProvider , loadingProgression, isLoaded, unload} = useUnityContext({
    loaderUrl: "./games/apple/build/play.loader.js",
    dataUrl: "./games/apple/build/play.data",
    frameworkUrl: "./games/apple/build/play.framework.js",
    codeUrl: "./games/apple/build/play.wasm",
  }); 

  async function unloadGame() {
    if (loaded === true) {
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