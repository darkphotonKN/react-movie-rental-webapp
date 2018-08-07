import React from 'react';

const Select = ({ name, label, error, options, onChange, ...rest }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} onChange={onChange} {...rest} className="form-control">
                <option value="" />
                {options.map(option => (
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>} {/* display error only if error is true */}
        </div>
    );
}
 
export default Select;