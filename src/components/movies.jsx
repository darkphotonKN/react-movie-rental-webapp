
import React, { Component } from 'react';
import { getMovies } from '../Starter Code/services/fakeMovieService';
import Like from './like';
import Pagination from './pagination';
import { paginate } from './utils/paginate';

class Movies extends Component {
    state = { 
        movies: getMovies(), // retains the current state of the array of movie objects 
        currentPage: 1, // keeping track of which page is currently showing
        pageSize: 4 // no. of movies allowed per page
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
    }

    
    test() {
        const items = [5, 3, 2, 12, 4, 2, 1, 3, 4, 1, 12]; 
        const test = paginate(items, 3, 3);
        console.log(test.forEach(item => console.log(item)));  
    }



    render() { 
        /* check state how many movies there and display else display out of stock with no table */
        const { length: count } = this.state.movies; // object destructuring , getting the length property of this.state.movies and renaming it to "count"
        const { currentPage, pageSize, movies: allMovies } = this.state;

        // limit movies list to only current page of movies. "paginate" fn is imported
        const movies = paginate(allMovies, currentPage, pageSize);
        console.log(movies);
        this.test();

        if (count === 0) {
            return <p>Sorry we are currently out of stock!</p>;
        } 
        else {

            return ( 
                
                <React.Fragment>
                    {/* remember "count" is length of movies array state property that we destructured */}
                    <p className="mb-4">There are currently { count } movies in the database.</p> 
                    <h2>List of Movies</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Stock</th>
                                <th>Rate</th>
                                <th></th>
                                <th></th>{/* to lengthen table match delete btn area*/}
                            </tr>
                        </thead>
                        <tbody>
                            { // () puts everything in one line so no 'return' statement'
                                movies.map(movie => (
                                        <tr key={movie._id}>
                                            
                                            <td>{movie.title}</td>
                                            <td>{movie.genre.name}</td>
                                            <td>{movie.numberInStock}</td>
                                            <td>{movie.dailyRentalRate}</td>
                                            <td><Like onToggleLike={this.handleToggleLike} movie={movie} liked={movie.liked}/></td>
                                            <td><button onClick={() => this.handleDelete(movie._id)} className="btn btn-danger btn-sm">delete</button></td>
                                            
                                        </tr>
                                    )
                                )
                            }

                        </tbody>
                    </table>
                    <Pagination 
                        itemsCount={count} 
                        pageSize={pageSize} 
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    /> { /* we destructured adn renamed length of movies array from state with: 
                                                          const { length: count } = this.state.movies */ }

                    

                </React.Fragment>

            );
        }
    }
}
 
export default Movies;