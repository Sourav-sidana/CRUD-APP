function SelectField({label, id, name, value, onChange, Error ,options ,defaultOption}){
  
    
    return (
        <div className="input-container">
        <label htmlFor={label}>Category</label>
        <select id={id} name={name} value={value} onChange={onChange}>
        
         {defaultOption &&( <option value="" hidden>{defaultOption}  </option>)}
       
        {options.map((e , i)=> {return <option value={e} key={i}>{e}</option>})}
      </select>
      <p className="Error">{Error}</p>
    </div>
    )
}
export default SelectField