// Function for Filtering Array to show only a specific portion of the Array  

// Convert the array of movie objects, into smaller chunks = pageSize
// - We have an updated state of currentPage and pageSize to use 
// - We can splice the array to only have movies we need
// - Everytime the state changes and the currentPage and pageSize changes, the function calls and 
//   returns a different list of movies for the page to show/ 

export function paginate(movies, currentPage, pageSize) {
    const startPoint = ((currentPage-1)*pageSize); // e.g. if pageSize is 4 per page and we are on page 2,
                                             // index should be 4*(2-1)-1 = 
                                             // end point index should be index+pageSize
    // const endPoint = startPoint+pageSize;
    // console.log(startPoint);
    // console.log(endPoint);
    
    // copy movies so it doesn't ruin original 
    const moviesCopy = [...movies];
    const pageOfMovies = moviesCopy.splice(startPoint, pageSize);

    return pageOfMovies;
}