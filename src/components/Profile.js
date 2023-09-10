import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import Friends from './particals/Friends'
import Group from './particals/Group'
import * as imgProfile from '../assets/img/ImgLib.js';
import './profile.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FaPen, FaTimes } from 'react-icons/fa'
import { PiPaperPlaneRightFill, PiXBold } from 'react-icons/pi'
import { AiOutlineLogout } from 'react-icons/ai'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { Avatar, Badge, Button, ButtonGroup, IconButton} from '@mui/material';
// import Badge, { badgeClasses } from '@mui/base/Badge';
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import AccountType from './AccountType.js';


import Album from './particals/albam'
import { IoMdImages } from 'react-icons/io';

import axios from "axios";
import * as c from "./../api/constant";
import { toast } from "react-toastify";
import moment from 'moment'


// function srcset(image, size, rows = 1, cols = 1) {
//   return {
//     src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
//     srcSet: `${image}?w=${size * cols}&h=${
//       size * rows
//     }&fit=crop&auto=format&dpr=2 2x`,
//   };
// }

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



const styleAvatar = (profAvatar) => ({
  height: '21.75rem', 
  borderRadius: 5,
  [profAvatar.breakpoints.up('md')]: {
    // width: 600,
    width: '21.75rem', 
  },
  [profAvatar.breakpoints.up('sm')]: {
    // width: 600,
    width: '18.5rem', 
  },
  [profAvatar.breakpoints.down('sm')]: {
    // width: 600,
    width: '100%', 
  },
})


const initialPostvalue = {
  details: "",
  image: ""
};



