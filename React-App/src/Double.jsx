import useStore from "./store/useStore";

function DoubleCount() {
  const double = useStore((state) => state.count * 2);

  return <p>Double Count: {double}</p>;
}

export default DoubleCount;