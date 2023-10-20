"use client";
import React from 'react'
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/swiper-bundle.css';
const LifestyleSlide = () => {
    const swiperRef = useRef<SwiperType>();
    return (
        <div>
            <Swiper
                slidesPerView={1}
                spaceBetween={40}
                loop={true}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 40,
                    },
                    720: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    900: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                }}
                modules={[Navigation]}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                className="lifestyleSwiper"
            >
                <SwiperSlide>
                    <div className="lifestyleBox" >
                        <img src="images/community/community1.png" className="img-fluid lifeStyleIMg" alt="Golf Estate" />
                        <div className="card-body py-2">
                        <h5 className="card-title">Golf Estates</h5>
                            <p className="card-text">There’s nothing quite like living in a golfing community.
                                We have an exclusive selection of signature homes in some of Dubai’s most prestigious golfing communities.</p>
                            <a href="#" className="card-link"><span className='align-middle'>READ MORE</span> &nbsp; <img src="/assets/frontend/images/icons/arrow-right.webp" className="img-fluid align-middle" width={8} alt="Golf Estate" /></a>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="lifestyleBox" >
                        <img src="images/community/community1.png" className="img-fluid lifeStyleIMg" alt="Golf Estate" />
                        <div className="card-body py-2">
                            <h5 className="card-title">Beachfront Lifestyle</h5>
                            <p className="card-text">Wake up to the gentle sounds of the ocean waves lapping the shore.

                                Discover the joy of living in beachfront communities that make an exclusive statement about you.</p>
                            <a href="#" className="card-link"><span className='align-middle'>READ MORE</span> &nbsp; <img src="/assets/frontend/images/icons/arrow-right.webp" className="img-fluid align-middle" width={8} alt="Golf Estate" /></a>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="lifestyleBox" >
                        <img src="images/community/community1.png" className="img-fluid lifeStyleIMg" alt="Golf Estate" />
                        <div className="card-body py-2">
                            <h5 className="card-title">Golf Estates</h5>
                            <p className="card-text">There’s nothing quite like living in a golfing community.
                                We have an exclusive selection of signature homes in some of Dubai’s most prestigious golfing communities.</p>
                            <a href="#" className="card-link"><span className='align-middle'>READ MORE</span> &nbsp; <img src="/assets/frontend/images/icons/arrow-right.webp" className="img-fluid align-middle" width={8} alt="Golf Estate" /></a>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="lifestyleBox" >
                        <img src="images/community/community1.png" className="img-fluid lifeStyleIMg" alt="Golf Estate" />
                        <div className="card-body py-2">
                            <h5 className="card-title">Beachfront Lifestyle</h5>
                            <p className="card-text">Wake up to the gentle sounds of the ocean waves lapping the shore.

                                Discover the joy of living in beachfront communities that make an exclusive statement about you.</p>
                            <a href="#" className="card-link"><span className='align-middle'>READ MORE</span> &nbsp; <img src="/assets/frontend/images/icons/arrow-right.webp" className="img-fluid align-middle" width={8} alt="Golf Estate" /></a>
                        </div>
                    </div>
                </SwiperSlide>
                <div className="row pt-5">
                    <div className="col-12 col-lg-6 col-md-6 my-auto">
                        <div className="d-flex">
                            <div className='swiperPrev me-3' onClick={() => swiperRef.current?.slidePrev()}>
                                <img src="/assets/frontend/images/icons/prev.webp" alt="Elite Properties" className="img-fluid" width={45} />
                            </div>
                            <div className='swiperNext me-5' onClick={() => swiperRef.current?.slideNext()} >
                                <img src="/assets/frontend/images/icons/next.webp" alt="Elite Properties" className="img-fluid" width={45} />
                            </div>
                            <div className='my-auto'>
                                <div className="line" />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 col-md-6 my-auto">
                        <div className="lifestyleBox py-2 float-end">
                            <a href="#" className="card-link"><span className='align-middle'>DISCOVER MORE</span> &nbsp; <img src="/assets/frontend/images/icons/arrow-right.webp" className="img-fluid align-middle" width={8} alt="Golf Estate" /></a>
                        </div>
                    </div>
                </div>
            </Swiper>

        </div>
    )
}

export default LifestyleSlide