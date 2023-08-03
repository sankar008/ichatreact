import React, { useState } from 'react'
import { Link } from 'react-router-dom'


import * as imgFeed from '../../../assets/img/ImgLib'
import styled from '@emotion/styled'
import { MdHomeFilled, MdMenu, MdOutlineExplore } from 'react-icons/md'
import { BiSearch } from 'react-icons/bi'
import { BsHeart, BsMessenger } from 'react-icons/bs'
import { FiPlusSquare } from 'react-icons/fi'
import { AppBar, Avatar, Box, Fab, IconButton, Toolbar } from '@mui/material'
import { FaHome, FaPlus } from 'react-icons/fa'
import { RiSettingsLine } from 'react-icons/ri'
import { CiBookmarkMinus } from 'react-icons/ci'
import { useEffect } from 'react'


const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });

const Index = () => {
    let [ isMobile, setIsMobile ] = useState(window.innerWidth);
    // let [ isMobile, setIsMobile ] = useState(false);
    // const [width, setWidth] = React.useState(window.innerWidth);
    
    useEffect(() => {
        /* window.addEventListener('load', screenOrientation, false);
        window.addEventListener('resize', screenOrientation, false); */
    }, [])
    /* let screenOrientation = function( ev ){
        if(window.matchMedia("(orientation: portrait)").matches){
            setIsMobile(!isMobile)
            console.log('this is mobile')
        }
        if(window.matchMedia("(orientation: landscape)").matches){
            setIsMobile(!isMobile)
            console.log('this is desktop')
        }
    } */
  return (
    <>
    { isMobile < 992 ? (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: '#434343cc', borderRadius: '30px 30px 0 0', backdropFilter: 'blur(44px)' }}>
            <Toolbar>
            <IconButton color="inherit" aria-label="open drawer">
                <FaHome />
            </IconButton>
            <IconButton color="inherit" aria-label="open drawer">
                {/* <FaBookmark /> */}
                <CiBookmarkMinus />
            </IconButton>
            <StyledFab aria-label="add" sx={{ backgroundColor: '#FF0014', color: '#ffffff' }}>
                <FaPlus />
            </StyledFab>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit">
                <RiSettingsLine />
            </IconButton>
            <IconButton color="inherit">
                <Avatar src={ imgFeed.userDefault } />
            </IconButton>
            </Toolbar>
        </AppBar>
    ):(
        <nav className="navbar navbar-expand-lg mx-0">
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasSideNavbar">

                <div className="offcanvas-header">
                    <button type="button" className="btn-close text-reset ms-auto" data-bs-dismiss="offcanvas"
                        aria-label="Close">
                    </button>
                </div>


                <div className="offcanvas-body d-block px-2 px-lg-0">
                    <div className="card overflow-hidden bg-transparent border-0">

                        <div className="card-body navLeft">


                            <ul className="nav nav-link-secondary flex-column fw-bold gap-3">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/parent/feed"> 
                                        <MdHomeFilled className="navIcon" size="1.6em" />
                                        <span>Home </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="">
                                        <BiSearch className="navIcon" size="1.6em" />
                                        <span>Search </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="">
                                        <MdOutlineExplore className="navIcon" size="1.6em" />
                                        <span>Explore </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="" >
                                        <BsMessenger className="navIcon" size="1.45em" />
                                        <span>Messages </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="">
                                        <BsHeart className="navIcon" size="1.4em" />
                                        <span>Notifications </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="">
                                        <FiPlusSquare className="navIcon" size="1.4em" />
                                        <span>Create </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">
                                        <Avatar className="navIcon" alt="" src={ imgFeed.userDefault } sx={{ width: 22, height: 22 }} />
                                        <span>Profile </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="">
                                        <MdMenu className="navIcon" size="1.4em" />
                                        <span>More </span>
                                    </Link>
                                </li>
                            </ul>

                        </div>

                    </div>
                </div>
            </div>
        </nav>
    )}

    </>
  )
}

export default Index