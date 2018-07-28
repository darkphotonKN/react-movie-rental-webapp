import React, { Component } from 'react';

class TableHeader extends Component {

    // generate header elements of table depending on the columns array
    
    /* props needed 

    columns: array  
    sortColumn: object
    onSort: function
    */
   raiseSort = path => {
        const newSortColumn = { ...this.props.sortColumn };
        console.log(this.props.sortColumn);
        // flip order if path already estabilished as current sorted title
        if(newSortColumn.path === path) {
            newSortColumn.order = newSortColumn.order === 'asc' ? 'desc' : 'asc';
            
        // no path set yet so estabilish a path
        } else {
            newSortColumn.path = path; 
            newSortColumn.order = 'asc';
        }

        // pass the updated sorted list via calling the parent function that was passed as a 
        // prop to this MoviesTable class. The state will then be set at a single source of truth 
        // there at the parent class
        this.props.onSort(newSortColumn);
    }


    render() { 


        return ( 
            <thead>
            <tr>
                { this.props.columns.map(c => 
                    <th key={ c.path || c.key } onClick={() => this.raiseSort(c.path)}>{c.label}</th>
                ) }
                {/* <th onClick={() => this.raiseSort('title')}>Title</th>
                <th onClick={() => this.raiseSort('genre.name')}>Genre</th>
                <th onClick={() => this.raiseSort('numberInStock')}>Stock</th>
                <th onClick={() => this.raiseSort('dailyRentalRate')}>Rate</th>
                <th></th>
                <th></th>to lengthen table match delete btn area */}
            </tr>
        </thead>
        );
    }
}
 

export default TableHeader;