import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {

    
    renderTableCell = (column, item) => {
        if(!column.content) /* using lodash to get property value by supplying the object and a path
                                    e.g. object is { title: "Nba 2k16", genre: sports}, path is "title"
                                    This circumvents paths nested like "genre.name" which you cannot use object[] to find 
                                          V */
            return <td key={column.path}>{_.get(item, column.path)}</td>
        
        return <td key={column.key}>{column.content(item)}</td>
    }
    
    render() {
        const { data, columns } = this.props;
        
        return ( 
            <tbody>
                {data.map(item => <tr key={item._id}>
                        {columns.map(c => this.renderTableCell(c, item))}
                    </tr>)}
            </tbody>
        );
    }
}
 
export default TableBody;