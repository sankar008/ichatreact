import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';

import { toast } from "react-toastify";
import Sidebar from '../../particals/sudebar'
import Story from '../../particals/story';
import './feed.scss'
import * as imgFeed from '../../../assets/img/ImgLib'
import { feedPost } from '../../../assets/img/ImgLib';
import AccountType from "../../../components/AccountType";

import { Avatar, Button, Divider, Paper, List, ListItem, ListItemAvatar, ListItemText, Typography, ImageList, ImageListItem, CardMedia, Box, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';


import { MdVerified } from "react-icons/md"
import { BiVideo } from "react-icons/bi"
import { BsHeart, BsEmojiSmile, BsChat, BsSend, BsHeartFill, BsBookmark, BsBookmarkFill } from "react-icons/bs"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import SuggestionCard from '../../particals/SuggestionCard';
import { FaRegStar, FaStar, FaTimes } from 'react-icons/fa';
import { Masonry } from '@mui/lab';
import styled from '@emotion/styled';
import { Card } from 'react-bootstrap';
import axios from "axios";
import * as c from "../../../api/constant";



/* ====*** Design Support ***==== *//*

https://mui.com/material-ui/react-skeleton/#animations
https://mui.com/material-ui/react-progress/

*//* ====*** Design Support ***==== */


const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: '0.5em',
  textAlign: 'center',
  color: '#000',
}));

