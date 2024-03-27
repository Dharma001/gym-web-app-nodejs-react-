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
        <div className='w-full h-[80vh] relative z-[-1]  '>    
        <img src='slider1.jpg' className='w-full h-full object-cover'/>
        <div className='absolute flex justify-center items-center top-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-10 text-black'>
        <div className='w-[70%]'>
        <div class="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-32 lg:px-8">
          <div class="relative z-10 text-center lg:text-left">
            <h1 class="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl lg:text-7xl">
              Welcome to
              <br class="xl:hidden" />
              <span class="text-red-400"> Premium Delights</span>
            </h1>
            <p class="mt-4 max-w-md text-lg text-gray-300 sm:text-xl md:mt-5 md:max-w-3xl">
              Elevate your culinary experience with our exclusive premium services. Indulge in exquisite flavors and extraordinary moments.
            </p>
            <div class="mt-12 sm:flex sm:justify-center lg:justify-start">
              <div class="rounded-md shadow">
                <button class="w-full flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md text-red-600 bg-white hover:text-red-500 hover:bg-red-100 transition duration-150 ease-in-out">
                  Get Started
                </button>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-4">
                <button class="w-full flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md text-white bg-red-500 hover:bg-red-400 transition duration-150 ease-in-out">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='w-full h-[80vh] relative z-[-1] '>    
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
