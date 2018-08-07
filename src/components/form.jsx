import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';


/* any forms that want to use the implementation of these states and 
   methods can simply extend this class */

/* To extend Form class and use it's implementation, all we have to do to make a new form which has 
validation is: - Initialize state, set schema for form, determine what happens when form is 
submitted, and decide what to return when form is rendered */

class Form extends Component {

    state = { 
        data: {}, 
        errors: {}
    }

    // username = React.createRef(); // establish reference

    // // once component has rendered
    // componentDidMount() {
    //     // put focus on input field for username 
    //     this.username.current.focus();
    // }


    // method for validating submitting in login page
    validate = () => {
        const options = { abortEarly: false };
        const result = Joi.validate(this.state.data, this.schema, {abortEarly: false});

        if(!result.error) return null; // no error === return null

        const errors = {};
        for(let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }
        /* // our own simpler validate method 
        const errors = {};
        const { data } = this.state;
        if(data.username === "")
            errors.username = "Username is required.";
        if(data.password === "")
            errors.password = "Password is required.";
        
        // Object.keys(x) checks all property / method names and .length is the number of them, 
        // checking if it === 0 means checking if there are any errors. If there are === 0 property length 
        // meaning no errors return 'null', else return the errors object to set the state with in 
        // handleSubmit() method. 
        return Object.keys(errors).length === 0 ? null : errors; 
        */
        return errors;
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };   

    // prevent default submitting (downloads / requests bundle.js and all files which is bad for SPA)
    handleSubmit = (e) => {
        e.preventDefault();

        // error catching 
        const errors = this.validate(); // call validate function if there are errors return the error object to be set
        this.setState({ errors : errors || {} }); // set state causing rerender to act upon any errors, if errors is null then set empty object or react returns an error
        console.log(errors); // log errors 
        if(errors) return; // if errors is true (validate returned some errors and not null) return
                           // right here preventing server call below
        
        
        // when moving server call below to new method doSubmit() due to moving reuseable components to 
        // new file form.jsx
        // call server
        this.doSubmit();
    }

    // handles input changing 
    // destructuring e.currentTarget and renaming to "input"
    handleChange = ({ currentTarget: input }) => {
        // clone errors 
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);  
        // if error message is true, set the error user / password property with the error message
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        // clone state 
        const newdata = { ...this.state.data };
        // accesses newdata[name] where name is preset to 'username' or 'password' to give us access to changing 
        // specific values of the state
        newdata[input.name] = input.value; // tracks what i typed in the referenced input and sets it as the username of the current data 
        // input in input.name above is 'e.currentTarget', and e.currentTarget.name is looking at the name of the input tag i.e. password / username 
        this.setState({ data: newdata, errors }); // sets state.data.username to this value
    }

    renderInp = (name, label, type='text') => {
        const { data, errors } = this.state;
        return <Input 
                    type={type} // default 'text', check parameter
                    name={name}
                    username={ name==="username" ? this.username : null } // add highlight focus if it's username input
                    value={ data[name] }
                    label={label}
                    onChange={ this.handleChange }
                    error={ errors[name] }
                />
    }

    renderSelect = (name, label, options) => {
        const { data, errors } = this.state;
        return  <Select
                    name={name}
                    value={ data[name] }
                    label={label}
                    options={options}
                    onChange={ this.handleChange }
                    error={ errors[name] } 
                />
    }

    // don't need render method removed it
}
 
export default Form;