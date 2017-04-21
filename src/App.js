import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var ScheduleActions = require( './actions/ScheduleActions' );
var ScheduleStore = require( './stores/ScheduleStore' );

class CourseList extends Component {
  constructor() {
    super();
    this.state = {
      sections: [],

    };

    this.renderSections = this.renderSections.bind( this );
    this.onChange = this.onChange.bind( this )

  }


  componentDidMount() {
    ScheduleStore.listen( this.onChange );
  }

  componentWillUnmount() {
    ScheduleStore.unlisten( this.onChange );
  }

  onChange( state ) {
    this.setState( {
      sections: state.enrolledSections
    } )

  }



  render() {

    const ul_style = {

      'listStyle': 'none'
    };

    return (
    <div>
      <ul className="enrolled" style={ ul_style }>
        { this.renderSections() }
      </ul>
    </div>
    );
  }


  renderSections() {
    var sections = [];

    for (var i = 0; i < this.state.sections.length; i++) {
      sections.push(
        React.createElement( 'li',
          {},
          <Section section_id={ this.state.sections[ i ].section_id }
                   instructors={ this.state.sections[ i ].instructors }
                   meetings={ this.state.sections[ i ].meetings }
                   seats={ this.state.sections[ i ].seats }
                   isEnrolled={ true }
                   index={ i } />
        )
      );

    }

    return sections
  }


}





class SearchBox extends Component {

  constructor() {
    super();
    this.state = {
      val: ''

    }

    this.handleChange = this.handleChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  handleChange( event ) {
    this.setState( {
      val: event.target.value.toUpperCase()
    } );
  }

  handleSubmit( event ) {
    event.preventDefault();

    ScheduleActions.searchSections( this.state.val )
  }


  render() {
    return (
    <div>
      <form onSubmit={ this.handleSubmit }>
        <label>
          Course Name:
          <input type="text"
                 value={ this.state.val }
                 onChange={ this.handleChange } />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>


    );

  }

}


class SearchResults extends Component {
  constructor() {

    super();
    this.state = {
      sections: []

    }
    this.onChange = this.onChange.bind( this );
    this.renderSections = this.renderSections.bind( this );


  }


  componentDidMount() {
    ScheduleStore.listen( this.onChange );
  }

  componentWillUnmount() {
    ScheduleStore.unlisten( this.onChange );
  }

  onChange( state ) {

    this.setState( {
      sections: state.searchResults
    } )

  }



  render() {

    const ul_style = {

      'listStyle': 'none'
    };

    return (
    <div>
      <ul className="notEnrolled" style={ ul_style }>
        { this.renderSections() }
      </ul>
    </div>
    );
  }


  renderSections() {
    var sections = [];

    for (var i = 0; i < this.state.sections.length; i++) {
      sections.push(
        React.createElement( 'li',
          {},
          <Section section_id={ this.state.sections[ i ].section_id }
                   instructors={ this.state.sections[ i ].instructors }
                   meetings={ this.state.sections[ i ].meetings }
                   seats={ this.state.sections[ i ].seats }
                   isEnrolled={ false }
                   index={ i } />
        )
      );

    }

    return sections
  }


}


class Section extends Component {
  constructor() {
    super();
    this.unenroll = this.unenroll.bind( this );
    this.enroll = this.enroll.bind( this );
    this.renderMeetings = this.renderMeetings.bind( this );

  }
  render() {
    return (
    <div className="section">
      <h3>{ this.props.section_id }</h3>
      <p>
        { this.props.instructors }
        <br/>
      </p>
      { this.renderMeetings( this.props.meetings ) }
      <p>
        Seats:
        { this.props.seats }
        <br/>
      </p>
      { this.props.isEnrolled ?
          <button onClick={ this.unenroll }>
            Remove
          </button> :
          <button onClick={ this.enroll }>
            Add
          </button> }
    </div>
    )
  }

  unenroll() {
    ScheduleActions.unenrollSection( this.props.index );
  }

  enroll() {

    ScheduleActions.enrollSection( this.props.index );

  }

  renderMeetings( arr ) {
   
    var meetings = [];

    for (var i = 0; i < arr.length; i++) {

      meetings.push(
        React.createElement( 'div',
          {},
          <p>
            { arr[ i ].classtype }
            { arr[ i ].day }
            { arr[ i ].start_time } -
            { arr[ i ].end_time }
          </p>

        )

      );

    }

    return meetings;

  }

}



class App extends Component {
  render() {
    return (
    <div >
      <SearchBox />
      <CourseList />
      <SearchResults />
    </div>
    );
  }
}

export default App;
