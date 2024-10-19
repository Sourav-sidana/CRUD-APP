import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseData from "./components/ExpenseData";
import ExpenseTable from "./components/ExpenseTable";
import { useLocalStorage } from "./components/Hooks/useLocalStorage";
// import FormWithRef from './components/text'

function App() {
  const [Expenses, setExpenses] = useLocalStorage("expenses",ExpenseData);
  const [formInput, setFormInput] = useLocalStorage("formInput ",{
    title: "",
    category: "",
    amount: "",
    
  });
  const [editingRowId,setEditingRowId] = useLocalStorage('editingRowid' , "")
 
  return (
    <>
      <main>
        <h1>Track Your Expense</h1>
        
        <div className="expense-tracker">
          <ExpenseForm
            setExpenses={setExpenses}
            setFormInput={setFormInput}
            formInput={formInput}
            editingRowId={editingRowId}
            setEditingRowId={setEditingRowId}
          />
          <ExpenseTable
            expenses={Expenses}
            setExpenses={setExpenses}
            setFormInput={setFormInput}
            formInput={formInput}
            setEditingRowId={setEditingRowId}
          />
        </div>
      </main>
      {/* <FormWithRef/> */}
    </>
  );
}

export default App;
