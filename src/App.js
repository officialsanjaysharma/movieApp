import React from 'react';
import './App.css';
import Cards from './components/cards'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { IconButton } from '@material-ui/core';

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
    fetch('')
      .then(res => res.json())
      .then(data => {
        this.setState({ favouriteList: data })
      })
  }
  componentDidMount() {
    // To fetch the trending movies
    fetch('http://57d5b473.ngrok.io/TopRatedMovies?api_key=8b5e3a87ebe14efb138bc4772c8b722c')
      .then(res => res.json())
      .then(res => {
        this.setState({ trendingMovies: res.data })
      })
  }
  componentWillMount() {

  }
  handleSearch = (e) => {
    this.setState({ search: e.target.value })
    if (e.target.value.length === 0) {
      this.setState({ searchProcess: false })
    }
  }
  handleSearchClick = () => {
    console.log(this.state.search)
    fetch(`http://57d5b473.ngrok.io/${this.state.search}?api_key=8b5e3a87ebe14efb138bc4772c8b722c`)
      .then(res => res.json())
      .then(res => {
        this.setState({ search: res.data, searchProcess: true })
      })
  }
  handleAddToFavrouite = (id) => {
    fetch('url', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(id), // body data type must match "Content-Type" header
    })
      .then(response => response.json()) // parses JSON response into native JavaScript objects 
      .then(response => {
        let tempArray = this.state.favouriteList;
        tempArray.push(id);
        this.setState({ favouriteList: tempArray })
      })
  }
  handleRemoveFavrouite = (id) => {
    // To delete the element from favourite 
    fetch(`http://57d5b473.ngrok.io/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(id), // body data type must match "Content-Type" header
    })
      .then(response => response.json()) // parses JSON response into native JavaScript objects 
      .then(response => {
        // Locally removing the element from favourite
        let tempArray = this.state.favouriteList;
        tempArray.splice(tempArray.findIndex(id), 1);
        this.setState({ favouriteList: tempArray })
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
                value={this.state.search}
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
            this.state.search.map(data => {
              return data.results.map(movieData => {
                return <Cards data={movieData} favouriteList={this.state.favouriteList} />
              })
            }) :
            // Trending Movies
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {
                (this.state.trendingMovies.length) ?
                  this.state.trendingMovies && this.state.trendingMovies.length ?
                    this.state.trendingMovies.map(data => {
                      return data.results.map(movieData => {
                        return <Cards movieData={movieData} handleRemoveFavrouite={this.handleRemoveFavrouite.bind(this)} handleAddToFavrouite={this.handleAddToFavrouite.bind(this)} favouriteList={this.state.favouriteList}></Cards>
                      })
                    })
                    : <></>
                  : <div></div>
              }
            </div>
        }
      </div>
    );
  }
}

export default App;
