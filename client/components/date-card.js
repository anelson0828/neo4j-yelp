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

const DateCard = props => {
  const classes = useStyles()
  return (
    <Container>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        {props.dates.map(date => (
          <Card
            padding={2}
            margin={10}
            key={date.properties.name}
            className={classes.card}
          >
            <CardActionArea>
              <CardHeader title={date.properties.name} />

              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  <ul>
                    {/* {date.items.map(item => (
                      <li key={item.properties.name}>{item.properties.name}</li>
                    ))} */}
                  </ul>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>
  )
}

export default DateCard
