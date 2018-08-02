import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

// putting all table components in one functional component for better reusability
const Table = props => {
    const { columns, onSort, movies, sortColumn } = props;

    return ( 
        <table className="table">
            <TableHeader 
                columns={columns}
                onSort={onSort}
                sortColumn={sortColumn}
            />

            <TableBody
                columns={columns}
                data={movies}
            >
            </TableBody>
        </table>
    );
}
 
export default Table;