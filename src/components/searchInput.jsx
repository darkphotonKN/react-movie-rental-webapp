import React, { Component } from 'react';

class SearchInput extends Component {

    // searchFilter = e => {
    //     const { movies, onSearch } = this.props;
    //     let moviesCopy = [ ...movies ];
    //     let moviesCopy2 = [ ...moviesCopy ];

    //     const moviesFiltered = moviesCopy2.filter(movie => {
    //         const movieMatch = movie.title.slice(0, e.currentTarget.value.length).toLowerCase();
    //         console.log(movieMatch);
    //         if(e.currentTarget.value === "") {
    //             moviesCopy2 = [ ...moviesCopy ];
    //             console.log(moviesCopy);
    //             return movie;
    //         }
    //         if(movieMatch===e.currentTarget.value.toLowerCase()) return movie;

    //         else {
    //             return null;
    //         }
    //     });

    //     // pass it to onSearch to be handled by main movies.jsx
    //     onSearch(moviesFiltered);
    // }

    render() {
        const { onChange } = this.props; // accessing handleSearch method in movies.jsx
        return ( 
            <div className="input-group mb-3">
                <input onChange={ e => onChange(e.currentTarget.value) } type="text" className="form-control" placeholder="Search..."/>
            </div>
        );
    }
}
 
export default SearchInput;