import React from 'react';
import Cards from '../components/cards';
export default class favourite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            favouriteList: []
        }
    }
    componentDidMount() {
        fetch('http://57d5b473.ngrok.io/Getallmovies')
            .then(res => res.json())
            .then(res => {
                this.setState({data:res.data})
            })
    }
    handleRemoveFavrouite = (id) => {
        // To delete the element from favourite 
        fetch('url', {
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
            <div>
                {
                    this.state.data.length?
                    this.state.data.map(data=>{
                        return data.result.map(movieData=>{
                            return <Cards movieData={movieData} handleRemoveFavrouite={this.props.handleRemoveFavrouite.bind(this)} favourite={this.state.favouriteList}></Cards>
                        })
                    }):<div>No Favourites</div>
                }
            </div>
        )
    }
}