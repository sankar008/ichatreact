import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Sidebar from '../../particals/sudebar'
import Story from '../../particals/story';
import './feed.scss'
import * as imgFeed from '../../../assets/img/ImgLib'
import AccountType from "../../../components/AccountType";

import { Avatar, Button, Paper, List, ListItem, ListItemAvatar, ListItemText, Typography, CardMedia,Box } from '@mui/material'
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import axios from "axios";
import * as c from "../../../api/constant";

import { FaRegStar, FaStar } from 'react-icons/fa';
import { Masonry } from '@mui/lab';
import styled from '@emotion/styled';
import { Card } from 'react-bootstrap';


const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  color: '#000',
}));

const Feed = () => {
  
    let [ isFocusPost, setIsFocusPost ] = useState(false);
    let [ suggestFriends, setSuggestfriends ] = useState([]);
    let [allPost, setAllPost] = useState([]);
    let [allRequest, setAllRequest] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => { 
        getPost();  
        friendRequest();       
        getSuggestFriend();
        document.getElementsByTagName('html')[0].setAttribute('data-bs-theme', 'dark');
        autoResize();
    },[]);


    const getSuggestFriend = async () => {
        const header = localStorage.getItem("__tokenCode");       
        const url = c.FREINDS + "/suggest-friend/" + localStorage.getItem("__userId");
        const res = await axios.get(url, {
            headers: JSON.parse(header),
        });
        if(res.data.success === 1){
           setSuggestfriends(res.data.data);
        }        
    }

    const friendRequest = async () => {
        const header = localStorage.getItem("__tokenCode");       
        const url = c.FREINDS + "/get-request/" + localStorage.getItem("__userId");
        const res = await axios.get(url, {
            headers: JSON.parse(header),
        });
        if(res.data.success === 1){
            console.log(res.data.data);

            setAllRequest(res.data.data);
        } 
    }
    
    function autoResize() {
        document.querySelectorAll('[data-autoresize]').forEach(function (element) {
			var offset = element.offsetHeight - element.clientHeight;
			element.addEventListener('input', function (event) {
				event.target.style.height = 'auto';
				event.target.style.height = event.target.scrollHeight + offset + 'px';
			});
		});
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

   
    const acceptRequest = async (friendCode) => {      
        const header = localStorage.getItem("__tokenCode");       
        const url = c.FREINDS+'/accept';
        const data = {
            friendCode: friendCode
        };

        const res = await axios.post(url, data, {
            headers: JSON.parse(header),
        });

        if(res.data.success === 1){
            toast("Request accepted successfully!!", {
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
            friendRequest();
        }
    }

    const sendFriedRequest = async (recipient) => {         
        const header = localStorage.getItem("__tokenCode");       
        const url = c.FREINDS;
        const data = {
            recipient: recipient,
            requester: localStorage.getItem("__userId")
        };
        const res = await axios.post(url, data, {
            headers: JSON.parse(header),
        });

        if(res.data.success === 1){
            toast("Request sent successfully!!", {
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
            getSuggestFriend();
        }  
    }

    const getPost = async () => {    
      const header = localStorage.getItem("__tokenCode");  
      const userCode = localStorage.getItem("__userId");    
      const url = c.POST+'/all/'+userCode;
     
      const res = await axios.get(url, {
          headers: JSON.parse(header),
      });

      
      if(res.data.success === 1){
        setAllPost(res.data.data);
      }else if(res.data.success === 2){
        navigate("/account-type");
      }
    }

  
    
  return (
    JSON.parse(localStorage.getItem("isLoginCheck"))?
    <>
        <main className='py-5'>
            <div className="container-fluid">
                <div className="row g-4">
                    <div className="col-lg-2">
                        <div className="d-flex align-items-center justify-content-center">
                            <Link href="/"><img className='img-fluid' src={ imgFeed.logoLight } alt="" /></Link>
                        </div>
                        <Sidebar />
                    </div>
                    <div className="col-md-4 col-lg-8 vstack gap-4">
                        <div className="row">
                            <div className="col-lg-8">
                                <Story />
                            </div>
                            <div className="col-lg-4">
                                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 ss">
                            <Masonry className="feedHolder" columns={3} spacing={4}>
                            { allPost.map((stry, key) => (     
                                      
                                <Item key={key}>
                                    <Card className='text-bg-dark imgtxtboth'>
                                        <Link state={{postCode:stry.postCode}} to= {"/parent/feed-post"}>
                                            <Box sx={{ position: 'relative' }}>
                                                <CardMedia
                                                        component="img"
                                                        image={stry.image.length > 0 ?c.IMG+stry.image[0]:imgFeed.postSlider.img3}
                                                        alt={stry.image.length}
                                                />
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        bgcolor: 'rgba(0, 0, 0, 0.54)',
                                                        color: 'white',
                                                        padding: '10px',
                                                    }}
                                                    >
                                                    <Typography variant="h7">{stry.details.substring(0, 120)}</Typography>
                                                    </Box>
                                            </Box>                                        
                                        </Link>
                                        <List
                                            className="suggListUser"
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
                                                secondaryAction={
                                                <Button  variant="text" edge="end" sx={{textTransform: 'capitalize', color: '#fff', fontSize: '1.2em'}}>4.2k &nbsp;<FaStar size="22" /> </Button>
                                                }
                                                sx={{ px: 0 }}
                                            >
                                            <ListItemAvatar>
                                                <Avatar src="http://api.ichat.apibag.in/images/post/1690483384915.png" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography className="" color="var(--bs-light-text-emphasis)">
                                                                Sankar Bera
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
                            </Masonry>                           
                            </div>
                        </div>

                    </div>
                    
                    <div className="col-lg-2">
                      <div className="row g-4">

                                    <div className="col-12">
                                        {allRequest.length != 0?<div className="card bg-transparent border-0" style={{'--bs-card-bg': 'transparent !important'}}>
                                            <div className="card-header bg-transparent px-0 d-flex align-items-center justify-content-between">
                                                <h5 className="card-title fs-6 mb-0">Friend Request</h5>
                                                {/* <Link className="link-light fs-6 link-underline-opacity-0">See All</Link> */}
                                            </div>
                                            <div className="card-body p-0">

                                                <List
                                                    className="suggListUser"
                                                    sx={{
                                                        width: '100%',
                                                        bgcolor: 'transparent',
                                                        border: 'none',
                                                        borderColor: 'primary.main',
                                                        borderRadius: 1
                                                    }}
                                                    >
                                                    {
                                                        allRequest.map((requested, key)=>{
                                                            return (
                                                                <ListItem className="px-0"
                                                                secondaryAction={
                                                                    <Button onClick={() => acceptRequest(requested.friendCode)} variant="text" edge="end" sx={{textTransform: 'capitalize'}}>Accept</Button>
                                                                }
                                                                key={key}
                                                            >
                                                                <ListItemAvatar>
                                                                    <Avatar src={ imgFeed.userDefault } />
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary={
                                                                        <Typography className="" color="var(--bs-light-text-emphasis)">
                                                                            {requested.requester[0].firstName+' '+requested.requester[0].lastName}
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
                                                
                                                </List>
                                            </div>
                                        </div>:''}
                                        

                                        <div className="card bg-transparent border-0 mt-3 pt-3 {allRequest.length != 0?right_bar_top_brdr:'' } " style={{'--bs-card-bg': 'transparent !important'}}>

                                            <div className="card-header bg-transparent px-0 d-flex align-items-center justify-content-between">
                                                <h5 className="card-title fs-6 mb-0">Suggestions for you</h5>
                                                <Link className="link-light fs-6 link-underline-opacity-0">See All</Link>
                                            </div>


                                            <div className="card-body p-0">

                                                <List
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
                                                
                                                </List>
                                            </div>
                                        </div>
                                    </div>

                                    
                                    <div className="col-12">
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
                                    </p>

                                </div>
                    </div>


                </div>
            </div>


        </main>
    </>:<AccountType/>
  )
}
export default Feed