export default function Profile() {

  const [userDetails, setUserdetails] = React.useState([]);
  const [userImage, setUserimage] = useState(imgProfile.imgProfileU);
  const [imageData, setImagedata] = useState([]);
  const [formData, setformData] = React.useState(initialPostvalue);
  const [imageArray, setImagearray] = useState([]);  // for edit image data

  let [ focusedInputAbout, setFocusedInputAbout ] = useState(false);

  const imageUploading = async (e) => {
      const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.addEventListener("load", async () => {
          setUserimage(fileReader.result)
          const header = localStorage.getItem("__tokenCode");     
          const url = c.USER;
          const data = {image: fileReader.result, userCode: localStorage.getItem("__userId")}
          const res = await axios.patch(url, data, {
            headers: JSON.parse(header),
          });
          if(res.data.success === 1){
            toast("Image updated successfully!!", {
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
          } 
        });
      fileReader.readAsDataURL(file);   

  } 

  const handalerChanges = async (e) => {     
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  }

  const getUser = async () =>{
    const header = localStorage.getItem("__tokenCode");       
        const url = c.USER + "/" + localStorage.getItem("__userId");
        const res = await axios.get(url, {
            headers: JSON.parse(header),
        });
        if(res.data.success === 1){
          setUserdetails(res.data.data);
          setUserimage(c.IMG+"/"+res.data.data.image)
        }  
  }

  const removeuploadImage = async (key) => {
    imageData.splice(key, 1);
    if(imageData.length === 0){
      setImagedata([])
      setImagearray([]);
    }else{
      setImagedata(imageData)
      setImagearray(imageData);
    }  
  }

  const imageHandelar = async (e) => {
    const file = e.target.files[0]; 
    if(file){
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        imageData.push(fileReader.result)
        setImagedata(imageData)
        setImagearray(fileReader.result);
      });
      fileReader.readAsDataURL(file);   
    } 
  };

  const submitPost =  async () => {
    const errormsg = formData.details?"":"Post text is a reuire field";
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
      const header = localStorage.getItem("__tokenCode"); 
      formData.userCode = localStorage.getItem("__userId");
      formData.image = imageData;
      formData.onlyMe = "1";
      formData.date = moment().format(); 
      const url = c.POST;
      var res = await axios.post(url, formData, {
        headers: JSON.parse(header),
      });

      if(res.data.success === 1){   
        formData.details = '';     
        setImagedata([]);
        setImagearray([]);
        toast("Post added successfully!!", {
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
        setFocusedInputAbout(false)
      }else{
        console.log(res);
        return false;
      }

    }

  }

  
  useEffect(() => {
    getUser();
    const skipPost = (event) => {
      if (event.key === 'Escape') {
          setFocusedInputAbout(false);
          document.getElementById('postField').value = '';
          document.getElementById('postField').blur();
      }
    };
    document.body.classList.toggle('readyPost', focusedInputAbout);
    document.addEventListener('keydown', skipPost);
    return () => {
        document.body.classList.remove('readyPost');
        document.removeEventListener('keydown', skipPost);
    };
  }, [focusedInputAbout]);


  return (    
    JSON.parse(localStorage.getItem("isLoginCheck"))?
    <>
      <section className="banner" style={{'--imgBan': 'url("' + imgProfile.banProfile + '")'}}>
        <h1 className="display-6 opacity-0">Mandy Richardson - Profile iCHAT</h1>
      </section>
      <section className="sec-main">
        <div className="container">
          <div className="row">
            <div className='dtl-profile mb-md-4'>
              <div className="imgUser-wrapper">
                <Badge
                    className="userAvator"
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <>
                      {/* <IconButton sx={{ background: '#f3f3f3' }}><FaPen /></IconButton> */}
                      <input
                        type="file"
                        id="imageUpload"
                        accept=".png, .jpg, .jpeg"
                        onChange={imageUploading}
                        hidden
                      />
                      <label className="imageUpload" htmlFor="imageUpload">
                        <FaPen />
                      </label>
                      </>
                    }
                  >
                      <Avatar src={ userImage } alt={`Mandy Richardson`} sx={ styleAvatar } 
                      />
                </Badge>
              </div>
              <div className="user-holder">
                <h1 className="userName">{userDetails.firstName+' '+userDetails.lastName}</h1>
                <div className="chat">
                  <p className="m-0 me-2"><small>Leave a message</small></p>
                  <Link className='btn btn-theme btn-outline-light me-4 py-2' to="/parent/feed">Feed</Link>
                  <Link className='btn btn-theme btn-outline-light me-4 py-2'>Chat</Link>
                  <Link className='btn btn-theme btn-outline-light py-2' to="/account-type"> Logout <AiOutlineLogout className="me-n1"/></Link>
                </div>
              </div>
            </div>
          
          </div>
          { focusedInputAbout? (
            <div className="active-overlay"></div>
          ):"" }
          <div className="row">
            <div className="col-md-7">
              <h5 className='titleAbout'>About Me</h5>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum dolorem mollitia itaque aspernatur tempore maiores, amet reiciendis iure consectetur facilis, explicabo delectus vero deleniti. Accusantium possimus quia quis illo repudiandae!
              Eligendi tenetur suscipit perspiciatis doloremque omnis, nobis cumque eum, dolores optio officiis consectetur beatae, adipisci praesentium ut sapiente exercitationem aut quisquam necessitatibus? Vel expedita doloribus magni iste facere! Inventore, dicta.</p>

              <div className="share-something">
                <div className="editor-top">
                { focusedInputAbout ?
                      <div className="position-absolute" style={{right: '5px', top: '5px'}}>
                          <Button style={{minWidth: 'auto'}} onClick={() => { setFocusedInputAbout(false) }} sx={{
                            borderRadius: '50px',
                              color: 'var(--bs-gray-400)',
                          }}><PiXBold /></Button>
                      </div>
                  :
                  '' }
                  <img className="userIcon img-fluid" src={ imgProfile.imgProfileU } alt="" />
                  <textarea className='form-control' name="details" id="details" value={formData.details} onChange={handalerChanges} placeholder='Say something.....' onFocus={() => { setFocusedInputAbout(true) }}></textarea>
                </div>
                { focusedInputAbout ? (
                <div className="profile-post-list" >
                  <ul className="list-inline mb-0 mt-2">
                          {
                            imageData.map((uploadimage, key) =>{
                              return (
                                <li className="list-inline-item" key={key}>
                                <IconButton size="small" onClick={()=>removeuploadImage(key)}><FaTimes/></IconButton>
                                <Avatar src={ uploadimage } sx={{ width: '4em', height: '5em', borderRadius: '5px', }} />
                                </li> 
                              );
                            })
                          }                          
                  </ul>
                </div>
                )
                  :""}
                <div className="share-footer">
                  <ul className="list-inline mb-2">
                    <li className="list-inline-item">
                      <small>Share to</small>
                    </li>
                    <li className="list-inline-item">
                      <Link className='link-theme link-light link-underline-opacity-0'><FontAwesomeIcon icon={faTwitter} /></Link>
                    </li>
                    <li className="list-inline-item">
                      <Link className='link-theme link-light link-underline-opacity-0'><FontAwesomeIcon icon={faInstagram} /></Link>
                    </li>
                  </ul>
                  { focusedInputAbout ? (
                    <ButtonGroup spacing="0.5rem" aria-label="spacing button group">
                      <IconButton sx={{ color: 'white' }} variant="contained" component="label"><IoMdImages /><input type="file" multiple name="image" id="" hidden onChange={imageHandelar} /></IconButton>
                      <IconButton sx={{ color: 'white' }} onClick={submitPost}><PiPaperPlaneRightFill /></IconButton>
                    </ButtonGroup>
                  )
                  :""}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <hr className='my-5' />

        <div className="container">
          <div className="row">
            <div className="col-12">      

              <Tabs
                  defaultActiveKey="photos"
                  id="profile-tabs"
                  className="profTabs mb-3"
                  variant="pills"
                  fill
                >
                  <Tab eventKey="photos" title={
                    <>
                      Photos &nbsp;
                      {/* <Badge>302</Badge> */}
                    </>
                    }>
                      <Album />                      
                  </Tab>                  
                  <Tab eventKey="friends" title={
                    <>
                      Friends &nbsp;
                      {/* <Badge>67</Badge> */}
                    </>
                    }>
                      <Friends />
                  </Tab>
                  <Tab eventKey="group" title={
                    <>
                      Group &nbsp;
                      {/* <Badge>4</Badge> */}
                    </>
                    }>
                      <Group />
                  </Tab>
              </Tabs>

            </div>
          </div>
        </div>
      </section>
    </>:<AccountType/>
  )
}