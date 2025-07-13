import { useState, useEffect } from 'react';
import './style.css';
// ✅ Functional component to load more data on button click
export default function LoadMoreData({ url }) {
    // ✅ Initial state to store fetched products (starts empty)
    const [products, setProducts] = useState([]);

    // ✅ Whether the app is currently loading data
    const [loading, setLoading] = useState(false);

    // ✅ Counter to track how many times "Load More" was clicked
    //    This helps calculate skip = count * 20
    const [count, setCount] = useState(0);

    // ✅ Button disabling logic when product limit reached
    const [disableBtn, setDisableBtn] = useState(false);

    // ❌ You were passing `limit` and `skip` as props — that's removed now.
    // ✅ `limit` and `skip` are defined inside the function, based on state.
    // count starts from zero and then goes on...
    const limit = 20;
    const skip = count * limit;

    // 🚧 Optional: If you want to handle fetch errors later
    // const [errorMsg, setErrorMsg] = useState("");

    // ✅ Core fetch function
    async function fetchData(getUrl) {
        try {
            setLoading(true); // Start loading

            // ✅ Construct URL dynamically using count-based skip
            const response = await fetch(`${getUrl}?limit=${limit}&skip=${skip}`);
            const data = await response.json();

            // ✅ If data is available, append it to the current products list
            if (data && data.products) {
                // 🚧 We're appending — this logic needs to be used later
                setProducts((prevProducts) => [...prevProducts, ...data.products]);
            }

            setLoading(false); // End loading
        } catch (e) {
            // setErrorMsg(e.message); // (Optional) Setup error state if needed
            console.error("Fetch failed:", e);
            setLoading(false);
        }
    }

    // ✅ Run fetch when the component first mounts and whenever `count` changes
    useEffect(() => {
        if (url !== "") {
            fetchData(url); // re-fetches with new skip
        }
    }, [count]); // ✅ Using count instead of url for dynamic "Load More"

    // ✅ Disable button when 100 products are loaded
    useEffect(() => {
        if (products.length >= 100) {
            setDisableBtn(true);
        }
    }, [products]);






    // 🚧 Future step: useEffect to watch products.length and disable the button if length reaches 100
// display products in a grid
    return (
        <div className="load-more-container">
            <div className="product-container">
                {products.map((item) => (
                    <div className="product" key={item.id}>
                        <img src={item.thumbnail} alt={item.title} />
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>

            {/* ✅ Loader Text */}
            {loading && <p>Loading... Please wait</p>}

            {/* ✅ Load More Button */}
            <div className="button-container">
                <button disabled={disableBtn} onClick={() => setCount(count + 1)}>
                    Load More Products
                </button>
                {disableBtn && <p>You've reached 100 products</p>}
            </div>
        </div>
    );
}
