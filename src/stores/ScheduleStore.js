var alt = require( '../alt' );
var ScheduleActions = require( '../actions/ScheduleActions' );


class ScheduleStore {

  constructor() {

    this.searchResults = [];
    this.currCourse = '';
    this.enrolledSections = [];


    this.bindListeners( {
      handleSearch: ScheduleActions.updateSearchResults,
      handleEnroll: ScheduleActions.addEnrolledSection,
      handleUnenroll: ScheduleActions.removeEnrolledSection

    } );
  }

  handleSearch( response ) {

    this.searchResults = response;
    this.currCourse = response[ 0 ].course;


  }

  handleEnroll( index ) {
    var section = this.searchResults.splice( index, 1 )[ 0 ];
    this.enrolledSections.push( section );

  }

  handleUnenroll( index ) {
    var section = this.enrolledSections.splice( index, 1 )[ 0 ];
    if ( section.course === this.currCourse )
      this.searchResults.splice( index, 0, section );



  }

}

module.exports = alt.createStore( ScheduleStore, 'ScheduleStore' );
