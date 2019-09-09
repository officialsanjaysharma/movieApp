import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class movieInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieData:{}
        }
    }
    componentDidMount(){
        fetch(`http://57d5b473.ngrok.io/${this.props}?api_key=8b5e3a87ebe14efb138bc4772c8b722c`)
        .then(res=>res.JSON())
        .then(res=>{
            this.setState({movieData:res.data.results[0]})
        })
    }
    render() {
        const {movieData}=this.state
        return (
            this.state.movieData ?
            <Card style={{ maxWidth: '1145px', margin: 40, padding: 20 }}>
              <CardActionArea>
                <CardMedia
                  style={{ height: '140px' }}
                  image={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
                  title={movieData.original_title}
                />
                <CardContent style={{ textAlign: "left" }}>
                  <Typography gutterBottom variant="h7" component="h2">
                    Name:{movieData.original_title}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="h3">
                    Popularity:{movieData.popularity}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Overview:{movieData.overview}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card> : <></>
    
        )
    }
}
export default movieInfo;