import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import NewProduct from './components/Products/NewProduct';
import ProductList from './components/Products/ProductList';
import PortfolioList from './components/PortfolioList/PortfolioList';
import WebGLWindow from './components/WebGL/WebGLWindow';
import WebGLApple from './components/WebGL/WebGLApple';
import WebGLEscape from './components/WebGL/WebGLEscape';
import WebGLMusic from './components/WebGL/WebGLMusic';
import { Unity, useUnityContext } from "react-unity-webgl";
import Post from './components/Products/Post';
import PostList from './components/Products/PostList';
import Login from './components/Login/Login';
import './App.css';

function App() {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [path, setPath] = useState(0);
  const [active0, setActive0] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [username, setUsername] = useState("Guest");

  const [games, setGames] = useState([
    { id: 'game1', text: 'Survival Horror on a budget', link: 0, name: 'Resident Apple For' },
    { id: 'game2', text: 'Get all the keys and escape!', link: 1, name: 'Escape Room' },
    { id: 'game3', text: 'Find enough change to pay for the pizza and then eat it', link: 2, name: 'Wesker Orders a Pizza' },
    { id: 'game4', text: 'Find the secret and play music with your keyboard', link: 3, name: 'Music Land' },
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
      const response = await fetch('http://localhost:5000/products');

      const responseData = await response.json();

      console.log("Fetching products: " + responseData);

      setLoadedProducts(responseData.products);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const addProductHandler = async (productName, productPrice, productDescription) => {
    try {

      console.log(productName + " " + productPrice + " " + productDescription);

      const newProduct = {
        title: productName,
        price: +productPrice, // "+" to convert string to number
        description: productDescription
      };
      let hasError = false;
      const response = await fetch('http://localhost:5000/product', {
        method: 'POST',
        body: JSON.stringify(newProduct),
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

      setLoadedProducts(prevProducts => {
        return prevProducts.concat({
          ...newProduct,
          id: responseData.product.id
        });
      });
    } catch (error) {
      alert(error.message || 'Something went wrong!');
    }
  };

  const playGameHandler = async (path) => {
    setPath(path);
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
  }

  const loginHandler = async (username) => {
    setUsername(username);
  }

  //return <Unity unityProvider={unityProvider} />;
  
  return (
    <React.Fragment>
      <Header />
      <main>
        <div className="login">
          <Login onLogin={loginHandler}/>
          <p className="welcome">Welcome, {username}</p>
        </div>
        {<WebGLApple active={active0} />}
        {<WebGLEscape active={active1} />}
        {<WebGLWindow active={active2} />}
        {<WebGLMusic active={active3} />}
        <button type='button' className="stop-button" onClick={() => stopGameHandler()}>Stop Current Game</button>
        <NewProduct onAddProduct={addProductHandler} />
        {isLoading && <p className="loader">Loading...</p>}
        {!isLoading && <PostList items={loadedProducts} />}
        {!isLoading && <ProductList playGameHandler={playGameHandler} items={games} />}
      </main>
    </React.Fragment>
  );
}

export default App;
