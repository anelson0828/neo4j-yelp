import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import UserIcon from '@material-ui/icons/AccountCircle'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import PeopleIcon from '@material-ui/icons/People'
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
        <Link to="/home">
          <ListItem button key="home">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link to="/search">
          <ListItem button key="search">
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
        </Link>
        <Link to="/dates">
          <ListItem button key="dates">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Dates" />
          </ListItem>
        </Link>
        <Link to="/users">
          <ListItem button key="users">
            <ListItemIcon>
              <UserIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
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
