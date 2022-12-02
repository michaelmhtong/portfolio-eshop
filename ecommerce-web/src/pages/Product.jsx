import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import News from "../components/News";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <div>
      <News />
      <Navbar />
      <div className="grid grid-cols-2 gap-4 mx-60 my-10">
        <div>
          <img className="" src={product.img}></img>
        </div>
        <div>
          <h1>{product.title}</h1>
          <article>{product.desc}</article>
          <h2>{product.price}</h2>
          <div className="flex items-center">
            <div className="flex items-center">
              <h3>color</h3>
              {product.color?.map((color) => (
                <button key={color} onClick={() => setColor(color)}>
                  {color}
                </button>
              ))}
            </div>
            <div className="flex items-center">
              <h3>Size</h3>
              <select className="select" onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex">
            <div className="flex">
              <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
              <h4>{quantity}</h4>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <div>
              <button className="btn" onClick={handleAddToCart}>
                Add to cart
              </button>
              <button className="btn">Add to wish list</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
