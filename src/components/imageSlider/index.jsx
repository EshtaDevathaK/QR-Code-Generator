import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./style.css";

export default function ImageSlider({ url, limit, page}) {
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchImages(getUrl) {
        try {
            setLoading(true);

            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();

            if (data) {
                setImages(data);
                setLoading(false);
            }
        } catch (e) {
            setErrorMsg(e.message);
            setLoading(false);
        }
    }

    function handlePrevious() {
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
    }

    function handleNext() {
        setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
    }

    useEffect(() => {
        if (url !== "") fetchImages(url);
    }, [url]);

    console.log(images);

    if (loading) {
        return <div>Loading data ! Please wait</div>;
    }

    if (errorMsg !== null) {
        return <div>Error occured ! {errorMsg}</div>;
    }

    return (
        <div className="container">
            <BsArrowLeftCircleFill
                onClick={handlePrevious}
                className="arrow arrow-left"
            />
            { images && images.length
                ? images.map((imageItem, index) => (
                    <img
                        key={imageItem.id}
                        alt={imageItem.download_url}
                        src={imageItem.download_url}
                        className={
                            currentSlide === index
                                ? "current-image"
                                : "current-image hide-current-image"
                        }
                    />
                ))
                : null }
            <BsArrowRightCircleFill
                onClick={handleNext}
                className="arrow arrow-right"
            />
            <span className="circle-indicators">
                {images && images.length
                    ? images.map((_, index) => (
                        <button
                            key={index}
                            // complete css property only responsible to handle Visible & inVisible propeties in css
                            className= {
                                currentSlide === index
                                    ? "current-indicator"
                                    : "current-indicator inactive-indicator"
                                }
                            onClick={() => setCurrentSlide(index)}
                        ></button>
                    ))
                    : null}
            </span>
        </div>
    );
}

// 🧠 Here's the simple breakdown:
// ✅ 1. Props Passed in App.jsx
// js
// Copy
// Edit
// <ImageSlider url="..." limit={10} page={6} />
// You are explicitly giving values to the component.

// This is like saying:

// "Hey ImageSlider, use limit = 10 and page = 6 always. I know what I want."

// ✅ This overrides the default values inside the component.

// ✅ 2. Default Props Inside the Component
// js
// Copy
// Edit
// export default function ImageSlider({ url, limit = 5, page = 6 })
// This says:

// "If the parent (like App.jsx) doesn’t give me limit or page, I’ll fall back to default values: 5 and 6."

// ✅ This protects your component in case the parent forgets to pass something.




// 🎯 What is index?
// Each image has a position in the list:
// | `index` | `imageItem.download_url` |
// | ------: | ------------------------ |
// |       0 | "url1"                   |
// |       1 | "url2"                   |
// |       2 | "url3"                   |
// |       3 | "url4"                   |
// |       4 | "url5"                   |
