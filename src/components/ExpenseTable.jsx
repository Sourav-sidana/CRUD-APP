import { useState } from "react";
import { useEffect } from "react";
import { useFilter } from "./Hooks/useFilter";
import ContextMenu from "./ContextMenu";
export default function ExpenseTable({ expenses, setExpenses , setFormInput , formInput ,setEditingRowId}) {
  const [total, setTotal] = useState(0);

  const [filetrResult, setQuery] = useFilter(expenses, (data) => data.category);
  const [position, setposition] = useState({ left: 0, top: 0 });
  const [rowId , setRowID] = useState('')
  const [sortCallBack , setSortCallback] = useState(()=>()=>{})

  // console.log(filetrResult);
  useEffect(() => {
    const sum = filetrResult.reduce(
      (acc, { amount }) => acc + Number(amount),
      0
    );
    setTotal(sum);
  }, [filetrResult]);
  return (
    <>
      <ContextMenu
        position={position}
        setposition={setposition}
        setExpenses={setExpenses}
        expenses={expenses}
        rowId={rowId}
        setFormInput={setFormInput}
        formInput={formInput}
        setEditingRowId={setEditingRowId}
      />
      <table className="expense-table">
        <thead>
          <tr>
          <th className="amount-column">
              <div>
                <span>title</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={()=>{
                    setSortCallback(()=>(a ,b)=> a.title.localeCompare(b.title) )
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={()=>{
                    setSortCallback(()=>(a ,b)=> b.title.localeCompare(a.title))
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
            <th>
              <select
                onChange={(e) => {
                  // e.stopPropagation()//we set condion for position now no need this stop propogation
                  setQuery(e.target.value);
                }}
              >
                <option value="">All</option>
                <option value="grocery">Grocery</option>
                <option value="clothes">Clothes</option>
                <option value="bills">Bills</option>
                <option value="education">Education</option>
                <option value="medicine">Medicine</option>
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={()=>{
                    setSortCallback(()=>(a ,b)=> a.amount - b.amount)
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={()=>{
                    setSortCallback(()=>(a ,b)=>  b.amount - a.amount)
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
              <td>Milk</td>
              <td>Grocery</td>
              <td>₹40</td>
            </tr> */}
          {filetrResult.sort(sortCallBack).map(({ id, title, amount, category }) => {
            
            // console.log(expenses)
            return (
              <tr
                key={id}
                onContextMenu={(e) => {
                  
                  e.preventDefault();
                  setposition({ left: e.clientX, top: e.clientY }
                  );
                  setRowID(id)
                  
                }}
                onClick={() =>{if(position.left){setposition({ left: 0, top: 0 })}}}
              >
                <td>{title}</td>
                <td>{category}</td>
                <td>₹{amount}</td>
              </tr>
            );
          })}
          <tr>
            <th>Total</th>
            <th className="clear-sort" onClick={()=>setSortCallback(()=>()=>{})}> clear sort</th>
            <th> ₹ {total}</th>
          </tr>
        </tbody>
      </table>
      <div className="context-menu">
        <div>Edit</div>
        <div>Delete</div>
      </div>
    </>
  );
}
