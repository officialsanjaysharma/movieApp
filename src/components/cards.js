import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
export default class MediaCard extends React.Component {
constructor(props){
    super(props)
    this.state={
      id:0,
    }
}
render(){
    console.log(this.props.data)
  return (
    <Card style={{maxWidth: '345px'}}>
      <CardActionArea>
        <CardMedia
          style={{height:'140px'}}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add to Favourite
        </Button>
        <Link to={`/${this.state.id}/movies`}>
        <Button size="small" color="primary">
            More Info         
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
}
