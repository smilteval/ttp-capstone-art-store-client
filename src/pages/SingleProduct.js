import React, { useEffect, useState } from "react";
import "./SingleProduct.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AddToCart from "../components/Cart/AddToCart";

export default function SingleProduct() {
  const productId = useParams().id;

  const [product, setProduct] = useState([]);

  //fetching one product's data from Strapi
  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(
        `https://ttp-art-store.herokuapp.com/products/${productId}`
      );
      const data = await response.json();
      setProduct(data);
    };
    getProduct();
  }, []);

  let date = product.createdAt;

  return (
    <div className="single-product-page">
      <div className="product-image">
        <img src={product.image && product.image.url} />
      </div>
      <div className="product-info">
        <h3>{product.title}</h3>

        <div className="price">${product.price}</div>

        <div className="Info">
          <div className="InfoLeft">
            <strong>Uploaded on </strong>
          </div>
          <div className="InfoRight"> {date} </div>
          <div className="InfoLeft">
            {" "}
            <strong>Created by </strong>
          </div>
          <div className="InfoRight">{product.artist}</div>
          <div className="InfoLeft">
            <strong>Description </strong>
          </div>
          <div className="InfoRight"> {product.description}</div>
        </div>

        <AddToCart product={product} />
      </div>
    </div>
  );
}
