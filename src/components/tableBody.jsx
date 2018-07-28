import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
    
    render() {
        const { data, columns } = this.props;
        
        return ( 
            <tbody>
            {data.map(item => <tr key={item._id}>{/* using lodash to get property value by supplying the object and a path
                                                e.g. object is { title: "Nba 2k16", genre: sports}, path is "title"
                                                    This circumvents paths nested like "genre.name" which you cannot use object[] to find 
                                                    */}
                    {columns.map(c => !c.key ? <td key={c.path}>{_.get(item, c.path)}</td> : <td key={c.key}>{c.content(item)}</td>)}
                </tr>)}
            </tbody>
        );
    }
}
 
export default TableBody;