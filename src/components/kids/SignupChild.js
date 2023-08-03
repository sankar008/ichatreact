import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"

import '../../assets/style/access.scss'
import * as loginImg from '../../assets/img/ImgLib.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { MdLockReset } from 'react-icons/md'

/* import { StyledEngineProvider } from '@mui/material/styles'; */
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField } from '@mui/material';
import OTPInput from "otp-input-react";
import * as appUtils from "../../helper/validation";
import axios from "axios";
import * as c from "./../../api/constant";

const initialvalue = {
  firstName: "",
  lastName: "",
  emailId: "",
};


const SignupChild = () => {
  let navigate = useNavigate();
  let params = useParams();  

  const [isField, setisField] = React.useState(0);
  const [dateValue, setDateValue] = React.useState(null)
  const [OTP, setOTP] = React.useState("");
  const [formData, setformData] = React.useState(initialvalue);

  const [errMessage, seterrMessage] = React.useState("");

  const storeRegistrationData = async (isField) =>{
    if(isField === 0 && formData.firstName == ''){
      seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> First name is a require field</span></>);
    }else if(isField === 1 && formData.lastName == ''){
      seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> Last name is a require field</span></>);
    }else if(isField === 2 && formData.emailId == ''){
      seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> Email id is a require field</span></>);
    }else if(isField === 2 && appUtils.validateEmail(formData.emailId) !== 1){
      seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> Invalid Email Id</span></>);
    }else if(isField === 2 && appUtils.validateEmail(formData.emailId) === 1){
        const url = c.CHECKEMAILID;
        const data={
          emailId: formData.emailId
        };
        const res = await axios.post(url, data);
        if(res.data.success === 0){
          seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> {res.data.message}</span></>);
        }else{
          seterrMessage("");
          let stage = ++isField;
          setisField(stage);
        }      
    }else if(isField === 3 && formData.password === ''){
      seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> Password is a required field.</span></>);
    }else if(isField === 5 && formData.parentEmailId === ''){
      seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> Parent's ID is a required field.</span></>);
    }else if(isField === 5 && formData.parentEmailId !== ''){
        const url = c.USER+'/parent/verification/'+formData.emailId;
        const res = await axios.get(url);
        console.log(res);
        return false;
        if(res.data.success === 0){
          seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> {res.data.message}</span></>);
        }else{
          seterrMessage("");
          let stage = ++isField;
          setisField(stage);
        }
      //  seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> Worng parent's id.</span></>);

    }else{
      seterrMessage("");
      let stage = ++isField;
      setisField(stage);
    }    
  }


  const handalerChanges = async (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  }

  const submitData = async () =>{    
    const url = c.SIGNUP;
    const data = {
      email: formData.emailId,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: 'male',
      role: "kid"
    }
    const response = await axios.post(url, data);

    if(response.data.success === 1){
      localStorage.setItem("isLoginCheck", true);
      localStorage.setItem("__fulName", response.data.data.username);
      localStorage.setItem("__userId", response.data.data.userCode);
      const headerObj = {
        Authorization: `Bearer ${response.data.token_code}`,
      };
      localStorage.setItem("__tokenCode", JSON.stringify(headerObj));
      seterrMessage(<><span className='text-success mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> OTP has been sent to your reistered Email ID</span></>);  
      setisField(6);
    }else{
        seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} />{response.data.message}</span></>);
    }   
  }

  const otpVerification = async () => {  
    const url = c.USER + "/email-verified";
    const data = {
      email: formData.emailId,
      otp: OTP
    };
    const response = await axios.patch(url, data);
    if(response.data.success === 1){
      navigate("/profile");    
    }else{
      seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} />{response.data.message}</span></>);
    }
  }

  return (
    <>
    <page-wrapper>
      <header className="headerDefault">
          <div className="container">
              <div className="row g-1">
                  <div className="col-md-1">
                      <Link className="d-block" to="/">
                        <img className="img-fluid" src={ loginImg.logoLight } alt="" />
                      </Link>
                  </div>
                  <div className="col-md-10 "></div>
                  <div className="col-md-1"></div>
              </div>
          </div>
      </header>
      <body-main>
       <div className="container-fluid">
            <div className="row h-100">
                <div className="col-12 col-lg-7 panLeft" style={{'--bg-url': 
                    isField === 0 ? ('url("'+ loginImg.signBg +'")') :
                    isField === 1 ? ('url("'+ loginImg.bgEmail +'")') :
                    isField === 2 ? ('url("'+ loginImg.bgBDay +'")') :
                    isField === 3 ? ('url("'+ loginImg.bgBDay +'")') :
                    isField === 4 ? ('url("'+ loginImg.bgBDay +'")') :
                    isField === 5 ? ('url("'+ loginImg.bgBDay +'")') :
                    isField === 6 ? ('url("'+ loginImg.signBg +'")') :
                    null 
                }}></div>
                <div className="col-12 col-lg-5 panRight">
                    <div className="panWrapper text-light form-theme">
                        <span className="display-6 h5 mb-4 d-block">Create a new account</span>
                        <span className="d-block mb-2">If you already have an account register</span>
                        <span className="d-block">You can <Link className='link-theme link-danger link-underline-opacity-0' to="/kids/login">Login here !</Link></span>
                        {
                          isField === 0?(
                            <>
                              <h4 className="display-6 my-5">Let’s start with your first name</h4>
                              <div className="form-floating my-5">
                                <input type="text" className="form-control" name="firstName" id="firstName" placeholder="Enter your First name"  onChange={handalerChanges}/>
                                <label htmlFor="firstName">First Name</label>
                              </div>
                            </>
                          ):``
                        }{
                          isField === 1?(
                          <>
                            <h4 className="display-6 my-5">Let’s start with your last name</h4>
                            <div className="form-floating my-5">
                              <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Last name"  onChange={handalerChanges}/>
                              <label htmlFor="lastName">Last Name</label>
                            </div>
                          </>
                        ):``
                      }{
                            isField === 2?(
                            <>
                              <h4 className="display-6 my-5">What’s your email address?</h4>
                              <div className="form-floating my-5">
                                <input type="text" className="form-control" id="emailId" name="emailId" placeholder="Email Id"  onChange={handalerChanges}/>
                                <label htmlFor="u-email">Enter your email address</label>
                              </div>
                            </>
                          ):``
                        }{
                          isField === 3?(
                          <>
                            <h4 className="display-6 my-5">What’s your password?</h4>
                            <div className="form-floating my-5">
                              <input type="password" className="form-control" id="password" name="password" placeholder="Password"  onChange={handalerChanges}/>
                              <label htmlFor="password">Enter your password</label>
                            </div>
                          </>
                        ):``
                      }{
                          isField === 4?(                
                              <>
                              <h4 className="display-6 my-5">When’s your birthday?</h4>
                              <LocalizationProvider className="" dateAdapter={AdapterDayjs}>
                                <MobileDatePicker 
                                  className="form-control my-5"
                                  label="Select Date of Birth"
                                  views={['day', 'month', 'year']}
                                  format="D MMMM YYYY"
                                  placeholder="Select your date of birth"
                                  inputProps={{
                                    placeholder: "Placeholder"
                                  }}
                                  value={dateValue}
                                  onChange={(newValue) => setDateValue(newValue)}
                                  renderInput={(params) => <TextField {...params} placeholder='Select your date of birth' />}
                                />
                              </LocalizationProvider>
                            </>
                          ):``
                        }{
                          isField === 5?(                
                            <>
                              <h4 className="display-6 my-5">Parent's ID</h4>
                              <div className="form-floating my-5">
                                <input type="text" className="form-control" id="parentEmailId" name="parentEmailId" placeholder="Parent's ID"  onChange={handalerChanges}/>
                                <label htmlFor="parentEmailId">Enter your Parent's ID</label>
                              </div>
                            </>
                          ):``
                        }{
                          isField === 6?(
                            <>
                            <h4 className="display-6 my-5">storeRegistrationData
                              Enter the OTP<br/>
                              <small className='fs-6'>A code has been sent to { formData.emailId }</small> 
                            </h4>
                            <div className="form-floating my-5">
                            <OTPInput
                                className="validateOpt"
                                value={OTP}
                                onChange={setOTP}
                                autoFocus
                                OTPLength={6}
                                otpType="number"
                                disabled={false}
                              />
                            </div>
                            <div className="text-end mt-n4 mb-4"><Link className="link-light link-underline-opacity-0" to=""><MdLockReset size="24" /> Resend OTP</Link></div>
                          </>
                          ):``
                        }
                        {errMessage}
                        {
                          isField === 6?(<button className="btn btn-theme btn-danger w-100" onClick={() => otpVerification()
                            }>Continue</button>):(<button className="btn btn-theme btn-danger w-100" onClick={() => 
                              isField < 5?storeRegistrationData(isField):submitData()}>Continue</button>)
                        }
                    </div>
                </div>
            </div>
       </div>
      </body-main>
    </page-wrapper>
    </>
  )
}

export default SignupChild