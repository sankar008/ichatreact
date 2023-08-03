import React, { useEffect, useState } from 'react'

import './friends.scss'
import * as friendImg from '../../../assets/img/ImgLib.js'

import { FaUserAltSlash } from 'react-icons/fa'
import { Avatar, Button, Card, CardActions, CardContent, IconButton, List, ListItem, Tooltip, Typography } from '@mui/material'
import axios from "axios";
import * as c from "../../../api/constant";

const Index = () => {
    const [friendList, setFriendlist] = useState([]);

    const getFriend = async () =>{
        const header = localStorage.getItem("__tokenCode");       
            const url = c.FREINDS + "/" + localStorage.getItem("__userId");
            const res = await axios.get(url, {
                headers: JSON.parse(header),
            });
            if(res.data.success == 1){
              setFriendlist(res.data.data);
            }  
      }

      useEffect(() => {
        getFriend();      
      }, []);


  return (
    <>
    <div className="row g-3">
        <div className="col-lg-3 col-md-6">
            {friendList.map((item, key)=>(
                <Card className='text-bg-dark' key={key}>
                  <CardContent>
                      <div className="wrapper">
                          <div className="text-end">
                            <Tooltip title="Remove from friend list"><IconButton className='btn btn-light' color="light" sx={{color: '#f3f3f35a', '&:hover': {color: '#ffffff'}, '&:focus, &:active': {color: '#ffffff', '--bs-btn-active-color': '#fff', '--bs-btn-active-bg': '#c6c7c830'}}}><FaUserAltSlash /></IconButton></Tooltip>
                          </div>
                          <div className="d-flex flex-column align-items-center">
                              <Avatar 
                                  className='user-avatar'
                                  alt='' 
                                  src={ item.image?c.IMG+'/'+item.image:friendImg.userOne } 
                                  sx={{ width: 65, height: 65, mb: 2 }} 
                              />
                              <div className="space"></div>
                              <span className="d-block text-light">{item.firstName+' '+item.lastName}</span>
                              <span className="d-block text-light" style={{'--bs-text-opacity': '.4'}}>{item.firstName+'_'+item.userCode}</span>
                          </div>
                      </div>
                  </CardContent>
                  <CardActions sx={{ flexDirection: "column" }}>
                      <List sx={{ display: 'flex', flex: '0 0 100%' }}>
                          <ListItem sx={{flexDirection: "column", flex: '1 1 auto'}}>
                              <Typography component="h6"><small>FRIENDS</small></Typography>
                              <Typography>{item.friends.length}</Typography>
                          </ListItem>
                          <ListItem sx={{flexDirection: "column", flex: '1 1 auto'}}>
                              <Typography component="h6"><small>POSTS</small></Typography>
                              <Typography>{item.postCount}</Typography>
                          </ListItem>
                          <ListItem sx={{flexDirection: "column", flex: '1 1 auto'}}>
                              <Typography component="h6"><small>LIKES</small></Typography>
                              <Typography>{item.likeCount}</Typography>
                          </ListItem>
                      </List>
                  </CardActions>
                </Card>
            ))}          
        </div>        
    </div>
    </>
  )
}

export default Index