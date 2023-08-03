import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

import '../../assets/style/access.scss'
import * as loginImg from '../../assets/img/ImgLib.js';
import * as appUtils from "../../helper/validation";
import axios from "axios";
import * as c from "./../../api/constant";
import OTPInput from "otp-input-react";
import { MdLockReset } from 'react-icons/md'


const initialvalue = {
    emailId: "",
    password: "",
    newPassword: "",
    confirmPassword: ""
  };

const ForgotPassword = () => {

    let navigate = useNavigate();
    let params = useParams();  
    const [isField, setisField] = React.useState(0);
    const [formData, setformData] = React.useState(initialvalue);
    const [errMessage, seterrMessage] = React.useState("");
    const [OTP, setOTP] = React.useState("");


    const checkEmailId = async (isField) =>{
        if(isField === 0 && formData.emailId == ''){
          seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> Email id is a require field</span></>);
        }else if(isField === 0 && appUtils.validateEmail(formData.emailId) !== 1){
          seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> Invalid Email Id</span></>);
        }else{
           const url = c.USER + "/forgot-password";
           const data = {
            email: formData.emailId
           }
           const response = await axios.patch(url, data);
           
           if(response.data.success === 1){
            seterrMessage("");
            setisField(1);
            seterrMessage(<><span className='text-success mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> {response.data.message}</span></>);

           }else{
            seterrMessage(<><span className='text-success mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> {response.data.message}</span></>);
           }          
        }    
      }    
    
      const handalerChanges = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });    
      }   

      const submitData = async () => {

        if(!OTP){
            seterrMessage(<><span className='text-success mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> OTP is a required field</span></>)
            return false;
        }

        const url = c.USER + "/email-verified";
        const data = {
            email: formData.emailId,
            otp: OTP
        }
        const response = await axios.patch(url, data);

        if(response.data.success === 1){
            seterrMessage("");
            setisField(2);
            seterrMessage(<><span className='text-success mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> {response.data.message}</span></>);            
        }else{
            seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> {response.data.message}</span></>);
        }
    
      }

      const changePassword = async () => {

        if(!formData.newPassword){
            seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> New password is a require field</span></>);
            return false;
        }else if(!formData.confirmPassword){
            seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> Confirm password is a require field</span></>);
            return false;
        }else if(formData.confirmPassword != formData.newPassword){
            seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> Confirm password does not match with new password</span></>);
            return false;
        }else{
            const url = c.USER + "/reset-password";
            const data = {
                password: formData.newPassword,
                otp: OTP,
                email: formData.emailId
            }
        
            const response = await axios.patch(url, data);
            if(response.data.success === 1){
                seterrMessage(<><span className='text-success mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> {response.data.message}</span></>);
                navigate("/parent/login");    
            }else{
                seterrMessage(<><span className='text-success mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> {response.data.message}</span></>);
            }
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
                <div className="col-12 col-lg-7 panLeft" style={{'--bg-url': 'url('+loginImg.loginChildBg+')'}}></div>
                <div className="col-12 col-lg-5 panRight">
                    <div className="panWrapper text-light form-theme">
                    {
                          isField === 0?(
                            <>
                        <span className="display-6 h5 mb-4 d-block">Forgotten Password</span>
                        <span className="d-block mb-2">If you already have an account register You can Login here !</span>
                        <span className="d-block">You can <Link className='link-theme link-danger link-underline-opacity-0' to="/kids/login">Login!</Link></span>

                       
                              <div className="form-floating my-5">
                                <input type="email" className="form-control" id="emailId" name="emailId" placeholder="Enter your registered email id" onChange={handalerChanges}/>
                                <label htmlFor="emailId">Registered Email ID</label>
                              </div>
                            </>
                          ):
                          isField === 1?(
                            <>
                            <h4 className="display-6 my-5">
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
                            <div className="text-end mt-n4 mb-4"><Link className="link-light link-underline-opacity-0" to="" onClick={() => checkEmailId(isField)}><MdLockReset size="24" /> Resend OTP</Link></div>
                          </>
                        ):<>
                                <span className="display-6 h5 mb-4 d-block">Reset Password</span>
                                <span className="d-block mb-2">Reset your password and secure your account !</span>

                             <div className="form-floating my-5">
                                <input type="password" className="form-control" id="newPassword" name="newPassword" placeholder="New Password" onChange={handalerChanges}/>
                                <label htmlFor="newPassword">New Password</label>
                              </div>
                              <div className="form-floating my-5">
                                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" onChange={handalerChanges}/>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                              </div>
                        </>
                        }

                        {errMessage}

                        {
                           isField === 0?(
                            <button className="btn btn-theme btn-danger w-100" onClick={() => checkEmailId(isField)}>Continue</button>
                           ):isField === 1?<button className="btn btn-theme btn-danger w-100" onClick={() => submitData()}>OTP Verification</button>:<button className="btn btn-theme btn-danger w-100" onClick={() => changePassword()}>Change your Password</button>
                        }

                        <div className="mt-5">
                            <p className="text-divider text-center">or continue with</p>
                            <ul className="list-inline loginAlise">
                                <li className="list-inline-item"><Link to="#"><img src={loginImg.facebook.default} alt="" /></Link></li>
                                <li className="list-inline-item"><Link to="#"><img src={loginImg.apple.default} alt="" /></Link></li>
                                <li className="list-inline-item"><Link to="#"><img src={loginImg.google.default} alt="" /></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
       </div>
      </body-main>
    </page-wrapper>
    </>
  )
}

export default ForgotPassword