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

const DisconnectedPlacesCard = props => {
  const classes = useStyles()
  return (
    <Container>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        {props.places.map(place => (
          <Card
            borderRadius="borderRadius"
            padding={2}
            margin={10}
            boxShadow={1}
            key={place.id}
            className={classes.card}
          >
            <CardActionArea>
              <CardHeader
                title={place.name}
                subheader={place.categories[0].title}
              />
              <CardMedia
                className={classes.media}
                image={place.image_url}
                alt={place.name}
                title={place.name}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Rating: {place.rating}
                  <br />
                  Price: {place.price}
                  <br />
                  Address: {place.location.display_address.join(', ')}
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
                    name: place.name,
                    dateName: props.selectedDate.name
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

export default connect(mapState, mapDispatch)(DisconnectedPlacesCard)
