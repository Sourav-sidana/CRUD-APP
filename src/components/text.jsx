import React, { useRef, useState } from 'react';

function FormWithRef() {
  const inputRef = useRef(null);
  const reftagcolor = useRef(null)
  const [inputText ,setInputText] = useState("")
console.log(inputRef)
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Input Value: ${inputRef.current.value}`);
    setInputText(inputRef.current.value)
    console.log(reftagcolor.current)
    reftagcolor.current.style.color = "red"
     
  };

  return (
 <>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" ref={inputRef} />
      </label>
      <button type="submit">Submit</button>
    </form>
    <p ref={reftagcolor}>{inputText }</p>
 </>
  );
  
}

export default FormWithRef;
