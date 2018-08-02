import React, { Component } from 'react';

const MovieForm = ({ match, history }) => {
    return ( // use inherent match param to access id param passed from path of url (movies/:id < from this)
        <div>
            <h1>Movie Form { match.params.id }</h1>  {/* uses inherent history param and push method to go back to /movies page*/}
            <button className="btn btn-primary" onClick={() => history.push('/movies')}>Save</button> 
        </div>
    );
}
 

 
export default MovieForm;