import { useState } from "react";

export default function Counter({ title }) {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>{title}</h1>
      <p>Times clicked: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>increment</button>
    </>
  );
}
