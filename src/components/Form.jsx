import React, { useState } from 'react';

import { Dishes } from "../constants/Dishes";
import InputField from "./InputField";
import SelectField from "./SelectField";

import "../styles/Form.scss"

const Form = () => {
  const [name, setName] = useState("")
  const [preparationTime, setPreparationTime] = useState("")
  const [dishType, setDishType] = useState(Dishes.NOT_SELECTED)
  const [error, setError] = useState(null)
  const [numberOfSlices, setNumberOfSlices] = useState("")
  const [diameter, setDiameter] = useState("")
  const [spicinessScale, setSpicinessScale] = useState("")
  const [slicesOfBread, setSlicesOfBread] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangePreparationTime = (e) => {
    setPreparationTime(e.target.value)
  }

  const handleChangeDishType = (e) => {
    setDishType(e.target.value)
  }

  const handleChangeNumberOfSlices = (e) => {
    setNumberOfSlices(e.target.value)
  }

  const handleChangeDiameter = (e) => {
    setDiameter(e.target.value)
  }

  const handleChangeSpicinessScale = (e) => {
    setSpicinessScale(e.target.value)
  }

  const handleChangeSlicesOfBread = (e) => {
    setSlicesOfBread(e.target.value)
  }

  const handleClearForm = () => {
    setName("")
    setPreparationTime("")
    setDishType(Dishes.NOT_SELECTED)
    setError(null)
    setNumberOfSlices("")
    setDiameter("")
    setSpicinessScale("")
    setSlicesOfBread("")
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // display error and return if inputs are not filled in or are not valid
    const isPizzaNotValidated = dishType === Dishes.PIZZA && (numberOfSlices === "" || diameter === "")
    const isSoupNotValidated = dishType === Dishes.SOUP && spicinessScale === ""
    const isSandwichNotValidated = dishType === Dishes.SANDWICH && slicesOfBread === ""
    if (name.length === 0 ||
        preparationTime === "" ||
        dishType === Dishes.NOT_SELECTED || 
        isPizzaNotValidated ||
        isSoupNotValidated ||
        isSandwichNotValidated) {
      setError("All fields are required!")
      return;
    }
    // returns form data based on dish type
    const getFormData = () => {
      let data = {
        name,
        preparation_time: preparationTime,
        type: dishType,
      }
      // add conditionally dish type data to data object
      switch (dishType) {
        case Dishes.PIZZA:
          data = {...data, no_of_slices: Number(numberOfSlices), diameter: Number(diameter)}
          break;
        case Dishes.SOUP:
          data = {...data, spiciness_scale: Number(spicinessScale)}
          break;
        case Dishes.SANDWICH:
          data = {...data, slices_of_bread: Number(slicesOfBread)}
          break;
        default:
          break;
      }
      return data
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getFormData())
    }
    const response = await fetch("https://frosty-wood-6558.getsandbox.com/dishes", requestOptions)
    const data = await response.json()
    if (response.status === 400) {
      const formatEntry = (entry) => {
        return `${entry[0]}: ${entry[1]} `
      }
      setError(Object.entries(data).map(formatEntry))
      return;
    } 
    if (response.status === 200) {
      setIsSuccess(true)
      handleClearForm()
      console.log(data)
    }
  }

  const getOtherFields = (dish) => {
    switch (dish) {
      case Dishes.PIZZA:
        return (
          <div className="form__2columns">
            <InputField
              value={numberOfSlices}
              onChange={handleChangeNumberOfSlices}
              title="Number of slices" 
              placeholder="Enter number of slices" 
              name="no_of_slices" 
              type="number" 
            />
            <InputField 
              value={diameter}
              onChange={handleChangeDiameter}
              title="Diameter" 
              placeholder="Enter diameter" 
              name="diameter" 
              type="number"
              step="0.01"
            />
          </div>
        )
      case Dishes.SOUP:
        return (
          <InputField 
            value={spicinessScale}
            onChange={handleChangeSpicinessScale}
            title="Spiciness scale" 
            placeholder="Enter spiciness scale (1-10)" 
            name="spiciness_scale"
            min="1"
            max="10"
            type="number" 
          />
        )
      case Dishes.SANDWICH:
        return (
          <InputField
            value={slicesOfBread}
            onChange={handleChangeSlicesOfBread}
            title="Slices Of Bread" 
            placeholder="Enter number of slices of bread" 
            name="slices_of_bread"
            type="number" 
          />
        )
      default:
        return null
    }
  }
  
  return (
    <form className="form" onSubmit={handleSubmitForm}>
      {isSuccess && (
        <p className='form__success'>Successfully sent!</p>
      )}
      <InputField
        value={name}
        onChange={handleChangeName}
        title="Dish name" 
        name="name" 
        placeholder="Enter dish name" 
      />
      <div className="form__2columns">
        <InputField
          value={preparationTime}
          onChange={handleChangePreparationTime}
          title="Preparation time" 
          placeholder="Enter preparation time" 
          name="preparation_time" 
          type="time" 
          step="1" 
        />
        <SelectField
          value={dishType}
          onChange={handleChangeDishType}
          name="type" 
          title="Dish type"
          placeholder="Select Dish Type"
          options={Object.values(Dishes)}
        />
      </div>
      {dishType !== Dishes.NOT_SELECTED && (
        <hr/>
      )}
      {getOtherFields(dishType)}
      {error && (
        <p className='form__error'>{error}</p>
      )}
      <button className='form__button' type='submit'>Send</button>
    </form>
  );
}
 
export default Form;