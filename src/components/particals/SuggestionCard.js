import React from 'react'
import { useState } from 'react';

import { suggestionUser } from '../../assets/img/ImgLib';
import './SuggestionCard.scss'
import { Avatar, Button } from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';

const SuggestionCard = () => {
    const [show, setShow] = useState(true);
    const [swiperRef, setSwiperRef] = useState(null);
    const removeSugg = (ev, index) => {
        // ev.swiper.removeSlide(ev)
        // let el = ev.swiper.clickedIndex(index)
        // console.log(el)
        swiperRef.removeAllSlides(); 

    }
  return (
    <>
    <Swiper
      className='sugg-slider'
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      centeredSlides={true}
      freeMode={true}
      slidesPerView={3}
      navigation={false}
      //   pagination={{ clickable: true }}
      //   scrollbar={{ draggable: true }}
      //   onSwiper={(swiper) => console.log(swiper)}
      onSwiper={setShow}
      onSlideChange={() => console.log('slide change')}
      style={{minHeight: '4rem '}}
    >
      <SwiperSlide className='sugg-card-item'>
        <div className="card">
            <div className="card-body">
                <div className="wrapper">
                    <Button className="btn-close" onClick={ removeSugg }></Button>
                    <Avatar 
                        className='user-avatar'
                        alt='' 
                        src={ suggestionUser.user1 } 
                        sx={{ width: 65, height: 65 }} 
                    />
                    <div className="space"></div>
                    <span className="d-block text-light">Kirti Chadha</span>
                    <span className="d-block">Follows you</span>
                    <Button className='btn-follow' variant="contained">Follow</Button>
                </div>
            </div>
        </div>
      </SwiperSlide>
      
      <SwiperSlide className='sugg-card-item'>
        <div className="card">
            <div className="card-body">
                <div className="wrapper">
                    <Button className="btn-close"></Button>
                    <Avatar 
                        className='user-avatar'
                        alt='' 
                        src={ suggestionUser.user2 } 
                        sx={{ width: 65, height: 65 }} 
                    />
                    <div className="space"></div>
                    <span className="d-block text-light">Kirti Chadha</span>
                    <span className="d-block">Follows you</span>
                    <Button className='btn-follow' variant="contained">Follow</Button>
                </div>
            </div>
        </div>
      </SwiperSlide>
      
      <SwiperSlide className='sugg-card-item'>
        <div className="card">
            <div className="card-body">
                <div className="wrapper">
                    <Button className="btn-close"></Button>
                    <Avatar 
                        className='user-avatar'
                        alt='' 
                        src={ suggestionUser.user1 } 
                        sx={{ width: 65, height: 65 }} 
                    />
                    <div className="space"></div>
                    <span className="d-block text-light">Kirti Chadha</span>
                    <span className="d-block">Follows you</span>
                    <Button className='btn-follow' variant="contained">Follow</Button>
                </div>
            </div>
        </div>
      </SwiperSlide>
      
      <SwiperSlide className='sugg-card-item'>
        <div className="card">
            <div className="card-body">
                <div className="wrapper">
                    <Button className="btn-close"></Button>
                    <Avatar 
                        className='user-avatar'
                        alt='' 
                        src={ suggestionUser.user1 } 
                        sx={{ width: 65, height: 65 }} 
                    />
                    <div className="space"></div>
                    <span className="d-block text-light">Kirti Chadha</span>
                    <span className="d-block">Follows you</span>
                    <Button className='btn-follow' variant="contained">Follow</Button>
                </div>
            </div>
        </div>
      </SwiperSlide>
      
      <SwiperSlide className='sugg-card-item'>
        <div className="card">
            <div className="card-body">
                <div className="wrapper">
                    <Button className="btn-close"></Button>
                    <Avatar 
                        className='user-avatar'
                        alt='' 
                        src={ suggestionUser.user1 } 
                        sx={{ width: 65, height: 65 }} 
                    />
                    <div className="space"></div>
                    <span className="d-block text-light">Kirti Chadha</span>
                    <span className="d-block">Follows you</span>
                    <Button className='btn-follow' variant="contained">Follow</Button>
                </div>
            </div>
        </div>
      </SwiperSlide>
      
    </Swiper>
    </>
  )
}

export default SuggestionCard