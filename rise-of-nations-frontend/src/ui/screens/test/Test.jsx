import { useEffect, useRef, useState } from "react";
import { Canvas } from "./canvas/Canvas";
import "./Test.css";

const Test = () => {
    const containerRef = useRef();
    const [containerRes, setContainerRes] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const container = containerRef.current;
        const containerRect = container?.getBoundingClientRect();
        setContainerRes({
            width: containerRect?.width,
            height: containerRect?.height,
        });
    }, [containerRef]);

    return (
        <div ref={containerRef} className="test">
            {containerRef.current && <Canvas containerRes={containerRes} />}
        </div>
    );
};

export default Test;
