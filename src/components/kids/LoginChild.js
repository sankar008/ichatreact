import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

import '../../assets/style/access.scss'
import * as loginImg from '../../assets/img/ImgLib.js';
import * as appUtils from "../../helper/validation";
import axios from "axios";
import * as c from "./../../api/constant";


const initialvalue = {
    emailId: "",
    password: ""
  };

const LoginChild = () => {

    let navigate = useNavigate();
    let params = useParams();  
    const [isField, setisField] = React.useState(0);
    const [formData, setformData] = React.useState(initialvalue);
    const [errMessage, seterrMessage] = React.useState("");

    const storeLoginData = (isField) =>{
        if(isField === 0 && formData.emailId == ''){
          seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> Email id is a require field</span></>);
        }else if(isField === 0 && appUtils.validateEmail(formData.emailId) !== 1){
          seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> Invalid Email Id</span></>);
        }else if(isField === 1 && formData.password === ''){
            seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> Password is a require field</span></>);
        }else{
          seterrMessage("");
          let stage = ++isField;
          setisField(stage);
        }    
      }    
    
      const handalerChanges = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });    
      }

      const submitData = async () => {
        const url = c.USER + "/login";
        const data = {
            email: formData.emailId,
            password: formData.password,
            role: "kid"
        }
        const response = await axios.post(url, data);
        if(response.data.success === 1){
            localStorage.setItem("isLoginCheck", true);
            localStorage.setItem("__fulName", response.data.data.full_name);
            localStorage.setItem("__userId", response.data.data.userCode);
            const headerObj = {
              Authorization: `Bearer ${response.data.token_code}`,
            };
            localStorage.setItem("__tokenCode", JSON.stringify(headerObj));
            navigate("/profile");    
        }else{
            let stage = 0;
            setisField(stage);
            seterrMessage(<><span className='text-danger mb-3 d-block'><FontAwesomeIcon icon={faTriangleExclamation} /> {response.data.message}</span></>);
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
                        <span className="display-6 h5 mb-4 d-block">Sign in</span>
                        <span className="d-block mb-2">Don’t have an account?</span>
                        <span className="d-block">You can <Link className='link-theme link-danger link-underline-opacity-0' to="/kids/signup">Register here!</Link></span>

                        {
                          isField === 0?(
                            <>
                              <div className="form-floating my-5">
                                <input type="email" className="form-control" id="emailId" name="emailId" value={formData.emailId?formData.emailId:''} placeholder="Enter your registered email id" onChange={handalerChanges}/>
                                <label htmlFor="emailId">Email ID</label>
                              </div>
                            </>
                          ):``
                        }

                        {
                          isField === 1?(
                            <>
                                <div className="form-floating my-5">
                                    <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" onChange={handalerChanges}/>
                                    <label htmlFor="password">Password</label>
                                </div>
                              <div className="text-end mt-n4 mb-4"><Link className="link-light link-underline-opacity-0" to="/kids/forgot-password">Forgot password</Link></div>
                             </>
                        ):``
                        }

                        {errMessage}
                        {
                           isField === 0?(
                            <button className="btn btn-theme btn-danger w-100" onClick={() => storeLoginData(isField)}>Continue</button>
                           ):<button className="btn btn-theme btn-danger w-100" onClick={() => submitData()}>Login</button>
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

export default LoginChild