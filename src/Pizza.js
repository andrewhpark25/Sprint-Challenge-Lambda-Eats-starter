import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field").min(2, "Name must be at least 2 characters long"),
    size: yup.string().oneOf(['Small', 'Medium', 'Large', 'Extra Large']),
    toppings: yup.string().required(),
    instructions: yup.string()
})


export default function Pizza() {
   

   const [pizza, setPizza] = useState([]);

    const [formValues, setFormValues] = useState({
        name: '',
        size:'',
        toppings:'',
        instructions:'',
        
      
      
      });

      const [errors, setErrors] = useState({
        name: '',
        size:'',
        toppings:'',
        instructions:'',
        
        
      
      });

     const [buttonDisabled, setButtonDisabled] = useState(true);

 

      useEffect(() => {
       
        formSchema.isValid(formValues).then(valid => {
          setButtonDisabled(!valid);
        });
      }, [formValues]);
    
      const validateChange = e => {
        // Reach will allow us to "reach" into the schema and test only one part.
        yup
          .reach(formSchema, e.target.name)
          .validate( e.target.value)
          .then(valid => {
            setErrors({
              ...errors,
              [e.target.name]: ""
            });
          })
          .catch(err => {
            setErrors({
              ...errors,
              [e.target.name]: err.errors
            });
          });
      };

const onFormSubmit = event => {

    event.preventDefault()
  
    axios
    .post("https://reqres.in/api/users", formValues)
    .then(res => {
     
      console.log("success");
      setPizza([...pizza, res.data])
      pizza.push(res.data);
      console.log(pizza);
      
      setFormValues({
        name: '',
        size:'',
        toppings:'',
        instructions:'',
        
      });
    })
    .catch(err => {
      console.log(err.res);
    });
};

const onInputChange = event => {

    event.persist();
    

    const newFormData = {
      ...formValues,
      [event.target.name]:
      event.target.value
    };
    validateChange(event);
    setFormValues(newFormData);
  };
  

    return (
      <form onSubmit={onFormSubmit}>
        <label htmlFor="name"> Name 
        <input
            onChange={onInputChange} // callback takes an event object
            value={formValues.name}
            id='name'
            name='name'
            type='text'
          />
           {errors.name.length > 0 ? <p className="name">{errors.name}</p> : null}
        </label><br />
  
        <label htmlFor='size'>
          <select id='size' name='size' value={formValues.size} onChange={onInputChange}>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
            <option>Extra Large</option>
          </select>
        </label><br />
        <p>Toppings : </p><br />
        <label htmlFor="toppings" id="toppings" className="toppings" checked={formValues.toppings}> 
            <input type="checkbox" name="toppings" value="Peperoni" onChange={onInputChange}/>Peperoni  
            <input type="checkbox" name="toppings" value="Cheese"onChange={onInputChange}/>Cheese 
            <input type="checkbox" name="toppings" value="Canadian Bacon"  onChange={onInputChange}/>Canadian Bacon
            <input type="checkbox" name="toppings" value="Pineapple" onChange={onInputChange}/>Pineapple
            {errors.toppings.length > 0  ? (
          <p className="error">{errors.toppings}</p>
        ) : null}
        </label><br />
        
        <label htmlFor="instruction">  Special Instructions(optional)
        <input
            onChange={onInputChange}
            value={formValues.instructions}
            id='instructions'
            name='instructions'
            type='text'
          />
        </label><br />
        <pre>{JSON.stringify(pizza, null, 2)}</pre>
      <button disabled={buttonDisabled}>Submit</button>
      </form>
    )
  }

  

