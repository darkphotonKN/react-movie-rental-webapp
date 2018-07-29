import React, { Component } from 'react';
import Like from './like'; // for liking / unliking movies
import TableHeader from './tableHeader';
import TableBody from './tableBody';


class MoviesTable extends Component {

    columns = [
        { path: 'title', label: 'Title'},
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
            <table className="table">
                <TableHeader 
                    columns={this.columns}
                    onSort={onSort}
                    sortColumn={sortColumn}
                />

                <TableBody
                    columns={this.columns}
                    data={movies}
                >
                </TableBody>
            </table>
        );
    }
}
 


export default MoviesTable;