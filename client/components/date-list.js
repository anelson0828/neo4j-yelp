import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {
  Container,
  ExpansionPanelDetails,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelActions
} from '@material-ui/core'
import {connect} from 'react-redux'
import {createDateThunk} from '../store/dates'
import {favoriteDateThunk} from '../store/selectedUser'
import {withRouter} from 'react-router-dom'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing(1)
  }
}))

const DisconnectedDatesCard = props => {
  const classes = useStyles()

  const favorite = date => {
    props.favoriteDate(date, props.selectedUser)
  }

  return (
    <Container>
      {props.dates.map(date => (
        <ExpansionPanel key={date.date.properties.name}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              {date.date.properties.name}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ul>
              {date.items.map(item => (
                <li key={item.properties.name}>{item.properties.name}</li>
              ))}
            </ul>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button
              size="small"
              onClick={() =>
                props.history.push(`/dates/${date.date.properties.name}`)
              }
            >
              View More
            </Button>
            <Button size="small" color="primary" onClick={() => favorite(date)}>
              Favorite
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      ))}
    </Container>
  )
}

const mapState = state => {
  return {
    dates: state.dates,
    selectedUser: state.selectedUser
  }
}

const mapDispatch = dispatch => {
  return {
    create: date => {
      dispatch(createDateThunk(date))
    },
    favoriteDate: (date, username) => {
      dispatch(favoriteDateThunk(date, username))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(DisconnectedDatesCard))
