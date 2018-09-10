import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Grid, Segment, Divider } from 'semantic-ui-react'

class Cast extends Component {

  constructor(props) {
    super(props);
    this.state = {
      personalDetail: {},
      otherMovies: []
    }
  }

  componentDidMount() {
    const castInfo = this.props.location.state.castInfo;

    let slugCastId = castInfo.person.ids.slug;

    // Personal Details
    fetch('https://api.trakt.tv/people/' + slugCastId + '?extended=full', {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": "e51e26eee57ea109e331c7e3b83f2cb1ef1b23b3f779b5c13e27650c58986ba5"
      }
    })
      .then(response => response.json())
      .then((response) => {
        this.setState({ personalDetail: response });
      })
    // Other Movies
    fetch('https://api.trakt.tv/people/' + slugCastId + '/movies', {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": "e51e26eee57ea109e331c7e3b83f2cb1ef1b23b3f779b5c13e27650c58986ba5"
      }
    })
      .then(response => response.json())
      .then((response) => {
        this.setState({ otherMovies: response });
      })
  }

  render() {
    //const castInfo = this.props.location.state.castInfo;

    if (this.state.otherMovies.hasOwnProperty('cast')) {
      const otherMovies = this.state.otherMovies.cast.map((tempAlsoAppeared) =>
        <div className="card" key={tempAlsoAppeared.movie.ids.slug}>
          <Link className="header" to={{ pathname: '/movies', state: { movie: tempAlsoAppeared, movieType: 'all' } }}>
            <div>{tempAlsoAppeared.movie.title}</div>
            <div>{tempAlsoAppeared.movie.year}</div>
          </Link>
        </div>
      )

      return (
<div>
        <Grid>
        <Grid.Row className="center aligned row" columns={6}>
        <Grid.Column >
        <strong>CAST DETAILS</strong>
        </Grid.Column>
      </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={4}><strong> NAME:</strong> </Grid.Column>
          <Grid.Column width={12}>{this.state.personalDetail.name}</Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={4}> <strong>BIRTHDAY:</strong></Grid.Column>
          <Grid.Column width={12}> {this.state.personalDetail.birthday}</Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={4}><strong> BIRTHPLACE:</strong> </Grid.Column>
          <Grid.Column width={12}>{this.state.personalDetail.birthplace}</Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={4}><strong>DEATH:</strong>  </Grid.Column>
          <Grid.Column width={12}>{this.state.personalDetail.death ? this.state.personalDetail.death : 'ALIVE'}</Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
        <Grid.Column width={4}><strong>BIOGRAPHY:</strong>  </Grid.Column>
        <Grid.Column width={12}> {this.state.personalDetail.biography}</Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={4}><strong>URL:</strong>  </Grid.Column>
        <Grid.Column width={12}> {this.state.personalDetail.homepage}</Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
      <Grid.Column width={4}><strong>ALSO APPEARED IN:</strong>  </Grid.Column>
    </Grid.Row>
        </Grid>
        <div className="ui link cards">
          <div className="ui ten stackable cards">
            {otherMovies}
          </div>
        </div>
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}
export default Cast;
