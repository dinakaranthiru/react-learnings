import useStore from "./store/useStore";

export function CounterButtons() {
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);
  const reset = useStore((state) => state.reset);

  return (
    <div>
      <button onClick={increment}>+ Increase</button>
      <button onClick={decrement}>- Decrease</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default CounterButtons;