import React from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import { auth, useAuth } from "../services/firebaseConfig"
import { useSignOut } from "react-firebase-hooks/auth"
import "../styles/NavBarStyles.css"
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';

const NavBar = () => {

    const currentUser = useAuth();
    const navigate = useNavigate();
    const [signOut, error] = useSignOut(auth);

    const [loading, setLoading] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            signOut();
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
        navigate('/');
    };

    if (error) {
        alert('It was not possible to sign out! Please try again!');
    }

    const [links, setLinks] = useState(true);

    const HandleButton = () => {
        setLinks(!links);
    }

    if (links === true) {
        return (
            <div className="Navbar">
                <div className="leftSide">
                    <div className="Links" id="hidden">
                        <Link className="Link" to="/home">
                            <img src="assets/icons/logo_icon-removebg-preview.png" alt="logo" style={{maxWidth: '50px'}}></img>
                        </Link>
                        <Link className="Link" to="/favourites">Favourites</Link>
                        <Link className="Link" to="/players">Players</Link>
                        <Link className="Link" to="/rankings">Rankings</Link>
                        <Link className="Link" to="/facts">DailyFacts</Link>
                    </div>
                    <button onClick={HandleButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>
                </div>
                <div className="rightSide">
                    <div>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <IconButton
                                onClick={handleClick}
                                size="large"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}>
                                <Avatar style={{position: 'relative', left: '18px', backgroundColor: '#1d4050'}} sx={{ width: 32, height: 32 }}>
                                    <AccountCircleRoundedIcon fontSize="large"></AccountCircleRoundedIcon>
                                </Avatar>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClick={handleClose}
                                slotProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                                <MenuItem>
                                    {currentUser.email}
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    <span onClick={(event) => { logout(event) }}>
                                        Log Out!
                                        <Link to="/"></Link>
                                    </span>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="Navbar">
                <div className="leftSide">
                    <div className="Links" id="">
                        <Link className="Link" to="/players">Players</Link>
                        <Link className="Link" to="/rankings">Rankings</Link>
                    </div>
                    <button onClick={HandleButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>
                </div>
                <div className="rightSide">
                    <button onClick={(event) => { logout(event) }}>
                        Log Out!
                        <Link to="/"></Link>
                    </button>
                </div>
            </div>
        )
    }
}
export default NavBar