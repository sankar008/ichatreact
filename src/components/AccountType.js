import React from 'react'
import { Link } from "react-router-dom";

// import LoginCarousel from '../assets/img/ImgLib';
import LoginCarousel from '../assets/img/ImgLib.js';
import * as imgPath from '../assets/img/ImgLib.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Autoplay, Pagination, Navigation } from 'swiper';


import 'swiper/css';
import "swiper/css/effect-fade";
import 'swiper/css/pagination';
import 'swiper/css/navigation';

SwiperCore.use([EffectFade]);

const AccountType = () => {
    localStorage.removeItem("isLoginCheck");
    localStorage.removeItem("__fulName");
    localStorage.removeItem("__userId");    
  return (
    <>
    <page-wrapper>
      <header className="headerDefault">
          <div className="container">
              <div className="row g-1">
                  <div className="col-md-1">
                      <Link className="d-block" to="#">
                        <img className="img-fluid" src={ imgPath.logoLight } alt="" />
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
                  <div className="col-12 col-md-6 slidePan">
                    <div className="carouselWrapper">
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            centeredSlides={true}
                            //fadeEffect={fade}
                            effect={"fade"}
                            speed="1500"
                            autoplay={{
                                delay: 2500,
                                //disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            //navigation={true}
                            modules={[Autoplay, EffectFade, Navigation, Pagination]}
                            //onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            className='carousel-login'
                            >
                            <SwiperSlide>
                                <img className="img-fluid" src={LoginCarousel.carousel_1} alt="" />
                                <h3 className="title">Curated content for your kids</h3>
                                <p>Talk about one of the features of your application & how it will help your users</p>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className="img-fluid" src={LoginCarousel.carousel_2} alt="" />
                                <h3 className="title">Two-factor authentication</h3>
                                <p>Talk about one of the features of your application & how it will help your users</p>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className="img-fluid" src={LoginCarousel.carousel_3} alt="" />
                                <h3 className="title">Connect with your friends</h3>
                                <p>Talk about one of the features of your application & how it will help your users</p>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 panRight">
                    <div className="panWrapper text-light form-theme">
                        {/* <p className="text-end">Don’t have an account? <Link className='link-theme link-danger link-underline-opacity-0' to="/signup">Register</Link></p> */}
                        <span className="display-6 h5 mb-4 d-block">Login</span>
                        <span className="d-block mb-2">Tell us what type of account you’d like to log on.</span>

                        <ul className="list-unstyled acType">
                            <li className='type-item'>
                                <Link className='d-flex align-items-center link-light link-underline-opacity-0' to="/parent/login">
                                    <img className='img-fluid' src={ imgPath.logo } alt="" />
                                    <div className="cont">
                                        <h6 className="title">Parents</h6>
                                        <p className="m-0">Adults account to manage all your activity.</p>
                                    </div>
                                    <div className="icon-holder">
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </div>
                                </Link>
                            </li>
                            <li className='type-item'>
                                <Link className='d-flex align-items-center link-light link-underline-opacity-0' to="/kids/login">
                                    <img className='img-fluid' src={ imgPath.logoChild } alt="" />
                                    <div className="cont">
                                        <h6 className="title">Kids</h6>
                                        <p className="m-0">Account with curated content for your kids.</p>
                                    </div>
                                    <div className="icon-holder">
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                  </div>
              </div>
          </div>
      </body-main>
    </page-wrapper>
    </>
  )
}

export default AccountType;
