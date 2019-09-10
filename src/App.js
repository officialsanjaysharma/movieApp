import React from 'react';
import './App.css';
import Cards from './components/cards'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { IconButton } from '@material-ui/core';
import { Typography } from '@material-ui/core'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: [],
      trendingMovies: [],
      searchProcess: false,
      favouriteList: []
    }
  }
  componentWillMount() {
    // To fetch the favourite list
    fetch('http://5365c1ad.ngrok.io/Getallmovies')
      .then(res => res.json())
      .then(res => {
        this.setState({ favouriteList: res.data })
      })
  }
  componentDidMount() {
    // To fetch the trending movies
    fetch('http://5365c1ad.ngrok.io/TopRatedMovies?api_key=8b5e3a87ebe14efb138bc4772c8b722c')
      .then(res => res.json())
      .then(res => {
        this.setState({ trendingMovies: res.data })
      }).catch(err => console.log(err))
  }

  handleSearch = (e) => {
    this.setState({ searchValue: e.target.value })
    if (e.target.value.length === 0) {
      this.setState({ searchProcess: false })
    }
  }
  handleSearchClick = () => {
    console.log(this.state.search)
    fetch(`http://5365c1ad.ngrok.io/${this.state.searchValue}?api_key=8b5e3a87ebe14efb138bc4772c8b722c`)
      .then(res => res.json())
      .then(res => {
        this.setState({ search: res.data, searchProcess: true })
      })
  }


render() {
  return (
    <div className="App">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'Wrap',
          justifyContent: 'center',
          height: 40,
          top: 20
        }}>
        <div>
          <span>
            <InputBase
              placeholder="Search…"
              value={this.state.searchValue}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => this.handleSearch(e)}
            />
          </span>
          <span>
            <IconButton
              onClick={() => this.handleSearchClick()}
            >
              <SearchIcon />
            </IconButton>
          </span>
        </div>
      </div>
      {
        (this.state.search.length && this.state.searchProcess) ?
          // Searched Movies
          <div>
            <Typography variant="h6" style={{ textAlign: "center", paddingTop: 20 }}>Searched Movies</Typography>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {
                this.state.search.map(data => {
                  return data.results.map(movieData => {
                    return <Cards movieData={movieData} favouriteList={this.state.favouriteList} />
                  })
                })
              }
            </div>
          </div>
          :
          // Trending Movies
          <div>
            <Typography variant="h6" style={{ textAlign: "center", paddingTop: 20 }}>Trending Movies</Typography>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {
                (this.state.trendingMovies.length) ?
                  this.state.trendingMovies && this.state.trendingMovies.length ?
                    this.state.trendingMovies.map(data => {
                      return data.results.map((movieData,index) => {
                        return <Cards
                          movieData={movieData}
                          key={index}
                          favouriteList={this.state.favouriteList}
                          >
                        </Cards>
                      })
                    })
                    : <></>
                  : <div></div>
              }
            </div>
          </div>
      }
    </div>
  );
}
}

export default App;
