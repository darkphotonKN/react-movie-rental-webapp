import React from 'react';
import Form from './form';
import Joi from 'joi-browser'; // for validation 

/* Extends Form class as we are using it's implementation, all we have to do to make a new form which has 
validation is: - Initialize state, set schema for form, determine what happens when form is 
submitted, and decide what to return when form is rendered */

class LoginForm extends Form { 
    state = {
        data: { username: '', password: '' }, // storing username / pass as a state
        errors: {} // handle errors by storing error messages in a state 
    }

    // username = React.createRef(); // establish reference

    // // once component has rendered
    // componentDidMount() {
    //     // put focus on input field for username 
    //     this.username.current.focus();
    // }

    // define Joi Scheme for validation 
    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    doSubmit = () => {
        // call server
        console.log("Submitted");
    }


    
    render() { 
        return ( 
            <div>
                <h1>Login</h1>
                <form onSubmit={ this.handleSubmit }>
                    { this.renderInp('username', 'Username') }
                    { this.renderInp('password', 'Password', 'password') } {/* last arg is for type of inp */}
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}
 
export default LoginForm;