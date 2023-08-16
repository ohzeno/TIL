const OddEvenResult = ({ count }) => {
  return (
    <div>
      <h2>{count % 2 === 0 ? "Even" : "Odd"}</h2>
    </div>
  );
};

export default OddEvenResult;
