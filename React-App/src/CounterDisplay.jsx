import useStore from "./store/useStore";

export function CounterDisplay() {
  const count = useStore((state) => state.count);

  return <h2>Current Count: {count}</h2>;
}

export default CounterDisplay;