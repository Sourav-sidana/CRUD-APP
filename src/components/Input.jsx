import React from "react";
function Input({  label, id, name, value, onChange, Error }) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} value={value} onChange={onChange} />
      <p className="Error">{Error}</p>
    </div>
  );
}
export default Input