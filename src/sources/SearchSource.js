import 'whatwg-fetch';



const SearchSource = {

  searchForSections( courseId ) {

    return fetch( 'http://api.umd.io/v0/courses/sections?course=' + courseId )
      .then( (response) => {

        return response.json();
      } );


  }

}





module.exports = SearchSource;
