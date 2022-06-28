import { Dishes } from "../constants/Dishes";
import "../styles/SelectField.scss"

const SelectField = ({ value, onChange, options = [], name, title, placeholder = "Select" }) => {
  return (
    <label className="selectfield" htmlFor={name}>
      {title}
      <select 
        onChange={onChange} 
        value={value} 
        required 
        id={name} 
        name={name}
      >
        {options.map((option) => (
          <option
            disabled={option === Dishes.NOT_SELECTED}
            key={option} 
            value={option}
          >{option}</option>
        ))}
      </select>
    </label>
  );
}
 
export default SelectField;