import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {flexbox, spacing, borders, shadows} from '@material-ui/system'
import {Container, Box} from '@material-ui/core'
import {connect} from 'react-redux'
import {addPlaceThunk} from '../store/selectedDate'

const useStyles = makeStyles({
  card: {
    width: 345
  },
  media: {
    height: 140
  }
})

const DisconnectedMoviesCard = props => {
  const classes = useStyles()
  return (
    <Container>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        {props.movies.map(movie => (
          <Card padding={2} margin={10} key={movie.id} className={classes.card}>
            <CardActionArea>
              <CardHeader title={movie.title} />
              <CardMedia
                className={classes.media}
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                title={movie.title}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Rating: {movie.vote_average}
                  <br />
                  Overview: {movie.overview}
                  <br />
                  Release Date: {movie.release_date}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Favorite
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  props.create({
                    name: movie.title,
                    dateName: props.selectedDate.properties.name
                  })
                }}
              >
                Add to Date
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  )
}

const mapState = state => {
  return {
    selectedDate: state.selectedDate
  }
}

const mapDispatch = dispatch => {
  return {
    create: place => {
      dispatch(addPlaceThunk(place))
    }
  }
}

export default connect(mapState, mapDispatch)(DisconnectedMoviesCard)
