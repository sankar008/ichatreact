import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import './albam.scss'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
// import {  } from '@fortawesome/free-solid-svg-icons'
import { faLayerGroup, faPen } from '@fortawesome/free-solid-svg-icons';
import { FaEye, FaPlus, FaTimes } from 'react-icons/fa'


import { Box, Button, Card, FormControlLabel, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Modal, Switch, ThemeProvider, Typography, createTheme } from '@mui/material'
import TextField from '@mui/material/TextField';
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import { IoMdClose } from 'react-icons/io';
import axios from "axios";
import * as c from "../../../api/constant";
import { toast } from "react-toastify";
import moment from 'moment'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }



  
const Fade = React.forwardRef(function Fade(props, ref) {
    const {
      children,
      in: open,
      onClick,
      onEnter,
      onExited,
      ownerState,
      ...other
    } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter(null, true);
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited(null, true);
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {React.cloneElement(children, { onClick })}
      </animated.div>
    );
  });
  
  Fade.propTypes = {
    children: PropTypes.element.isRequired,
    in: PropTypes.bool,
    onClick: PropTypes.any,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
    ownerState: PropTypes.any,
  };
  
  const style = (theme) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    // bgcolor: 'background.paper',
    bgcolor: '#212121',
    color: '#aaaaaa',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    pb: 0,
    [theme.breakpoints.up('md')]: {
      width: '50vw',
    },
    [theme.breakpoints.down('md')]: {
        width: 500,
    },
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    },
  });

  const initialvalue = {
    title: "",
    details: "",
    image: "",
    onlyMe: "",
    postCode: ""
  };

