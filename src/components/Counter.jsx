import React, { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count+1);
    }
    
    const decriment = () => {
        setCount(count-1);
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Incriment</button>
            <button onClick={decriment}>Decriment</button>
        </div>
    )
}

export default Counter;