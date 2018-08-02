import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {

    
    renderTableCell = (item, column) => {
        // if there exists a 'content' property (which is a fn as we defined it), return that passing in the current
        // movie object which was passed into this function as the 'item' argument
        if(column.content) 
            return column.content(item);
        /* using lodash to get property value by supplying the object and a path
        e.g. object is { title: "Nba 2k16", genre: sports}, path is "title"
        This circumvents paths nested like "genre.name" which you cannot use object[] to find */
        return _.get(item, column.path);
    }
    
    render() {
        const { data, columns } = this.props;
        
        return ( 
            <tbody>
                {data.map(item => <tr key={item._id}>
                        {columns.map(c => <td key={item._id + (c.path || c.key)}>{this.renderTableCell(item, c)}</td>)}
                    </tr>)}
            </tbody>
        );
    }
}
 
export default TableBody;