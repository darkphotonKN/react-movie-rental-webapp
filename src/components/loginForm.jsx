import React, { Component } from 'react';
import Input from './input';

class LoginForm extends Component {
    state = {
        account: { username: '', password: '' }, // storing username / pass as a state
        errors: {} // handle errors by storing error messages in a state 
    }

    username = React.createRef(); // establish reference

    // once component has rendered
    componentDidMount() {
        // put focus on input field for username 
        this.username.current.focus();
    }

    // method for validating submitting in login page
    validate = () => {
        const errors = {};
        const { account } = this.state;
        if(account.username === "")
            errors.username = "Username is required!";
        if(account.password === "")
            errors.password = "Password is required!";
        
        // Object.keys(x) checks all property / method names and .length is the number of them, 
        // checking if it === 0 means checking if there are any errors. If there are === 0 property length 
        // meaning no errors return 'null', else return the errors object to set the state with in 
        // handleSubmit() method. 
        return Object.keys(errors).length === 0 ? null : errors; 

    }

    // prevent default submitting (downloads / requests bundle.js and all files which is bad for SPA)
    handleSubmit = (e) => {
        e.preventDefault();

        // error catching 
        const errors = this.validate(); // call validate function if there are errors return the error object to be set
        this.setState({ errors }); // set state causing rerender to act upon any errors
        console.log(errors); // log errors 
        if(errors) return; // if errors is true (validate returned some errors and not null) return
                           // right here preventing server call below
        // call server
        console.log('Submitted');
    }

    // handles input changing 
                    // destructuring e.currentTarget and renaming to "input"
    handleChange = ({ currentTarget: input }) => {
        // clone state 
        const newAccount = { ...this.state.account }
        // accesses newAccount[name] where name is preset to 'username' or 'password' to give us access to changing 
        // specific values of the state
        newAccount[input.name] = input.value; // tracks what i typed in the referenced input and sets it as the 
                                                     // username of the current account 
        this.setState({ account: newAccount }); // sets state.account.username to this value
    }
    
    render() { 
        const { account } = this.state;
        return ( 
            <div>
                <h1>Login</h1>
                <form onSubmit={ this.handleSubmit }>
                    <Input 
                        name="username"
                        username={this.username}
                        value={ account.username }
                        label="Username"
                        onChange={ this.handleChange }
                    />  
                    <Input 
                        name="password"
                        value={ account.password }
                        label="Password"
                        onChange={ this.handleChange }
                    />
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}
 
export default LoginForm;