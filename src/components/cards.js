import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
export default class MediaCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
    }
  }
  render() {
    const { movieData } = this.props
    return (
      this.props.movieData ?
        <Card style={{ maxWidth: '345px', margin: 10, padding: 20 }}>
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
          <CardActions>
            {
              this.props.Favourite.length && this.props.Favourite.includes(movieData.id) ? 
              <div onclick={this.props.handleRemoveFavrouite(movieData.id)}>
              Remove from Favourite
              </div> :
                <Button size="small" color="primary" onClick={this.props.handleAddToFavrouite(movieData.id)}>
                  Add to Favourite
                </Button>
            }
            <Link to={`/${movieData.id}/movies`}>
              <Button size="small" color="primary">
                More Info
              </Button>
            </Link>
          </CardActions>
        </Card> : <></>

    );
  }
}
