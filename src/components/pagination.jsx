import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = (props) => {
    // render page numbers depending on the number of pages
    
    // destructure props first, we have props.itemsCount and props.pageSize which simplies to:
    const { itemsCount, pageSize, currentPage, onPageChange } = props;
    const pagesCount = Math.ceil(itemsCount / pageSize); // number of pages, rounded to the highest number
    // we need our array to have [1 ... pagesCount] in length and then .map() it
    // use lodash to make the array ( npm i lodash@4.17.10 )
    const pages =  _.range(1, pagesCount + 1); // this gives an array with the correct no. of pages
                                                // number needs to be +1 higher to generate the right size
                                                // Same as:
                                                // const pages = [];
                                                // for(let i = 0; i<pagesCount; i++) {
                                                //     pages[i] = i+1;
                                                // }
    // when there is 1 page only, don't display number of pages 
    if(pagesCount===1) return null;

    return ( 

        <div className="row">
            <div className="col-10"></div>
            <div className="col-1">
                <nav>
                    <ul className="pagination">
                        {/* Dynamically render the number of pages depending on how many items there are
                        and what we set 'pageSize' to be. We map (used like a loop for react jsx) to an 
                        array 'pages' with the size = the numbe of pages we need (pagesCount) */}

                        {pages.map(page => {      // add active if === currentPage from pages = [1,2,3..]
                            return <li key={page} onClick={() => onPageChange(page)} className={ page===currentPage ? 'page-item active' : 'page-item' }><a className="page-link">{page}</a></li>
                        })}
                        
                    </ul>
                </nav>
            
            </div>
            <div className="col-1"></div>
        </div>



    );
}

// after defining pagination, we do type checking with propTypes

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired, 
}
 
export default Pagination;