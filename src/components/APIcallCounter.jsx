import { useSelector } from "react-redux";

function APICallCounter() {
  const perenualAPICallCount = useSelector(
    (state) => state.plants.perenualApiCallCount
  );

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "1rem",
        fontSize: "0.9rem",
        color: "gray",
      }}
    >
      API Calls to Perenual: {perenualAPICallCount}
    </div>
  );
}

export default APICallCounter;
