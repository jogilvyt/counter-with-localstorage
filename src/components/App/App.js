import useStateWithLocalStorage from "../hooks/useStateWithLocalStorage";

function App() {
  const [count, setCount] = useStateWithLocalStorage(0, "count");

  return (
    <div>
      <h1>Counter</h1>
      <p>Number: {count}</p>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

export default App;
