/* eslint-disable react/prop-types */
const Spinner = ({ color = "#007bff" }) => {
  return (
    <div
      className="spinner-border"
      role="status"
      style={{ width: "20px", height: "20px", color }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
