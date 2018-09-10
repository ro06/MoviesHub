import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Grid, Segment, Divider } from 'semantic-ui-react'

class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movieCast: {},
      movieDetail: {}
    }
  }

  componentDidMount() {
    const movie = this.props.location.state.movie;
    if (this.props.location.state.movieType !== 'popular' && this.props.location.state.movieType !== 'trending') {
    let slugMovieId = movie.movie.ids.slug;
    //Movie Detailed Details
    fetch('https://api.trakt.tv/movies/'+ slugMovieId + '?extended=full', {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": "e51e26eee57ea109e331c7e3b83f2cb1ef1b23b3f779b5c13e27650c58986ba5"
      }
    })
      .then(response => response.json())
      .then((response) => {
        this.setState({ movieDetail: response });
      })

     // let slugMovieId = movie.movie.ids.slug;
      let url = 'https://api.trakt.tv/movies/' + slugMovieId + '/people';

      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": 2,
          "trakt-api-key": "e51e26eee57ea109e331c7e3b83f2cb1ef1b23b3f779b5c13e27650c58986ba5"
        }
      })
        .then(response => response.json())
        .then((response) => {
          this.setState({
            movieCast: response
          });
        })
    }
    else if (this.props.location.state.movieType === 'trending') {
      // Get Cast for Trending movie
      let slugMovieId = movie.movie.ids.slug;
      let url = 'https://api.trakt.tv/movies/' + slugMovieId + '/people';

      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": 2,
          "trakt-api-key": "e51e26eee57ea109e331c7e3b83f2cb1ef1b23b3f779b5c13e27650c58986ba5"
        }
      })
        .then(response => response.json())
        .then((response) => {
          this.setState({
            movieCast: response
          });
        })
    } else if (this.props.location.state.movieType === 'popular') {
      // Get Cast for Popular movie
      let slugMovieId = movie.ids.slug;
      let url = 'https://api.trakt.tv/movies/' + slugMovieId + '/people';

      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": 2,
          "trakt-api-key": "e51e26eee57ea109e331c7e3b83f2cb1ef1b23b3f779b5c13e27650c58986ba5"
        }
      })
        .then(response => response.json())
        .then((response) => {
          this.setState({
            movieCast: response
          });
        })
    } else {
      let slugMovieId = movie.movie.ids.slug;
      let url = 'https://api.trakt.tv/movies/' + slugMovieId + '/people';

      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": 2,
          "trakt-api-key": "e51e26eee57ea109e331c7e3b83f2cb1ef1b23b3f779b5c13e27650c58986ba5"
        }
      })
        .then(response => response.json())
        .then((response) => {
          this.setState({
            movieCast: response
          });
        })
    }
  }

  render() {
    const movie = this.props.location.state.movie;

    if (this.state.movieCast.hasOwnProperty('cast')) {
      const castInMovielistItems = this.state.movieCast.cast.map((castInMovieObj) =>
      // <Grid.Column>
      //   <div className="card" key={castInMovieObj.person.ids.slug}>
      //     <Link className="header" to={{ pathname: '/cast', state: { castInfo: castInMovieObj } }}>
      //       <div><div><strong>{castInMovieObj.person.name}</strong></div> as:  <div>{castInMovieObj.character}</div></div>
      //     </Link>
      //   </div>
      //   </Grid.Column>
        <div className="card" key={castInMovieObj.person.ids.slug}>
        <Link className="header" to={{ pathname: '/cast', state: { castInfo: castInMovieObj} }}>
          <div><div><strong>{castInMovieObj.person.name}</strong></div>
           <div>{castInMovieObj.character}</div></div>
        </Link>
      </div>

       
      )

      return (
        <div>
     
        <Grid>
        <Grid.Row className="center aligned row" columns={6}>
        <Grid.Column >
        <strong>MOVIE DETAILS</strong>
        </Grid.Column>
      </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={4}><strong> TITLE:</strong> </Grid.Column>
          <Grid.Column width={12}>{this.props.location.state.movieType === 'popular' ? movie.title : movie.movie.title}</Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={4}> <strong> OVERVIEW:</strong></Grid.Column>
          <Grid.Column width={12}> {this.state.movieDetail.overview}</Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={4}><strong> RELEASE YEAR:</strong> </Grid.Column>
          <Grid.Column width={12}> {this.props.location.state.movieType === 'popular' ? movie.year : movie.movie.year}</Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={4}><strong>RUNTIME:</strong>  </Grid.Column>
          <Grid.Column width={12}>{this.state.movieDetail.runtime}</Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
        <Grid.Column width={4}><strong>CAST:</strong>  </Grid.Column>
      </Grid.Row>
        </Grid>
        <div className="ui link cards">
        <div className="ui ten stackable cards">
        {castInMovielistItems}
        </div>
      </div>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}
export default Movies;
