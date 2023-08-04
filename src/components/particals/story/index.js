import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Story from './Story'
import { usersImg } from '../../../assets/img/ImgLib'

import { FaPlus } from 'react-icons/fa'

import { Box, List, Card, IconButton, ImageListItemBar, Modal, Typography, Button, Grid, ThemeProvider, createTheme } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import { IoMdClose } from 'react-icons/io';
import axios from "axios";
import * as c from "../../../api/constant";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
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
    // border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    // pb: 0,
    [theme.breakpoints.up('md')]: {
      width: '28vw',
    },
    [theme.breakpoints.down('md')]: {
        width: 280,
    },
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    },
  });
  
  
  

const Index = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let [allStory, setAllStory] = useState([]);


    const getStory = async () => {
      const header = localStorage.getItem("__tokenCode");  
      const userCode = localStorage.getItem("__userId");    
      const url = c.STORY+'/user/'+userCode;
      const res = await axios.get(url, {
        headers: JSON.parse(header),
      });

      if(res.data.success === 1){
        setAllStory(res.data.data);
      }
        
    }

    // const imageHandelar = async (e) => {
    //   const file = e.target.files[0]; 
    //   if(file){
    //     const fileReader = new FileReader();
    //     fileReader.addEventListener("load", () => {
    //       imageData.push(fileReader.result)
    //       setImagedata(imageData)
    //       setImagearray(fileReader.result);
    //     });
    //     fileReader.readAsDataURL(file);   
    //   } 
    // };

    useEffect(() => { 
      getStory(); 
    },[]);

    
  return (
    <>
    <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
            backdrop: {
                TransitionComponent: Fade,
            },
        }}
    >
        <Fade in={open}>
          <Box sx={style}>
          <Grid container spacing={2} sx={{ width: 'calc(100% + 32px)' }}>
                <Grid item xs={12} sx={{ borderBottom: '1px solid #3c3c3c' }}>
                  <ThemeProvider theme={darkTheme}>
                    <Button sx={{ position: 'absolute', right: '.5em', top: '10px' }} onClick={handleClose}><IoMdClose size="20" /> {window.innerWidth < 900 ? '':(<>&nbsp; Close</>)}</Button>
                    <Typography id="spring-modal-title" className='mb-2' variant="h6" component="h2">
                        Make your Story
                    </Typography>
                  </ThemeProvider>
                </Grid>
            </Grid>
            <form className="row g-3 story_add">
                <div className="col-md-12 mt-20 image_upld">

                 <div className='img_upp'>
                  <img className='img-fluid post_img' src="https://t4.ftcdn.net/jpg/03/49/67/51/360_F_349675175_15Vt8KbDteudLLSAItlOEsuE818e0Fcr.jpg" alt="" />
                    <Link className='upload_link'><img className='img-fluid iconup' src={require('../../../assets/img/upload_icon.png')} alt="" /></Link>
                  
                  </div>
                  
                </div>
                <div className="col-md-12">
                  <textarea className="" placeholder='Write Your Story'></textarea>
                </div>
                <div className="col-md-12 text-center">
                  <Button className="mt-4" variant="contained">Submit</Button>
                </div>
            </form>
          </Box>
        </Fade>
    </Modal>
    
    <div className="d-flex">
        <div className="card border border-2 border-dashed h-150px px-4 px-sm-5 shadow-none d-flex align-items-center justify-content-center text-center" onClick={handleOpen}>
            <div>
                <a className="stretched-link btn btn-light rounded-circle icon-md" href="#">
                    <FaPlus />
                </a>
                <h6 className="mt-2 mb-0 small">Add Story</h6>
            </div>
        </div>
        <List
            className=""
            sx={{
                width: '100%',
                // maxWidth: 360,
                bgcolor: 'transparent',
                border: 'none',
                borderColor: 'primary.main',
                borderRadius: 1,
                display: 'flex'
            }}
            >
              
            {allStory.map((story, index) => {
              return <Story 
              userName="Samera"
              storyImg={ usersImg.u1 }
              userStatus="active"
          />
            })}
            

        </List>
    </div>
    </>
  )
}

export default Index