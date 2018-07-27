import React, { Component } from 'react';


class Like extends Component {

    render() { 
        return ( 
            
            <React.Fragment> 
                
                { this.props.liked === true ? <i onClick={() => this.props.onToggleLike(this.props.movie)} className="fa fa-heart" aria-hidden="true"></i> : <i onClick={() => this.props.onToggleLike(this.props.movie)} className="fa fa-heart-o" aria-hidden="true"></i>}
            
            </React.Fragment>
            
        );
    }
}
 
export default Like;