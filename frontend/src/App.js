import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import NewProduct from './components/Products/NewProduct';
import ProductList from './components/Products/ProductList';
import PortfolioList from './components/PortfolioList/PortfolioList';
import WebGLWindow from './components/WebGL/WebGLWindow';
import WebGLApple from './components/WebGL/WebGLApple';
import { Unity, useUnityContext } from "react-unity-webgl";
import Post from './components/Products/Post';
import PostList from './components/Products/PostList';
import './App.css';

function App() {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [path, setPath] = useState(0);
  const [active0, setActive0] = useState(false);
  const [active2, setActive2] = useState(false);

  const [games, setGames] = useState([
    { id: 'game1', text: 'Platformer a team of us created during the apocalypse game jam', link: 0, name: 'After The Flood' },
    { id: 'game2', text: 'My final project for game prototyping, where you steal coffee from your boss', link: 1, name: 'Coffee Thief' },
    { id: 'game3', text: 'A project during game development featuring Unity pro-builder and terrain', link: 2, name: 'Wesker Orders a Pizza' },
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
    console.log("Fin");
    console.log(path);
    setPath(path);
    if (path == 0) {
      setActive0(true);
      setActive2(false);
    } else {
      setActive0(false);
      setActive2(true);
    }
  };

  //return <Unity unityProvider={unityProvider} />;
  
  return (
    <React.Fragment>
      <Header />
      <main>
        {!isLoading && <WebGLApple active={active0} />}
        {!isLoading && <WebGLWindow active={active2} />}
        <NewProduct onAddProduct={addProductHandler} />
        {isLoading && <p className="loader">Loading...</p>}
        {!isLoading && <PostList items={loadedProducts} />}
        {!isLoading && <ProductList playGameHandler={playGameHandler} items={games} />}
      </main>
    </React.Fragment>
  );
}

export default App;
