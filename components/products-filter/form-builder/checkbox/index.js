const Checkbox = ({ type, label, name, onChange, label2 }) => (
  <label
    htmlFor={label + "-" + name}
    className={`checkbox ${type ? "checkbox--" + type : ""}`}
  >
    <input
      name={name}
      onChange={onChange}
      type="checkbox"
      id={label + "-" + name}
    />
    <span className="checkbox__check"></span>
    <p>{label}</p>
    {label2 && (
      <span style={{ color: "#D8D8D8", marginLeft: "10px" }}>{label2}</span>
    )}
  </label>
);

export default Checkbox;
