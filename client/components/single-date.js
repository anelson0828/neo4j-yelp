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
import {fetchDateThunk} from '../store/selectedDate'

class DisconnectedSingleDate extends React.Component {
  componentDidMount() {
    this.props.getDate()
  }

  render() {
    return <Container>{this.props.date.date.properties.name}</Container>
  }
}

const mapState = state => {
  return {
    singleDate: state.singleDate
  }
}

const mapDispatch = dispatch => {
  return {
    getDate: name => dispatch(fetchDateThunk(name))
  }
}

export default connect(mapState, mapDispatch)(DisconnectedSingleDate)
