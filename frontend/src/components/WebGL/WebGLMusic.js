import React, { useState, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import './WebGLMusic.css';

const WebGLMusic = props => {

  const [loaded, setLoaded] = useState(false);
  const [finished, setFinished] = useState(true);

  let {  unityProvider , loadingProgression, isLoaded, unload} = useUnityContext({
    loaderUrl: "./games/musicLand/Build/play.loader.js",
    dataUrl: "./games/musicLand/Build/play.data",
    frameworkUrl: "./games/musicLand/Build/play.framework.js",
    codeUrl: "./games/musicLand/Build/play.wasm",
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

export default WebGLMusic;