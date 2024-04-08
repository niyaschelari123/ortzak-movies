// useWindowWidth.js
import { useEffect, useState } from 'react';
// import { debounce } from 'lodash';

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Function to update window width in the state
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Attach event listener for the resize event
        window.addEventListener("resize", handleResize);

        // Initial update
        handleResize();

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowWidth;
};

export default useWindowWidth;