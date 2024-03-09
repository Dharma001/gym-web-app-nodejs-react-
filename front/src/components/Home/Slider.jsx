import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';

export default function Slider() {
  return (
    <>
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
        <div className='w-full h-[70vh] relative z-[-1] '>    
        <img src='slider1.jpg' className='w-full h-full'/>
        <div className='absolute flex justify-center items-center top-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-10 text-black'>
        <div className='w-[70%]'>
            <p className='text-[1rem] md:text-[2rem] lg:text-[3rem] 2xl:text-[7rem] font-bold text-white'>Fitness Factory the Best....</p>
            <p className='bg-red-500 px-4 py-3 font-medium text-xl rounded-sm w-[14%] text-center text-white hover:bg-red-600'>Contact Us</p>
        </div>
        </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='w-full h-[70vh] relative z-[-1] '>    
        <img src='slider2.jpg' className='w-full h-full'/>
        <div className='absolute flex justify-center items-center top-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-10 text-black'>
        <div className='w-[70%]'>
            <p className='text-[1rem] md:text-[2rem] lg:text-[3rem] 2xl:text-[7rem] font-bold text-white'>Fitness Factory the Best....</p>
            <p className='bg-red-500 px-4 py-3 font-medium text-xl rounded-sm w-[14%] text-center text-white hover:bg-red-600'>Contact Us</p>
        </div>
        </div>
        </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
