import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import TemporaryDrawer from './nav-drawer'
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const DisconnectedMenuAppBar = props => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)

  const open = Boolean(anchorEl)

  function handleMenu(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <TemporaryDrawer />
          <Typography variant="h6" className={classes.title}>
            {props.selectedUser.name}
          </Typography>
          <div>
            <IconButton
              aria-label="Account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>
                {props.selectedUser.name} account
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapState = state => {
  return {
    selectedUser: state.selectedUser
  }
}

export default connect(mapState)(DisconnectedMenuAppBar)
