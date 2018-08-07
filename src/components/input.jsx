import React from 'react';

const Input = ({ type, name, label, value, username, error, onChange }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {/* Getting this dom element in react don't use document.getElementById. 
                One way is to use the ref={} established at the top intially. */}
            
            <input 
                type={type}
                value={value} // tie it to a state rather than give it its own input state
                onChange={ onChange } // on change fire onChange method
                ref={username} 
                id={name} 
                name={name}
                className="form-control"
            />
            {/* only render this if error is truthy */}
            { error && <div className="alert alert-danger">{ error }</div> } 
        </div>
    );
}
 
export default Input;