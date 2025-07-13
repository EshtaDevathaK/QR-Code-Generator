import { useState } from "react";
import { FaStar } from "react-icons/fa";
import './style.css';
// Always start with requirements of recruiter and then start the project
export default function StarRating({ noOfStars = 5 }) {
    const [rating, setRating] = useState(0); //state set rating starts from 0
    const [hover, setHover] = useState(0);// when we hover show some kind of current index hovering based on that state change and color hover

    function handleClick(getCurrentIndex) { //Why this line, where this connects , How it helps with connecting other part of code
        setRating(getCurrentIndex);

    }
// Gives power on hover -> hovers-yellow color upto which star we choose to be on
    function handleMouseEnter(getCurrentIndex) {
        setHover(getCurrentIndex);
    }

    function handleMouseLeave() {
        setHover(rating);
    }

    return ( 
    <div className="star-rating">
        {
            [...Array(noOfStars)].map((_, index) => {
                index += 1;

                return (
                    <FaStar
                        key={index}
                        className={index <= (hover || rating) ? 'active' : 'inActive'}
                        onClick={() => handleClick(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave()}
                        size={40}  // size of star

                    />
                );
            })}
    </div>
    );
}