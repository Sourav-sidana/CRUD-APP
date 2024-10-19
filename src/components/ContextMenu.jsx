function ContextMenu({
  position,
  setposition,
  setExpenses,
  rowId,
  expenses,
  formInput,
  setFormInput,
  setEditingRowId,
}) {
  // console.log({position})
  if (position.left === 0) return;
  return (
    <div className="context-menu" style={{ ...position, display: "block" }}>
      <div
        onClick={() => {
          console.log("editing");
          setposition({ left: 0, top: 0 });
          const { title, category, amount } = expenses.find((expense) => {
            return expense.id === rowId;
          });

          setEditingRowId(rowId);
          setFormInput({ title, category, amount });
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          console.log("deleting");
          setposition({ left: 0, top: 0 });
          setExpenses((prevState) =>
            prevState.filter((expense) => {
              console.log(expense.id);
              return expense.id !== rowId;
            })
          );
        }}
      >
        Delete
      </div>
    </div>
  );
}
export default ContextMenu;
