import React from 'react';
import Form from './form';
import Joi from 'joi-browser';
import { saveMovie, getMovie } from '../Starter Code/services/fakeMovieService';
import { getGenres } from '../Starter Code/services/fakeGenreService';

class MovieForm extends Form {
    state = { 
        data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
        errors: {},
        genres: []
    }

    // define Joi Scheme for validation 
    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(0).max(100).required().label('Number in Stock'),
        dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily Rental Rate')
    }

    componentDidMount() {
        
        const genres = getGenres();
        this.setState({ genres });
    
        const movieId = this.props.match.params.id;
        if (movieId === "new") return;
    
        const movie = getMovie(movieId);
        if (!movie) return this.props.history.replace("/not-found");
    
        this.setState({ data: this.mapToViewModel(movie) });
    
    }

    // maps to the layout form of the inputs in movie form page as a returned object
    mapToViewModel(movie) {
        
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }


    doSubmit = () => {
        // call server
        console.log("Submitted");

        saveMovie(this.state.data); // pass it our movie object, aka the view model
        this.props.history.push('/movies'); // redirect user to /movies page
    }


    // alternate implementation to add newMovie
    // adding movie to database
    // handleChange() from Form.jsx handles the currently inputted values to the current state,
    // we will store them here in an object and then export this as a movie object to be added 
    // to the database. 
    

    // newMovie = () => {
    //     const { title, genre, numberInStock, dailyRentalRate } = this.state.data;
    //     const movie = {
    //         title: title,
    //         genre: genre,
    //         numberInStock: numberInStock,
    //         dailyRentalRate: dailyRentalRate     
    //     }


    //     return movie;
    // }

    render() { 

        return ( // use inherent match param to access id param passed from path of url (movies/:id < from this)
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={ this.handleSubmit }>
                    { this.renderInp('title', 'Title') }
                    { this.renderSelect('genreId', 'Genres', this.state.genres)}
                    { this.renderInp('numberInStock', 'Number in Stock', 'number') } {/* type: number */}
                    { this.renderInp('dailyRentalRate', 'Rate') }
                    <button /*my alternate implementation: {onClick={() => saveMovie(this.newMovie())}*/ 
                        className="btn btn-primary">
                            Save
                    </button>
                </form>
            </div>
        );
    }
}
 
export default MovieForm;
