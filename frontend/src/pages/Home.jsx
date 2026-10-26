import { useState } from "react";
import { trackProduct } from "../services/productService";

export default function Home() {
    const [url, setUrl] = useState("");
    const [product, setProduct] = useState(null);

    const handleTrack = async () => {
        const data = await trackProduct(url);
        setProduct(data);
    };

    return (
        <div className="container">
            <h1>Price Tracker</h1>
            <input type="text" placeholder="Enter Amazon product URL" value={url} onChange={(e) => setUrl(e.target.value)} />
            <button onClick={handleTrack}>Track Price</button>

            {product && (
                <div className="product">
                    <h2>{product.title}</h2>
                    <img src={product.imageUrl} alt={product.title} width="150" />
                    <p>Current Price: ₹{product.currentPrice}</p>
                </div>
            )}
        </div>
    );
}
