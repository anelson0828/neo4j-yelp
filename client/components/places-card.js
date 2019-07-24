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

const useStyles = makeStyles({
  card: {
    width: 345
  },
  media: {
    height: 140
  }
})

const PlacesCard = props => {
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
              <Button size="small" color="primary">
                Add to Date
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  )
}

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     backgroundColor: theme.palette.background.paper
//   },
//   gridList: {
//     width: 1000,
//     height: 450
//   },
//   icon: {
//     color: 'rgba(255, 255, 255, 0.54)'
//   },
//   card: {
//     maxWidth: 345
//   },
//   media: {
//     height: 140
//   }
// }))

// const PlacesCard = props => {
//   const places = props.places
//   const classes = useStyles()

//   return (
//     <GridList cellHeight={180} className={classes.gridList}>
//       <GridListTile key="Subheader" cols={10} style={{height: 'auto'}} />
//       {places.map(tile => (
//         <GridListTile key={tile.id}>
//           <img src={tile.image_url} alt={tile.title} />
//           <GridListTileBar
//             title={tile.title}
//             subtitle={
//               <span>
//                 {tile.title}
//                 {tile.rating}
//                 {tile.price}
//               </span>
//             }
//             actionIcon={
//               <IconButton
//                 aria-label={`info about ${tile.title}`}
//                 className={classes.icon}
//               >
//                 <InfoIcon />
//               </IconButton>
//             }
//           />
//         </GridListTile>
//       ))}
//     </GridList>
//   )
// }

export default PlacesCard