const Index = () => {
    const [open, setOpen] = React.useState(false);
    const [onlyMe, setOnlyMe] = React.useState('0');
    const [album, setAlbum] = React.useState([]);
    const albumClose = () => setOpen(false);

    const [openLbmLightbox, setOpenLbmLightbox] = React.useState(false)

    const [formData, setformData] = React.useState(initialvalue);
    const [imageData, setImagedata] = useState([]);
    const [imageArray, setImagearray] = useState([]);  // for edit image data

    const handleOpen = async () =>{
      setOpen(true);
      setImagedata([]);
      setImagearray([]);
    }

    const handalerChanges = async (e) => {     
      const { name, value } = e.target;
      setformData({ ...formData, [name]: value });
    }

    const removeuploadImage = async (key) => {
      imageData.splice(key, 1);
      if(formData.postCode){
        await removeImage(formData.postCode, imageArray[key])
      }


      if(imageData.length === 0){
        setImagedata([])
        setImagearray([]);
      }else{
        setImagedata(imageData)
        setImagearray(imageData);
      }  
    }


    const handalerOnlyMe = async () => {
      const status = onlyMe === '0'?'1':'0'
      setOnlyMe(status);
    }

    const imageHandelar = async (e) => {
      const file = e.target.files[0];     
      if(file){
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          imageData.push(fileReader.result)
          if(formData.postCode){
            addImage(formData.postCode, fileReader.result)
          }
          setImagedata(imageData)
          setImagearray(fileReader.result);
        });
        fileReader.readAsDataURL(file);   
      }
        
    };

    const updateDataHandel = async () => {
      const errormsg = formData.title?formData.details?"":"Album details is a required field":"Album title is a required field";
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
        formData.onlyMe = onlyMe;
        const header = localStorage.getItem("__tokenCode");       
        const url = c.POST;
        var res = await axios.patch(url, formData, {
          headers: JSON.parse(header),
        });    
     
        if(res.data.success === 1){
          toast("Album updated successfully!!", {
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
          setOpen(false);
          getAlbum();
        }else{
          console.log(res);
          return false;
        }
      }
    }

    const submitDataHandel =  async () => {
      const errormsg = formData.title?formData.details?"":"Album details is a required field":"Album title is a required field";

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
        formData.userCode = localStorage.getItem("__userId");
        formData.image = imageData;
        formData.onlyMe = onlyMe;
        formData.isAlbum = "1";
        formData.date = moment().format(); 
        const header = localStorage.getItem("__tokenCode");       
        const url = c.POST;
        var res = await axios.post(url, formData, {
          headers: JSON.parse(header),
        });
     
        if(res.data.success === 1){
          toast("Album added successfully!!", {
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
          setOpen(false);
          getAlbum();
        }else{
          console.log(res);
          return false;
        }
      }

    }

    const getAlbum = async () => {
      const header = localStorage.getItem("__tokenCode"); 
      const userCode = localStorage.getItem("__userId");      
      const url = c.POST+'/album/'+userCode;       
      var res = await axios.get(url, formData, {
        headers: JSON.parse(header),
      });
      
      if(res.data.success === 1){
        setAlbum(res.data.data)
      }
    }

    const deleteAlbum = async (postCode) => {
      const header = localStorage.getItem("__tokenCode");      
      const url = c.POST+'/'+postCode;       
      var res = await axios.delete(url,{
        headers: JSON.parse(header),
      });   
     
      if(res.data.success === 1){
        toast("Album deleted successfully!!", {
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
        getAlbum();
      }
    }

    const editAlbumhandeler = async (postCode) => {
      const header = localStorage.getItem("__tokenCode");  
      const url = c.POST+'/'+postCode;
      const res = await axios.get(url, {
          headers: JSON.parse(header),
      });
      
      if(res.data.success === 1){
        handleOpen();
        formData.title = res.data.data.title;
        formData.postCode = res.data.data.postCode;
        formData.details = res.data.data.details;    
        setOnlyMe(res.data.data.onlyMe);
        var imageDataArray = [];
        var editImage = [];
        res.data.data.image.map( async (img, key)=>{
          imageDataArray.push(c.IMG+img);
          editImage.push(img);
        })
        setImagedata(imageDataArray)
        setImagearray(editImage);   // For Edit
      }    
    }  

    const addImage = async (postCode, image) => {      
      const header = localStorage.getItem("__tokenCode"); 
      const url = c.POST+'/add-image'; 
      var res = await axios.patch(url, {postCode: postCode, image: [image]},{
        headers: JSON.parse(header),
      }); 

      if(res.data.success === 1){
        toast(res.data.msg, {
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
    }else{     
      toast("Image format does not match", {
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
    }
     
    }

    const removeImage = async (postCode, image) =>{
      const header = localStorage.getItem("__tokenCode");      
      const url = c.POST+'/remove-image';       
      var res = await axios.patch(url, {postCode: postCode, image: image},{
        headers: JSON.parse(header),
      }); 
      if(res.data.success === 1){
        toast(res.data.msg, {
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
    }else{
      toast("Image does not match", {
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
    }
    } 

    useEffect(() => { 
      getAlbum();
    });

  return (
    <>    
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={albumClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box className="mdlSD" sx={style}>
            <Grid container spacing={2} sx={{ width: 'calc(100% + 32px)' }}>
                <Grid item xs={12} sx={{ borderBottom: '1px solid #f3f3f3' }}>
                  <ThemeProvider theme={darkTheme}>
                    <Button sx={{ position: 'absolute', right: '.5em', top: '10px' }} onClick={albumClose}><IoMdClose size="20" /> {window.innerWidth < 900 ? '':(<>&nbsp; Close</>)}</Button>
                    <Typography id="spring-modal-title" className='mb-2' variant="h6" component="h2">
                        Create Your Album
                    </Typography>
                  </ThemeProvider>
                </Grid>
                <Grid item lg={4} md={4} xs={12} sx={{ pr: '16px', py: 2, background: '#161616', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <ThemeProvider theme={darkTheme}>
                      <TextField
                          id="fieldID-placed-here"
                          label="Album Name"
                          name="title"
                          placeholder="Album name"
                          defaultValue=""
                          size="small"
                          variant="outlined"
                          value={formData.title}
                          onChange={handalerChanges}
                      />
                      
                      <TextField
                          id="standard-helperText"
                          label="Description"
                          placeholder='Describe your album ...'
                          defaultValue=""
                          name="details"
                          size="small"
                          variant="outlined"
                          value={formData.details}
                          onChange={handalerChanges}
                      />

                      <TextField
                          id="fieldID-placed-here"
                          label=""
                          placeholder=""
                          type="file"
                          name="image"
                          size="small"
                          variant="outlined"
                          onChange={imageHandelar}
                          multiple
                      />
                      <FormControlLabel name="onlyMe" label="Public" labelPlacement="start" control={<Switch  checked={onlyMe === '1'?true:false} onClick={handalerOnlyMe} />} sx={{ display: 'flex', justifyContent: 'space-between' }} />   

                      <Button className='mt-auto' variant="contained" type="submit" onClick={formData.postCode?updateDataHandel:submitDataHandel}>Submit</Button>
                    </ThemeProvider>
                </Grid>
                <Grid item lg={8} md={8} xs={12}>
                    <ImageList className='album-images' sx={{ /* width: 500, */ minHeight: 250, paddingRight: '16px' }} cols={3} data-id={imageArray.length} >
                        {imageData.map((item, key) => (
                            <ImageListItem key={key} sx={{ position: 'relative' }}>
                                <img
                                    className=""
                                    src={item}
                                    loading="lazy"
                                    alt={item}
                                    style={{ 'aspectRatio': '1/1' }}
                                />
                                <div className="actionBtns">
                                    <ul className="list-inline">
                                        <li className="list-inline-item">
                                            <IconButton
                                                className="text-end"
                                                sx={{ color: 'white' }}
                                            >
                                                <FaEye size="20" />
                                            </IconButton>
                                        </li>
                                        <li className="list-inline-item">
                                            <IconButton
                                                className="text-end"
                                                sx={{ color: 'white' }}
                                                onClick={()=>removeuploadImage(key)}
                                            >
                                                <FaTimes size="20" />
                                            </IconButton>
                                        </li>
                                    </ul>
                                </div>
                            </ImageListItem>
                        ))} 
                    </ImageList>
                </Grid>
            </Grid>      
          </Box>
        </Fade>
      </Modal>

      <Lightbox
          open={openLbmLightbox}
          close={() => setOpenLbmLightbox(false)}
          slides={imageData.map((item, key) => ( { src: item } ))}
      />

    <ImageList
    className='change_display_photo'
        sx={{}}
        variant="quilted"
        cols={6}
        >
        <ImageListItem cols={1} rows={1} sx={{ display: 'flex' }}>
            <Link style={{ flex: '1 1 auto' }} onClick={handleOpen}>
                <Card className="d-flex align-items-center justify-content-center text-light" sx={{ height: '100%', background: 'linear-gradient(45deg, #181818, #090909)', border: '1px solid #262626' }}>
                    <FaPlus size="60"/>
                </Card>
            </Link>
        </ImageListItem>
        
        {album.map((item, key) => (
            <ImageListItem key={key} cols={key || 1} rows={key || 1}>
            <img {...srcset(c.IMG+'/'+item.image[0], 121, 1, 1)}
                alt={item.title}
                loading="lazy"
            />
            
            <ImageListItemBar
            className='top_actionbtn'
                sx={{
                    background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    flexDirection: 'row-reverse',
                }}
                position="top"
                actionIcon={
                    <>
                    <IconButton
                        className="text-end"
                        sx={{ color: 'white' }}
                        aria-label={`star ${item.title}`}
                        onClick={() => deleteAlbum(item.postCode)}
                    >
                    <FontAwesomeIcon icon={faTrashAlt} height="20px" width="20px" />
                    </IconButton>
                    <IconButton
                        sx={{ color: 'white' }}
                        aria-label={`star ${item.title}`} 
                        onClick={() => setOpenLbmLightbox(true)}
                    >
                    <FontAwesomeIcon icon={faLayerGroup} height="20px" width="20px" />
                    </IconButton>                    
                    <IconButton
                        sx={{ color: 'white' }}
                        aria-label={`star ${item.title}`}
                        onClick={() => editAlbumhandeler(item.postCode)}
                    >
                    <FontAwesomeIcon icon={faPen}  height="20px" width="20px" />
                    </IconButton>                  
                    </>
                }
                actionPosition="left"
                />
                <Typography sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                padding: '.1em .5em',
                background: '#000000a5',
                borderRadius: '5px',
                textAlign: 'center' ,
                }}>{item.title}</Typography>
            </ImageListItem>
        ))}
    </ImageList>
    </>
  )
}
export default Index