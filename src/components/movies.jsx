
import React, { Component } from 'react';
import { getMovies } from '../Starter Code/services/fakeMovieService';
import Pagination from './pagination';
import { paginate } from './utils/paginate';
import ListGroup from './listGroup';
import { getGenres } from '../Starter Code/services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
    state = { 
        movies: [],  // initialize them because of time it takes to get data from servers
        genres: [],
        currentPage: 1, // keeping track of which page is currently showing
        pageSize: 4, // no. of movies allowed per page
        sortColumn: { path: 'title', order: 'asc' }
        
    }

    // life cycle hook - called when instance of this component is rendered in DOM
    componentDidMount() {
        // getting all genres and installing an "All Genre" object before the rest of the array
        const getAllGenres = [{_id: "", name: "All Genres"}, ...getGenres()];

        this.setState(
            {
                // retains the current state of the array of movie objects
                movies: getMovies(), // acting as getting data from back-end service
                genres: getAllGenres 
            }
        );
    }

    // load available movies and their stats
    loadMovies() {
        const movieTitles = getMovies().map(movie => movie.title);
        return movieTitles;

    }

    // handle deleting movie listings
    // arrow fn to retain "this" binding else constructor is needed
    handleDelete = (deletedMovieId) => {
        console.log(`Deleted movie ${deletedMovieId}`);
        // reloading movie list after removing movie with mentioned id
        const updatedMoviesList = this.state.movies.filter(movie => movie._id !== deletedMovieId); // any movie element (object) that matches the targeted movie id is deleted
        
        this.setState({ movies: updatedMoviesList });
    };

    // toggle like method 
    handleToggleLike = movie => {
        
        let newMovies = [...this.state.movies];
        const index = newMovies.indexOf(movie);

        // this can also be done like: newMovies[index].liked = !newMovies[index.liked];
        if(newMovies[index].liked === true) { 
            newMovies[index].liked = false;
        } else {
            newMovies[index].liked = true;
        }

        this.setState({ movies: newMovies });
    };

    // handling pagination 
    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    
    // handling genre selection
    handleGenreSelect = genreItem => {

        this.setState({ selectedGenre: genreItem, currentPage: 1 }); // remember even though it only adds a selected genre
        // and not changing anything else, setState() will rerender everything
        // including the listGroup which will have an updated look
        // currentPage: 1 resets currentPage to 1 when swapping between genres
 
    };

    // handle sorting tables
    handleSort = sortColumn => {

        this.setState({ sortColumn });
        
    }

    

    render() { 
        /* check state how many movies there and display else display out of stock with no table */
        const { length: count } = this.state.movies; // object destructuring , getting the length property of this.state.movies and renaming it to "count"
        const { currentPage, pageSize, selectedGenre, sortColumn, movies: allMovies } = this.state;

        // use currently selectedGenre filter to .filter array of movies to ones that match genres
        // only filter if selectedGenre is truthy else just return allMovies array
        const filteredMovies = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre.name === selectedGenre.name) : allMovies;

        const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);

        // limit movies list to only current page of movies. "paginate" fn is imported
        const movies = paginate(sortedMovies, currentPage, pageSize);

        if (count === 0) {
            return <p>Sorry we are currently out of stock!</p>;
        } 
        else {

            return ( 
                
                <div className="row">
                    <div className="col-2">
                        <ListGroup 
                            items={this.state.genres}
                            selectedItem={this.state.selectedGenre}
                            // simiplied the interface of this ListGroup by making these default props 
                            // check bottom of listGroup.jsx
                            // textProperty="name" // pre hard pass the property so that array can access it directly
                            // valueProperty="_id" // without ".name" and can use array[textProperty]
                            onItemSelect={this.handleGenreSelect}
                        />
                    </div>
                    <div className="col">
                                            {/* remember "count" is length of movies array state property that we destructured */}
                        <p className="mb-4">There are <span style={{ fontWeight: 'bold' }}>{ filteredMovies.length }</span> movies in the database that fit your criteria.</p> 
                        <h2>List of Movies</h2>
                        <MoviesTable 
                            movies={movies}
                            sortColumn={sortColumn}
                            onDelete={this.handleDelete}
                            onLike={this.handleToggleLike}
                            onSort={this.handleSort}
                        />
                        <Pagination 
                            itemsCount={filteredMovies.length} 
                            pageSize={pageSize} 
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        /> { /* we destructured adn renamed length of movies array from state with: 
                                                            const { length: count } = this.state.movies */ }


                    </div>
 
                </div>

            );
        }
    }
}
 
export default Movies;