import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Grid, Segment, Divider } from 'semantic-ui-react'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trendingMovies: [],
      popularMovies: []
    }
  }

  componentDidMount() {

    // Trending Movies
    fetch('https://api.trakt.tv/movies/trending', {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": "e51e26eee57ea109e331c7e3b83f2cb1ef1b23b3f779b5c13e27650c58986ba5"
      }
    })
      .then(response => response.json())
      .then((response) => {
        this.setState({
          trendingMovies: response
        });
      })

    //Popular Movies  
    fetch('https://api.trakt.tv/movies/popular', {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": "e51e26eee57ea109e331c7e3b83f2cb1ef1b23b3f779b5c13e27650c58986ba5"
      }
    })
      .then(response => response.json())
      .then((response) => {
        this.setState({
          popularMovies: response
        });
      })
  }

  render() {
    const trendinglistItems = this.state.trendingMovies.map((trendingMovie) =>
      // <div className="card" key={trendingMovie.movie.ids.slug}>
      //   <Link className="header" to={{ pathname: '/movies', state: { movie: trendingMovie, movieType: 'trending' } }}>
      //     <div>{trendingMovie.movie.title}</div>
      //     <div>{trendingMovie.movie.year}</div>
      //   </Link>
      // </div>
      <Grid.Column>
      <div className="card" key={trendingMovie.movie.ids.slug}>
        <Link className="header"to={{ pathname: '/movies', state: { movie: trendingMovie, movieType: 'trending' } }}>
        <div>{trendingMovie.movie.title}</div>
        <div>{trendingMovie.movie.year}</div>
        </Link>
      </div>
      </Grid.Column>
    )

    const popularlistItems = this.state.popularMovies.map((popularMovie) =>
      // <div className="card" key={popularMovie.ids.slug}>
      //   <Link className="header" to={{ pathname: '/movies', state: { movie: popularMovie, movieType: 'popular' } }}>
      //     <div>{popularMovie.title}</div>
      //     <div>{popularMovie.year}</div>
      //   </Link>
      // </div>

      <Grid.Column>
        <div className="card" key={popularMovie.ids.slug}>
          <Link className="header"to={{ pathname: '/movies', state: { movie: popularMovie, movieType: 'popular' } }}>
          <div>{popularMovie.title}</div>
          <div>{popularMovie.year}</div>
          </Link>
        </div>
        </Grid.Column>
    )

    if (this.state.trendingMovies.length > 0 && this.state.popularMovies.length > 0) {
      return (
        <div>


        <Grid>
        <Grid.Row className="center aligned row" columns={6}>
        <Grid.Column >
        <strong>MOVIES HUB</strong>
        </Grid.Column>
      </Grid.Row>
        <Grid.Row columns={2}>
        <Grid.Column >
        <div className="ui search">
        <div className="ui icon input">
          <input className="prompt" type="text" placeholder="Search for Movies..." />
          <i className="search icon"></i>
        </div>
      </div>
        </Grid.Column>
      </Grid.Row>
      
        </Grid>
        

          <Grid>
          <Grid.Row columns={2}>
          <Grid.Column width={4}><strong>TRENDING MOVIES:</strong>  </Grid.Column>
        </Grid.Row>
          </Grid>
           
            <div>
              <div>
               <Grid celled='internally' columns={10} stackable>
               {trendinglistItems}
                </Grid>
              </div>
            </div>
            <Grid>
            <Grid.Row className="center aligned row" columns={6}>
            <Grid.Column >
            </Grid.Column>
          </Grid.Row>
          </Grid>
            <Grid>
            <Grid.Row columns={2}>
            <Grid.Column width={4}><strong>POPULAR MOVIES:</strong>  </Grid.Column>
          </Grid.Row>
            </Grid>
             
              <div>
                <div>
                 <Grid celled='internally' columns={10} stackable>
                 {popularlistItems}
                  </Grid>
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
export default Home;
