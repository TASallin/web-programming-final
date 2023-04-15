import React, { useState, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";

const WebGLWindow = props => {

  const [loaded, setLoaded] = useState(false);
  const [finished, setFinished] = useState(true);

  let {  unityProvider , loadingProgression, isLoaded, unload} = useUnityContext({
    loaderUrl: "./games/pizza/build/play.loader.js",
    dataUrl: "./games/pizza/build/play.data",
    frameworkUrl: "./games/pizza/build/play.framework.js",
    codeUrl: "./games/pizza/build/play.wasm",
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
    return <Unity unityProvider={unityProvider} />;
  } else {
    console.log(loaded);
    if (loaded === true) {
      unloadGame();
    }
    if (finished === true) {
      return <p>No game selected</p>;
    } else {
      return <Unity unityProvider={unityProvider} />;
    }
  }
  
};

export default WebGLWindow;