import React, { useState } from "react";
import Input from "./Input";
import SelectField from "./SelectField";

export default function ExpenseForm({
  setExpenses,
  setFormInput,
  formInput,
  editingRowId,
  setEditingRowId,
}) {
  const [Error, setError] = useState({});

  const validationConfig = {
    title: [
      { required: true, message: "please enter title" },
      { minLength: 5, message: "title should be atleast 2 characters long" },
    ],
    category: [{ required: true, message: "please enter category" }],
    amount: [
      { required: true, message: "please enter an amount" },
      { amount: true, message: "please enter a valid amount" },
    ],
    email: [
      { required: true, message: "please enter an email" },
      // {
      //   pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      //   message: "please enter a valid email",
      // },
    ],
  };
  // console.log(validationConfig.title) //ikarray milega jisme 2 elements hai
  const validate = (formData) => {
    const errorsData = {};
    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        //jo rule iterate ho raha hoga usi if condition me jayega maan lo
        if (rule.required && !value) {
          //aagr ye field required hai means require true hai aur value empty hai
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < 2) {
          //agar min length hai yeni true hai vese toh upr object me 5 likha hai leking agar true likha hota toh bhi ye code chalta leking agar upr object me minlength 0 likh dete to ye if condition nhi chalti kyuki 0 falsy value hai aur dono me se ik bhi conditon false hui toh contol is if condition me aayega hi nhi
          errorsData[key] = rule.message;

          return true;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.amount && !Number.isInteger(Number(value))) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });

    setError(errorsData);
    return errorsData;
  };

  function inputHandler(e) {
    const { value, name } = e.target;
    console.log(value, name);
    setFormInput({ ...formInput, [name]: value });
    setError({});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateResult = validate(formInput);

    if (Object.keys(validateResult).length) return; //jo error vala obj validate function se return ho rha hai agar uss object me koi error hai to
    //ye if condition chlegi aur yaha se control return ho jayega
    // console.log(Error); //jab tak handleSubmit pura execute nhi hota tab tak koi state update nhi hoga
console.log(editingRowId)
    if (editingRowId) {
      setExpenses((prevState) =>{
      return  prevState.map((prevData) => {
          if (prevData.id === editingRowId) {
            return { ...formInput, id: editingRowId };
          }
          console.log(prevData);
          return prevData;
        })

       
      });
      setFormInput({
        title: "",
        category: "",
        amount: "",
        
      })
      setEditingRowId("");
      return
    }
    setExpenses((prevData) => [
      ...prevData,
      { ...formInput, id: crypto.randomUUID() },
    ]);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit} id="form">
      <Input
        label="title"
        id="title"
        name="title"
        value={formInput.title}
        onChange={inputHandler}
        Error={Error.title}
      />

      <SelectField
        id="category"
        value={formInput.category}
        name="category"
        onChange={inputHandler}
        Error={Error.category}
        label="category"
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        defaultOption={" select category"}
      />

      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={formInput.amount}
        onChange={inputHandler}
        Error={Error.amount}
      />
      {/* <Input
        label="Email"
        id="email"
        name="email"
        value={formInput.email}
        onChange={inputHandler}
        Error={Error.email}
      /> */}
      <button className="add-btn">{editingRowId ? "save" : "Add"}</button>
    </form>
  );
}
