import React from 'react';

const Input = ({ name, label, value, username, onChange }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {/* Getting this dom element in react don't use document.getElementById. 
                One way is to use the ref={} established at the top intially. */}
            
            <input 
                value={value} // tie it to a state rather than give it its own input state
                onChange={ onChange } // on change fire onChange method
                ref={username} 
                id={name} 
                name={name}
                type="text" 
                className="form-control"
            />
        </div>
    );
}
 
export default Input;