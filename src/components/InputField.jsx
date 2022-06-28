import "../styles/InputField.scss"

const InputField = ({ value, onChange, name, type="text", title, ...aditionalProps }) => {
  return (
    <label htmlFor={name} className="inputfield">
      {title}
      <input 
        value={value}
        onChange={onChange}
        required 
        name={name} 
        id={name} 
        type={type} 
        {...aditionalProps} 
      />
    </label>
  );
}
 
export default InputField;