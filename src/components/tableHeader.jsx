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

    // all logic for determining dynamic sort icon
    renderSortIcon = column => {
        const { sortColumn } = this.props;
        // if no sorted order we don't want an icon
        if(column.path !== sortColumn.path) {
            return null;
        }    
        // if order is asc shot ascending icon else descending icon
        if (sortColumn.order === 'asc') { 
            return <i className="fa fa-sort-asc ml-1"></i> 
        } else {
            return <i className="fa fa-sort-desc ml-1"></i> 
        }

    }


    render() { 


        return ( 
            <thead>
            <tr>
                { this.props.columns.map(c => 
                    <th key={ c.path || c.key } onClick={() => this.raiseSort(c.path)}>
                        {c.label}
                        {/* creating a dynamic sort icon, display for all columns but the like and delete column (when c.path !== true) */}
                        { c.path ? this.renderSortIcon(c): null }
                    </th>
                ) }

            </tr>
        </thead>
        );
    }
}
 

export default TableHeader;