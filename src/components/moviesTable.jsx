import React, { Component } from 'react';
import Like from './like'; // for liking / unliking movies
import Table from './table';
import { Link } from 'react-router-dom';

class MoviesTable extends Component {

    columns = [
        { 
          path: 'title', 
          label: 'Title', 
          content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        },
        { path: 'genre.name', label: 'Genre'},
        { path: 'numberInStock', label: 'Stock'},
        { path: 'dailyRentalRate', label: 'Rate'},
        // for like column, content is a fn that returns a jsx expression Like component that takes a movie as an arg
        { key: 'like', content: movie => <Like onToggleLike={this.props.onLike} movie={movie} liked={movie.liked}/>}, 
        // same delete column
        { key: 'delete', content: movie => <button onClick={() => this.props.onDelete(movie._id)} className="btn btn-danger btn-sm">delete</button>} 
    ]
    

    render() { 
        // destructuring our props
        const { movies, onSort, sortColumn } = this.props;

        return (    
            <Table 
                movies={movies} 
                sortColumn={sortColumn} 
                onSort={onSort}
                columns={this.columns}
            />
        );
    }
}
 


export default MoviesTable;