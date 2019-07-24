import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
})

export default function TemporaryDrawer(props) {
  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setState({...state, [side]: open})
  }

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Link
          to="/home"
          onClick={() => {
            props.setName('Home')
          }}
        >
          <ListItem button key="home">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link
          to="/search"
          onClick={() => {
            props.setName('Search')
          }}
        >
          <ListItem button key="search">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
        </Link>
        <Link
          to="/dates"
          onClick={() => {
            props.setName('Dates')
          }}
        >
          <ListItem button key="dates">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Dates" />
          </ListItem>
        </Link>
      </List>
    </div>
  )

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="Menu"
        onClick={toggleDrawer('left', true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  )
}