const FeedPost = () => {
    const location = useLocation()
    let [ isFocusPost, setIsFocusPost ] = useState(false);
    let [ suggestFriends, setSuggestfriends ] = useState([]);
    let [ postCode, setPostCode ] = useState(location.state.postCode);
    let [post, setPost] = useState([]);
    
    const getSingelPost = async () => {
      const header = localStorage.getItem("__tokenCode");  
      const userCode = localStorage.getItem("__userId");    
      const url = c.POST+'/'+postCode;

      const res = await axios.get(url, {
          headers: JSON.parse(header),
      });

      if(res.data.success == 1){
        setPost(res.data.data)
      }
    }

    useEffect(() => { 
        getSingelPost();          
        document.getElementsByTagName('html')[0].setAttribute('data-bs-theme', 'dark');
        autoResize();
    }, []);
    
    function autoResize() {
        document.querySelectorAll('[data-autoresize]').forEach(function (element) {
			var offset = element.offsetHeight - element.clientHeight;
			element.addEventListener('input', function (event) {
				event.target.style.height = 'auto';
				event.target.style.height = event.target.scrollHeight + offset + 'px';
			});
		});
    };
    const focusPost = () => {
        setIsFocusPost(true)
    };
    useEffect(() => {
        const skipPost = (event) => {
            if (event.key === 'Escape') {
                setIsFocusPost(false);
                document.getElementById('postField').value = '';
                document.getElementById('postField').blur();
            }
          };
        document.body.classList.toggle('readyPost', isFocusPost);
        document.addEventListener('keydown', skipPost);

        return () => {
            document.body.classList.remove('readyPost');
            document.removeEventListener('keydown', skipPost);
        };
    }, [isFocusPost]);

    const [checked, setChecked] = React.useState([0]);
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

  
    
  return (
    JSON.parse(localStorage.getItem("isLoginCheck"))?
    <>
        <main className='py-5'>
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-3">
                        <div className="d-flex align-items-center justify-content-center">
                            <Link href="/"><img className='img-fluid' src={ imgFeed.logoLight } alt="" /></Link>
                        </div>
                        <Sidebar />
                    </div>
                    <div className="col-md-8 col-lg-9 vstack gap-4">
                        <div className="row">
                            <div className="col-lg-8">
                                <Story />
                            </div>
                            <div className="col-lg-4">
                                <div className="row g-4">

                                    <div className="col-12">
                                        <div className="card bg-transparent border-0" style={{'--bs-card-bg': 'transparent !important'}}>

                                            <div className="card-header bg-transparent px-0 d-flex align-items-center justify-content-between">
                                                <h5 className="card-title fs-6 mb-0">Suggestions for you</h5>
                                                <Link className="link-light fs-6 link-underline-opacity-0">See All</Link>
                                            </div>


                                            <div className="card-body p-0">

                                                {/* <List
                                                    className="suggListUser"
                                                    sx={{
                                                        width: '100%',
                                                        // maxWidth: 360,
                                                        bgcolor: 'transparent',
                                                        border: 'none',
                                                        borderColor: 'primary.main',
                                                        borderRadius: 1
                                                    }}
                                                    >
                                                    {
                                                        suggestFriends.map((friends, key)=>{
                                                            return (
                                                                <ListItem className="px-0"
                                                                secondaryAction={
                                                                    <Button onClick={() => sendFriedRequest(friends.userCode)} variant="text" edge="end" sx={{textTransform: 'capitalize'}}>Follow</Button>
                                                                }
                                                                key={key}
                                                            >
                                                                <ListItemAvatar>
                                                                    <Avatar src={ imgFeed.userDefault } />
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary={
                                                                        <Typography className="" color="var(--bs-light-text-emphasis)">
                                                                            {friends.firstName+' '+friends.lastName}
                                                                        </Typography>
                                                                    }
                                                                    secondary={
                                                                        <Typography component="span" variant="body2" color="var(--bs-gray-300)">
                                                                        Follows you
                                                                        </Typography>
                                                                    }
                                                                />
                                                            </ListItem>
                                                            )
                                                        })
                                                    }
                                                
                                                </List> */}
                                            </div>
                                        </div>
                                    </div>

                                    
                                    {/* <div className="col-12">
                                        <ul className="nav small mt-4 lh-1 footer-quick-link">
                                            <li className="nav-item">
                                                <Link className="nav-link" to="#">About</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="#">Help</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="#">Press</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" target="_blank" to="#">API</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" target="_blank" to="#">Jobs</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="#">Privacy</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="#">Terms</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="#">Locations</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    


                                    <p className="small mt-2">© 2023 <Link className="text-body" target="_blank" to="#"> iCHAT </Link>
                                    </p> */}

                                </div>
                            </div>
                        </div>
                        


                        

                        <div className="row">
                            <div className="col-12">
                              <div className="row">
                                <div className="col-md-7">
                                  <CardMedia
                                      component="img"
                                      // image="https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/1.jpg"
                                      image={ feedPost.i1 }
                                      alt=""
                                      sx={{ borderRadius: '40px 40px 0 40px' }}
                                  />
                                </div>
                                <div className="col-md-5">
                                  <Card className='text-bg-dark h-100 d-flex flex-column'>
                                    <List
                                        className="suggListUser"
                                        sx={{
                                            width: '100%',
                                            // maxWidth: 360,
                                            bgcolor: 'transparent',
                                            border: 'none',
                                            borderColor: 'primary.main',
                                            borderRadius: 1,
                                        }}
                                    >
                                        <ListItem 
                                            className=""
                                            sx={{  }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar src="" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography className="" color="var(--bs-light-text-emphasis)">
                                                        sdfsdf
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography component="span" variant="body2" color="var(--bs-gray-300)">
                                                        19 hour ago 
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    </List>
                                    <Box sx={{ mt: 'auto' }}>
                                      <List
                                          className="suggListUser"
                                          sx={{
                                              width: '100%',
                                              // maxWidth: 360,
                                              bgcolor: 'transparent',
                                              border: 'none',
                                              borderTop: '1px solid',
                                              borderColor: '#373737',
                                              borderRadius: 0,
                                          }}
                                      >
                                          <ListItem 
                                              className=""
                                              secondaryAction={
                                                <Button  variant="text" edge="end" sx={{textTransform: 'capitalize', color: '#fff', fontSize: '1.2em'}}>4.2k &nbsp; <FaStar size="22" /></Button>
                                              }
                                              sx={{  }}
                                          >
                                            <Typography>16 comments</Typography>
                                          </ListItem>
                                          <ListItem>
                                            <FormControl fullWidth sx={{ mt: 1, border: 'none', background: '#f8f8f81a', borderRadius: '50px' }}>
                                              <OutlinedInput
                                                id="outlined-adornment-amount"
                                                startAdornment={ <Avatar sx={{ mr: 2, height: '1.5em', width: '1.5em' }} /> }
                                                placeholder="Add a comment..."
                                                sx={{ color: '#f3f3f3' }}
                                              />
                                            </FormControl>
                                          </ListItem>
                                      </List>
                                    </Box>
                                  </Card>
                                </div>
                              </div>
                              <Masonry className="feedHolder" columns={3} spacing={4} sx={{ mt: 2 }}>
                                  {/* {heights.map((height, index) => (
                                  <Item key={index} sx={{ height }}>
                                      {index + 1}
                                  </Item>
                                  ))} */}
                                  { stories.map((stry) => (
                                      <Item key={stry.id} sx={{ }}>
                                          <Card className='text-bg-dark'>
                                              <Link to="/parent/feed-post">
                                                <CardMedia
                                                    component="img"
                                                    // image="https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/1.jpg"
                                                    image={ stry.banner }
                                                    alt={ stry.name }
                                                    // sx={{ height: '10em' }}
                                                />
                                              </Link>
                                              <List
                                                  className="suggListUser"
                                                  sx={{
                                                      width: '100%',
                                                      // maxWidth: 360,
                                                      bgcolor: 'transparent',
                                                      border: 'none',
                                                      borderColor: 'primary.main',
                                                      borderRadius: 1,
                                                  }}
                                              >
                                                  <ListItem 
                                                      className=""
                                                      secondaryAction={
                                                          <Button  variant="text" edge="end" sx={{textTransform: 'capitalize', color: '#fff', fontSize: '1.2em'}}>4.2k &nbsp; { stry.mark_state? <FaStar size="22" />:<FaRegStar size="22" /> }</Button>
                                                      }
                                                      sx={{ px: 0 }}
                                                  >
                                                      <ListItemAvatar>
                                                          <Avatar src={ stry.photo } />
                                                      </ListItemAvatar>
                                                      <ListItemText
                                                          primary={
                                                              <Typography className="" color="var(--bs-light-text-emphasis)">
                                                                  { stry.name }
                                                              </Typography>
                                                          }
                                                          secondary={
                                                              <Typography component="span" variant="body2" color="var(--bs-gray-300)">
                                                                  19 hour ago 
                                                              </Typography>
                                                          }
                                                      />
                                                  </ListItem>
                                              </List>
                                          </Card>
                                      </Item>
                                  )) }
                                  
                                  {/* <Item rows={2} sx={{ flex: '0 0 80%' }}>
                                      Hello 1
                                  </Item>
                                  <Item sx={{  }}>
                                      Hello 2
                                  </Item>
                                  <Item sx={{  }}>
                                      Hello 3
                                  </Item> */}
                              </Masonry>
                            
                            </div>
                        </div>

                    </div>



                </div>
            </div>


        </main>
    </>:<AccountType/>
  )
}


const timestamp = function () {
    let timeIndex = 1678166046264 / 1000;
    let random = Math.floor(Math.random() * 1000);
  
    return Math.round(timeIndex - random);
};
  

let stories = [
    {
      id: 'ramon',
      photo: 'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/users/1.jpg',
      banner: feedPost.i1,
      mark_state: true,
      name: 'Ramon',
      time: timestamp(),
      items: [
        {
          id: 'ramon-1',
          type: 'photo',
          length: 3,
          src: 'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/1.jpg',
          preview:
            'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/1.jpg',
          link: '',
          linkText: false,
          time: timestamp()
        },
        {
          id: 'ramon-2',
          type: 'video',
          length: 0,
          src: 'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/2.mp4',
          preview:
            'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/2.jpg',
          link: '',
          linkText: false,
          time: timestamp()
        },
        {
          id: 'ramon-3',
          type: 'photo',
          length: 3,
          src: 'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/3.png',
          preview:
            'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/3.png',
          link: 'https://ramon.codes',
          linkText: 'Visit my Portfolio',
          time: timestamp()
        }
      ]
    },
    {
      id: 'gorillaz',
      photo:
        'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/users/2.jpg',
      banner: feedPost.i2,
      mark_state: false,
      name: 'Gorillaz',
      time: timestamp(),
      items: [
        {
          id: 'gorillaz-1',
          type: 'video',
          length: 0,
          src: 'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/4.mp4',
          preview:
            'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/4.jpg',
          link: '',
          linkText: false,
          time: timestamp()
        },
        {
          id: 'gorillaz-2',
          type: 'photo',
          length: 3,
          src: 'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/5.jpg',
          preview:
            'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/5.jpg',
          link: '',
          linkText: false,
          time: timestamp()
        }
      ]
    },
    {
      id: 'ladygaga',
      photo:
        'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/users/3.jpg',
      banner: feedPost.i3,
      mark_state: false,
      name: 'Lady Gaga',
      time: timestamp(),
      items: [
        {
          id: 'ladygaga-1',
          type: 'photo',
          length: 5,
          src: 'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/6.jpg',
          preview:
            'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/6.jpg',
          link: '',
          linkText: false,
          time: timestamp()
        },
        {
          id: 'ladygaga-2',
          type: 'photo',
          length: 3,
          src: 'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/7.jpg',
          preview:
            'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/7.jpg',
          link: 'http://ladygaga.com',
          linkText: false,
          time: timestamp()
        }
      ]
    },
    {
      id: 'starboy',
      photo:
        'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/users/4.jpg',
      banner: feedPost.i4,
      mark_state: true,
      name: 'The Weeknd',
      time: timestamp(),
      items: [
        {
          id: 'starboy-1',
          type: 'photo',
          length: 5,
          src: 'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/8.jpg',
          preview:
            'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/8.jpg',
          link: '',
          linkText: false,
          time: timestamp()
        }
      ]
    },
    {
      id: 'riversquomo1',
      photo:
        'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/users/5.jpg',
      banner: feedPost.i5,
      mark_state: false,
      name: 'Rivers Cuomo',
      time: timestamp(),
      items: [
        {
          id: 'riverscuomo-1',
          type: 'photo',
          length: 10,
          src: 'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/9.jpg',
          preview:
            'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/9.jpg',
          link: '',
          linkText: false,
          time: timestamp()
        }
      ]
    },
    {
      id: 'riversquomo2',
      photo:
        'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/users/5.jpg',
      banner: feedPost.i6,
      mark_state: false,
      name: 'Rivers Cuomo',
      time: timestamp(),
      items: '',
    },
    {
      id: 'riversquomo3',
      photo:
        'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/users/5.jpg',
      banner: feedPost.i7,
      mark_state: false,
      name: 'Rivers Cuomo',
      time: timestamp(),
      items: '',
    },
    {
      id: 'riversquomo4',
      photo:
        'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/users/5.jpg',
      banner: feedPost.i8,
      mark_state: false,
      name: 'Rivers Cuomo',
      time: timestamp(),
      items: '',
    },
    {
      id: 'riversquomo5',
      photo:
        'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/users/5.jpg',
      banner: feedPost.i9,
      mark_state: false,
      name: 'Rivers Cuomo',
      time: timestamp(),
      items: '',
    },
]

export default FeedPost