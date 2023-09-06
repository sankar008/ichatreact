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


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
import moment from 'moment';

const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  color: '#000',
}));

const initialvalue = {
  comment: "",
};

const FeedPost = () => {
  const location = useLocation()
  let [isFocusPost, setIsFocusPost] = useState(false);
  let [suggestFriends, setSuggestfriends] = useState([]);
  let [postCode, setPostCode] = useState(location.state.postCode);
  let [singlePost, setSinglePost] = useState([]);
  let [postComment, setPostComment] = useState([]);
  const [formData, setformData] = React.useState(initialvalue);

  const getSingelPost = async () => {
    const header = localStorage.getItem("__tokenCode");
    const userCode = localStorage.getItem("__userId");
    const url = c.POST + '/' + postCode;

    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });

    if (res.data.success == 1) {

      setSinglePost(res.data.data)
    }
  }

  const getPostComment = async () => {
    const header = localStorage.getItem("__tokenCode");
    const userCode = localStorage.getItem("__userId");
    const url = c.COMMENT + '/post/' + postCode;
    const res = await axios.get(url, {
      headers: JSON.parse(header),
    });

    if (res.data.success == 1) {
      setPostComment(res.data.data)
    }
  }

  const handalerChanges = async (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  }

  const createComment = async (commentValue) => {
    const header = localStorage.getItem("__tokenCode");
    const userCode = localStorage.getItem("__userId");
    const url = c.COMMENT;
    const res = await axios.post(url, { userCode: userCode, postCode: postCode, comment: commentValue }, {
      headers: JSON.parse(header),
    });


    if (res.data.sucess === 1) {
      formData.comment = '';
      setformData(formData);
      toast("Comment added successfully!!", {
        position: "top-right",
        autoClose: 5000,
        type: "success",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      getPostComment();
    } else {
      console.log(res);
      return false;
    }
  }



  useEffect(() => {
    getPostComment();
    getSingelPost();

    const keyDownHandler = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const errormsg = formData.comment ? "Please enter your comment" : "";
        if (errormsg) {
          toast(errormsg, {
            position: "top-right",
            autoClose: 5000,
            type: "error",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          createComment(event.target.value);
        }

      }
    }

    document.addEventListener('keydown', keyDownHandler);
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

  const diffYMDHMS = (date1, date2) => {
    var date1 = moment(date1);
    var date2 = moment(date2);
    let years = date1.diff(date2, 'year');
    date2.add(years, 'years');

    let months = date1.diff(date2, 'months');
    date2.add(months, 'months');

    let days = date1.diff(date2, 'days');
    date2.add(days, 'days');

    let hours = date1.diff(date2, 'hours');
    date2.add(hours, 'hours');

    let minutes = date1.diff(date2, 'minutes');
    date2.add(minutes, 'minutes');

    let seconds = date1.diff(date2, 'seconds');


    if (years) {
      return years + " years ago";
    } else if (months) {
      return months + " months ago";
    } else if (days) {
      return days + " days ago";
    } else if (hours) {
      return hours + " hours ago";
    } else if (minutes) {
      return minutes + " minutes ago";
    } else if (seconds) {
      return seconds + " seconds ago";
    }
  }


  // Banner Slider
  var single_slider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    speed: 500,
    slidesToScroll: 1,
  };


  return (
    JSON.parse(localStorage.getItem("isLoginCheck")) ?
      <>
        <main className='py-5'>
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-3">
                <div className="d-flex align-items-center justify-content-center">
                  <Link href="/"><img className='img-fluid' src={imgFeed.logoLight} alt="" /></Link>
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
                        <div className="card bg-transparent border-0" style={{ '--bs-card-bg': 'transparent !important' }}>


                          <div className="card-body p-0">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>





                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-md-7" >
                        <div className='feed_post'>
                          <div className='feedpost_img'>                           
                            <div className='singe_sliderottr'>
                              <Slider {...single_slider}>
                                <div className="img_slider">
                                  <CardMedia
                                    component="img"
                                    image={singlePost.image ? c.IMG + singlePost.image[0] : ''}
                                    alt=""
                                    sx={{ borderRadius: '40px 40px 0 40px' }}
                                  />
                                </div>

                                <div className="img_slider">
                                  <CardMedia
                                    component="img"
                                    image={singlePost.image ? c.IMG + singlePost.image[0] : ''}
                                    alt=""
                                    sx={{ borderRadius: '40px 40px 0 40px' }}
                                  />
                                </div>
                              </Slider>
                            </div>
                          </div>
                          <div className='feedpost_txt'>
                            <Typography variant="h7">{singlePost.details}</Typography>
                          </div>
                        </div>

                      </div>
                      <div className="col-md-5">
                        <Card className='text-bg-dark h-100 d-flex flex-column'>
                          <div className='commend_scroll'>
                            {
                              postComment.map((comments, index) => {
                                return (<List
                                  className="suggListUser"
                                  key={index}
                                  sx={{
                                    width: '100%',
                                    bgcolor: 'transparent',
                                    border: 'none',
                                    borderColor: 'primary.main',
                                    borderRadius: 1,
                                  }}
                                >


                                  <ListItem
                                    className=""
                                    sx={{}}
                                  >
                                    <ListItemAvatar>
                                      <Avatar src={c.IMG + comments.commentBy.image} />
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={
                                        <Typography className="" color="var(--bs-light-text-emphasis)">
                                          {comments.comment}
                                        </Typography>
                                      }
                                      secondary={
                                        <Typography component="span" variant="body2" color="var(--bs-gray-300)">
                                          {/* {diffYMDHMS(moment().format('YYYY MMM DD HH:MM:SS'), comments.date)} */}
                                          {comments.commentBy.firstName + ' ' + comments.commentBy.lastName}
                                        </Typography>
                                      }
                                    />
                                  </ListItem>
                                </List>)
                              })
                            }
                          </div>

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
                                // secondaryAction={
                                //   <Button  variant="text" edge="end" sx={{textTransform: 'capitalize', color: '#fff', fontSize: '1.2em'}}>4.2k &nbsp; <FaStar size="22" /></Button>
                                // }
                                sx={{}}
                              >
                                <Typography>{postComment.length > 0 ? postComment.length + ' comments' : ''} </Typography>
                              </ListItem>
                              <ListItem>
                                <FormControl fullWidth sx={{ mt: 1, border: 'none', background: '#f8f8f81a', borderRadius: '50px' }}>
                                  <OutlinedInput
                                    className=''
                                    id="comment"
                                    name="comment"
                                    onChange={handalerChanges}
                                    value={formData.comment}
                                    startAdornment={<Avatar sx={{ mr: 2, height: '1.5em', width: '1.5em' }} />}
                                    placeholder="Add a comment..."
                                    sx={{ color: '#f3f3f3' }}
                                  />
                                  <button className="send_commed" tabIndex="0" type="button"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M232,127.89a16,16,0,0,1-8.18,14L55.91,237.9A16.14,16.14,0,0,1,48,240a16,16,0,0,1-15.05-21.34L60.3,138.71A4,4,0,0,1,64.09,136H136a8,8,0,0,0,8-8.53,8.19,8.19,0,0,0-8.26-7.47H64.16a4,4,0,0,1-3.79-2.7l-27.44-80A16,16,0,0,1,55.85,18.07l168,95.89A16,16,0,0,1,232,127.89Z"></path></svg><span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button>
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
                      {stories.map((stry) => (
                        <Item key={stry.id} sx={{}}>
                          <Card className='text-bg-dark'>
                            <Link to="/parent/feed-post">
                              <CardMedia
                                component="img"
                                // image="https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/1.jpg"
                                image={stry.banner}
                                alt={stry.name}
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
                                  <Button variant="text" edge="end" sx={{ textTransform: 'capitalize', color: '#fff', fontSize: '1.2em' }}>4.2k &nbsp; {stry.mark_state ? <FaStar size="22" /> : <FaRegStar size="22" />}</Button>
                                }
                                sx={{ px: 0 }}
                              >
                                <ListItemAvatar>
                                  <Avatar src={stry.photo} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <Typography className="" color="var(--bs-light-text-emphasis)">
                                      {stry.name}
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
                      ))}

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
      </> : <AccountType />
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