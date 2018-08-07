import React from 'react';
import Joi from 'joi-browser';
import Form from './form';


class RegisterForm extends Form {
    state = { 
        data: { username: '', password: '', name: ''},
        errors: {}
    }

    schema = {
        username: Joi.string().email({ minDomainAtoms: 2 }).required().label('Username'),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().label('Password'),
        name: Joi.string()
    }

    doSubmit = () => {
        // submitted
        console.log(this.state.item.username + ' has registered.');
    }

    render() { 
        return ( 
            <div>
                <h1>Register</h1>
                <form onSubmit={ this.handleSubmit }>
                    { this.renderInp('username', 'Username') }
                    { this.renderInp('password', 'Password', 'password') } {/* last arg is for type of inp */}
                    { this.renderInp('name', 'Name') }
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}
 
export default RegisterForm;