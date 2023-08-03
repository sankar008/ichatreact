import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';

import './group.scss'
import * as groupImg from '../../../assets/img/ImgLib.js'

import { FaHeartbeat, FaShare, FaUserAltSlash, FaEllipsisV } from 'react-icons/fa'
import { AvatarGroup, Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, List, ListItem, Typography, Menu, MenuItem, ImageListItem, Modal, Box, createTheme, ThemeProvider, TextField, FormControlLabel, FormControl, InputLabel, Select } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';

import styled from '@emotion/styled'

import { FaEye, FaPlus, FaTimes } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

import axios from "axios";
import * as c from "../../../api/constant";
import { toast } from "react-toastify";




  const style = (theme) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 700,
    // width: 600,
    bgcolor: '#212121',
    color: '#aaaaaa',
    border: '2px solid #000',
    boxShadow: 24,
    [theme.breakpoints.up('md')]: {
        width: 600,
    },
    [theme.breakpoints.down('md')]: {
        width: 500,
    },
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    },
  });
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

const Index = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const [popopen, setPopopen] = React.useState(false);
    const handleOpen = () => setPopopen(true);
    const [category, setCategory] = React.useState([]);
    const [groupImage, setGroupimage] = React.useState('');
    const open = Boolean(anchorEl);
    const handleClick = (event, index) => {
        setAnchorEl(event.currentTarget);
        // onClick={(event) => handleMenuItemClick(event, index)}
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const initialvalue = {
        groupName: "",
        groupDetails: "",
        catCode: '',
        image: '',
        groupCode: ''
    };
    
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModOpen = () => setModalOpen(true);
    const handleModClose = () => setModalOpen(false);
    const [formData, setformData] = React.useState(initialvalue);
    const [group, setGroup] = React.useState([]);

    const handleEditModel = async (groupCode) => {
        const header = localStorage.getItem("__tokenCode");       
        const url = c.GROUPS+'/edit/'+groupCode;    
        const res = await axios.get(url, {
            headers: JSON.parse(header),
        }); 
        if(res.data.success == 1){              
            formData.groupName = res.data.data.groupName;
            formData.groupDetails = res.data.data.groupDetails;
            formData.catCode = res.data.data.catCode;
            formData.groupCode = res.data.data.groupCode;
            setGroupimage(c.IMG+'/'+res.data.data.image);
            setModalOpen(true)  
        }
    }
  


    const getGroupcategory = async () => {
        const header = localStorage.getItem("__tokenCode");       
        const url = c.CATEGORY;
        const res = await axios.get(url, {
            headers: JSON.parse(header),
        }); 
        if(res.data.success == 1){
            setCategory(res.data.data)
        }
    }

    const imageHandel = async (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.addEventListener("load", async () => {
            setGroupimage(fileReader.result)
        });
        fileReader.readAsDataURL(file); 
    }

    const handalerChanges = async (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });    
    }

    const submitDataHandel = async (e) => {     
        const errormsg = groupImage?formData.groupName?formData.catCode?formData.groupDetails?'':"Group details is a required field":"Category is a required field":"Group name is a required field":"Group Image is a required field";
        
        if(errormsg){
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
        }else{
            formData.image = groupImage;
            formData.userId = localStorage.getItem("__userId");
            const header = localStorage.getItem("__tokenCode");       
            const url = c.GROUPS;
            
            if(formData.groupCode == ''){
                var res = await axios.post(url, formData, {
                    headers: JSON.parse(header),
                });               
            }else{           
                var res = await axios.patch(url, formData, {
                    headers: JSON.parse(header),
                });                
            }         


            if(res.data.success == 1){
                getGroup();
                toast(formData.groupCode?"Group update successfully!!":"Group added successfully!!", {
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
                handleModClose(true)        
            }
            
        }
    }

  

    const getGroup = async () => {
        const header = localStorage.getItem("__tokenCode");       
        const url = c.GROUPS;
        const res = await axios.get(url, {
            headers: JSON.parse(header),
        }); 
        if(res.data.success == 1){
            setGroup(res.data.data)
        }
    }


    useEffect(() => {
        getGroupcategory();
        getGroup();
      }, []);

    

    
  return (
    <>
    <Modal
        keepMounted
        open={modalOpen}
        onClose={handleModClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
            <ThemeProvider theme={darkTheme}>
                <Box sx={{ px: 4, py: 1, borderBottom: '1px solid #424242' }}>
                    <Button sx={{ position: 'absolute', right: '2em', top: '5px' }} onClick={handleModClose}><IoMdClose size="20" /> {window.innerWidth < 900 ? '':(<>&nbsp; Close</>)}</Button>
                    <Typography id="spring-modal-title" className='' variant="h6" component="h2">
                        Create Your Album
                    </Typography>
                </Box>

                <Box sx={{ px: 4, py: 2, display: 'flex', flexDirection: 'column' }}>
                    <div className="profile-pic-wrapper mb-3">
                        <div className="pic-holder">
                            <img id="profilePic" className="pic" src={ groupImage?groupImage:groupImg.banProfile } alt="" />
                            <form className='d-none' encType="multipart/form-data">
                                <input type="hidden" name="groupCode" value={formData.groupCode}/>
                                <input type="file" accept="image/*" id="newProfilePhoto" className="uploadProfileInput" onChange={imageHandel}/>
                            </form>
                            <label htmlFor="newProfilePhoto" className="upload-file-block">
                                <div className="text-center">
                                    <div className="mb-2"></div>
                                    <div className="text-uppercase">Upload <br /> Groups Photo</div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <TextField
                        id="fieldID-placed-here"
                        className="mb-3"
                        label="Group Name"
                        name="groupName"
                        placeholder="Group name"
                        defaultValue=""
                        size="small"
                        variant="outlined"
                        value={formData.groupName}
                        onChange={handalerChanges}
                    />

                    <FormControl className='mb-3' fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.catCode}
                            label="Select Category"
                            name="catCode"
                            onChange={handalerChanges}
                        >
                            {
                                category.map((item, key) => {
                                    return (
                                        <MenuItem key={key} value={item.catCode}>{item.catName}</MenuItem>
                                    )
                                })
                            }

                        </Select>
                    </FormControl>
                    
                    <TextField
                        id="standard-helperText"
                        className='mb-3'
                        label="Description"
                        placeholder='Describe your album ...'
                        defaultValue=""
                        name="groupDetails"
                        size="small"
                        variant="outlined"
                        multiline
                        maxRows={4}
                        value={formData.groupDetails}
                        onChange={handalerChanges}
                    />

                        <Button className='mt-auto' variant="contained" type="submit" onClick={submitDataHandel}>Submit</Button>
                </Box>
            </ThemeProvider>
        </Box>
    </Modal>
    <div className="row g-3">
        <div className="col-lg-3 col-md-6">
            <ImageListItem cols={1} rows={1} sx={{ display: 'flex'}} style={{ height: '100%', minHeight: '10rem'}} >
                <Link style={{ flex: '1 1 auto' }} onClick={handleModOpen}>
                    <Card className="d-flex align-items-center justify-content-center text-light" sx={{ height: '100%', background: 'linear-gradient(45deg, #181818, #090909)', border: '1px solid #262626' }}>
                        <FaPlus size="60"/>
                    </Card>
                </Link>
            </ImageListItem>
        </div>

        {group.map((grp, key)=>{
            return (
            <div className="col-lg-3 col-md-6" key={key}>
                <Card className='text-bg-dark'>
                    <CardMedia
                        component="img"
                        image={ c.IMG+'/'+grp.image }
                        alt="Paella dish"
                        sx={{ height: '10em' }}
                    />
                    <CardHeader                       
                        action={
                        <IconButton 
                            id="demo-positioned-button"
                            className="btn btn-light" 
                            aria-label="settings" 
                            sx={{ color: '#cecece8a' }} 
                            style={{'--bs-text-opacity': '.4'}}
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                        <FaEllipsisV />
                        </IconButton>
                        }
                        title={grp.groupName.substring(0,20)}
                        subheader={
                            <>
                            <Typography onClick={() => handleEditModel(grp.groupCode)} className="text-light" variant="body2" style={{'--bs-text-opacity': '.4'}}>
                                {moment(grp.createAt).format('MM-DD-YYYY')}
                            </Typography>
                            </>
                        }
                    />
                    <Menu
                       // id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={handleClose}>{grp.groupName}</MenuItem>
                        <MenuItem onClick={handleClose}>Exit Group</MenuItem>
                        <MenuItem onClick={handleClose}>Remove Group</MenuItem>
                    </Menu>
    
                    <CardContent>
                        <Typography variant="body2">
                        {grp.groupDetails.substring(0, 75)}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ padding: '16px' }}>
                        <Typography className="text-light" variant="body2" style={{'--bs-text-opacity': '.4'}}>5.7k members</Typography>
                        <AvatarGroup className="ms-auto" max={4} spacing="small">
                            <Avatar alt="Remy Sharp" src={ groupImg.userOne } />
                            <Avatar alt="Travis Howard" src={ groupImg.userOne } />
                            <Avatar alt="Cindy Baker" src={ groupImg.userOne } />
                            <Avatar alt="Agnes Walker" src={ groupImg.userOne } />
                            <Avatar alt="Trevor Henderson" src={ groupImg.userOne } />
                        </AvatarGroup>
                    </CardActions>
                </Card>  
            </div> 
            )
        })}       
    </div>
    </>
  )
}

export default Index