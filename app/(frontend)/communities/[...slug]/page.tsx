"use client";
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import Link from "next/link";
import parse from 'html-react-parser'
import GoogleMapReact from 'google-map-react';
import { useMemo } from "react";
function SingleCommunity({ params }) {
    const slug = params.slug[0];
    const defaultProps = {
        center: {
            lat: 25.2048,
            lng: 55.2708
        },
        zoom: 15
    };
    const [community, setCommunity] = useState();
    const [addressLatitude, setAddressLatitude] = useState();
    const [addressLongitude, setAddressLongitude] = useState();
    const swiperRef = useRef<SwiperType>;
    const PropertySwiperRef = useRef<SwiperType>;
    const renderMarkers = (map, maps) => {
        console.log(addressLatitude)
        let marker = new maps.Marker({
            position: { lat: addressLatitude, lng: addressLongitude },
            map,
        });
        return marker;
    };

    useEffect(() => {
        fetch('https://rangenew.websitedemo.world/api/communities/' + slug, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            setCommunity(data.data)
            console.log(data.data['address_latitude'])
            setAddressLatitude(data.data['address_latitude'])
            setAddressLongitude(data.data['address_longitude'])
        });
    }, []);

    return (
        <>
            <section className="my-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-12 col-md-12">
                            <div className="row g-3 justify-content-center">
                                <div className="col-12 col-lg-12 col-md-12">
                                    <div>
                                        <div className="mainHead mb-3 text-primary text-center">
                                            <h4>{community && community.name}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-12 col-md-12">
                                    {
                                        community &&
                                        <Swiper
                                            slidesPerView={1}
                                            spaceBetween={10}
                                            pagination={{
                                                el: ".swiper-pagination",
                                                clickable: true
                                            }}
                                            navigation={{
                                                nextEl: ".swiper-button-next",
                                                prevEl: ".swiper-button-prev"
                                            }}
                                            breakpoints={{
                                                640: {
                                                    slidesPerView: 1,
                                                    spaceBetween: 10,
                                                },
                                                768: {
                                                    slidesPerView: 1,
                                                    spaceBetween: 10,
                                                },
                                                1024: {
                                                    slidesPerView: 1,
                                                    spaceBetween: 10,
                                                },
                                            }}

                                            modules={[Navigation, Pagination]}
                                            onBeforeInit={(swiper) => {
                                                swiperRef.current = swiper;
                                            }}
                                            className="swiper communityMainSwiper"
                                        >
                                            {
                                                community.imageGallery.map((img) => {
                                                    return <SwiperSlide key={img.id}>
                                                        <div className="swiper-slide">
                                                            <div className="communityImgCont">
                                                                <img src={img.path}
                                                                    alt="community1" className="img-fluid communityGalleryImage" />
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>

                                                })
                                            }
                                            <div className="swiper-button-next text-white" onClick={() => swiperRef.current?.slideNext()}>
                                                <span className=''>
                                                    <i className='bi bi-chevron-right fs-1'></i>
                                                </span>
                                            </div>
                                            <div className="swiper-button-prev text-white" onClick={() => swiperRef.current?.slidePrev()}>
                                                <span className=''>
                                                    <i className='bi bi-chevron-left fs-1'></i>
                                                </span>
                                            </div>
                                            <div className="swiper-pagination"></div>
                                        </Swiper>
                                    }

                                </div>
                                <div className="col-12 col-lg-10 col-md-11">
                                    <div className="text-center my-5">
                                        {community && parse(community.longDescription)}
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4 col-md-3 ">
                                    <a href="#highlight" className="text-decoration-none">
                                        <div className="communityTab">
                                            <h3>Highlights</h3>
                                        </div>

                                    </a>
                                </div>
                                <div className="col-12 col-lg-4 col-md-3 ">
                                    <a href="#amenities" className="text-decoration-none">
                                        <div className="communityTab">
                                            <h3>Amenities</h3>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-12 col-lg-4 col-md-3 ">
                                    <a href="#properties" className="text-decoration-none">
                                        <div className="communityTab">
                                            <h3>Available Properties</h3>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="my-5" id="highlight">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-12 col-md-12">
                            <div className="row ">
                                <div className="col-12 col-lg-12 col-md-12">
                                    <div>
                                        <div className="mainHead mb-5 text-center text-primary">
                                            <h4>HIGHLIGHTS</h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-12 col-md-12">
                                    <div className="swiper pb-5 highlightSwiper px-5">
                                        <div className="swiper-wrapper pb-3">


                                        </div>
                                        <div className="swiper-button-next text-primary">
                                            <span className=''>
                                                <i className='bi bi-chevron-right fs-1'></i>
                                            </span>
                                        </div>
                                        <div className="swiper-button-prev text-primary">
                                            <span className=''>
                                                <i className='bi bi-chevron-left fs-1'></i>
                                            </span>
                                        </div>
                                        <div className="swiper-pagination"></div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="my-5 bg-light py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-md-12">
                            <div className="row g-0">
                                <div className="col-12 col-lg-6 col-md-6">
                                    {community && parse(community.location_iframe)}
                                    {/* <GoogleMapReact
                                    bootstrapURLKeys={{key: 'AIzaSyAGZjmTZFO0V8_-_V_A-Dqto1I-FlBhshE'}}
                                    defaultCenter={defaultProps.center}
                                    defaultZoom={defaultProps.zoom}
                                    onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
                                    yesIWantToUseGoogleMapApiInternals
                                /> */}


                                </div>
                                <div className="col-12 col-lg-6 col-md-6 bg-white">
                                    {community &&
                                        <div className="p-3 p-md-5 p-lg-5">
                                            {
                                                community.statValues.map((stat) => {
                                                    return <div className="border-bottom border-1 border-dark py-2">
                                                        <p className="text-black fw-500 mb-0 fs-20">{stat.key}</p>
                                                        <p className="text-primary fw-500 mb-0 fs-20">{stat.value}</p>
                                                    </div>
                                                })
                                            }

                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="my-5" id="amenities">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-12 col-md-12">
                            <div className="row ">
                                <div className="col-12 col-lg-12 col-md-12">
                                    <div>
                                        <div className="mainHead mb-5 text-center text-primary">
                                            <h4>AMENITIES</h4>
                                        </div>
                                    </div>
                                </div>
                                {community &&
                                    <div className="col-12 col-lg-12 col-md-12">
                                        <Swiper
                                            slidesPerView={1}
                                            spaceBetween={50}
                                            pagination={{
                                                el: ".swiper-pagination",
                                                clickable: true
                                            }}
                                            navigation={{
                                                nextEl: ".swiper-button-next",
                                                prevEl: ".swiper-button-prev"
                                            }}
                                            breakpoints={{
                                                640: {
                                                    slidesPerView: 2,
                                                    spaceBetween: 50,
                                                },
                                                768: {
                                                    slidesPerView: 4,
                                                    spaceBetween: 50,
                                                },
                                                1024: {
                                                    slidesPerView: 6,
                                                    spaceBetween: 50,
                                                },
                                            }}

                                            modules={[Navigation, Pagination]}
                                            onBeforeInit={(swiper) => {
                                                swiperRef.current = swiper;
                                            }}
                                            className="swiper pb-5 amenitiesSwiper px-5"
                                        >
                                            {
                                                community['amenities'].map((amenity) => {
                                                    return <SwiperSlide key={amenity.id}>
                                                        <div className="swiper-slide">
                                                            <div className="py-3">
                                                                <div className="mb-2">
                                                                    <div className="amenityImg mx-auto">
                                                                        <img src={amenity.image}
                                                                            alt="Range" className="img-fluid" width="40px" />
                                                                    </div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <small className="fs-20">{amenity.name}</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>

                                                })
                                            }
                                            <div className="swiper-button-next text-primary" onClick={() => swiperRef.current?.slideNext()}>
                                                <span className=''>
                                                    <i className='bi bi-chevron-right fs-1'></i>
                                                </span>
                                            </div>
                                            <div className="swiper-button-prev text-primary" onClick={() => swiperRef.current?.slidePrev()}>
                                                <span className=''>
                                                    <i className='bi bi-chevron-left fs-1'></i>
                                                </span>
                                            </div>
                                            <div className="swiper-pagination"></div>
                                        </Swiper>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="my-5" id="properties">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-12 col-md-12">
                            <div className="row">
                                <div className="col-12 col-lg-12 col-md-12">
                                    <div>
                                        <div className="mainHead mb-5 text-center text-primary">
                                            <h4>AVAILABLE PROPERTIES</h4>
                                        </div>
                                    </div>
                                </div>


                                {community &&
                                    <div className="col-12 col-lg-12 col-md-12">
                                        <Swiper
                                            slidesPerView={1}
                                            spaceBetween={10}
                                            pagination={{
                                                el: ".swiper-pagination",
                                                clickable: true
                                            }}
                                            navigation={{
                                                nextEl: ".swiper-button-next",
                                                prevEl: ".swiper-button-prev",
                                            }}
                                            breakpoints={{
                                                640: {
                                                    slidesPerView: 2,
                                                    spaceBetween: 10,
                                                },
                                                768: {
                                                    slidesPerView: 3,
                                                    spaceBetween: 10,
                                                },
                                                1024: {
                                                    slidesPerView: 4,
                                                    spaceBetween: 10,
                                                },
                                            }}

                                            modules={[Navigation, Pagination]}
                                            onBeforeInit={(swiper) => {
                                                PropertySwiperRef.current = swiper;
                                            }}
                                            className="swiper pb-5 projectSlider">
                                            {
                                                community['properties'].map((property) => {
                                                    return <SwiperSlide key={property.id}>
                                                        <div className="swiper-slide">
                                                            <div>
                                                                <div className="card propCard rounded-0">
                                                                    <div>
                                                                        <div className="">
                                                                            <a href="" className="text-decoration-none">
                                                                                <div className="projectImgCont">
                                                                                    <img src={property.property_banner}
                                                                                        alt="project1" className="img-fluid propImg" />
                                                                                    <div className="projectImgOverlay">
                                                                                        <div></div>
                                                                                        <div><span
                                                                                            className="badge float-start fs-10 projectType">VILLAS</span>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <div className="card-body rounded-3 rounded-top-0">
                                                                            <a href="#" className="text-decoration-none">
                                                                                <h6 className="text-black fs-16 fw-semibold mb-0">
                                                                                    {property.name}
                                                                                </h6>
                                                                            </a>
                                                                            <div className="mb-1">
                                                                                <small className="text-secondary">{property && property.communities && property.communities.name}</small>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>

                                                })
                                            }

                                            <div className="swiper-button-prev swiperUniquePrev text-primary" onClick={() => PropertySwiperRef.current?.slidePrev()}>
                                                <span className=''>
                                                    <i className='bi bi-chevron-left fs-1'></i>
                                                </span>
                                            </div>
                                            <div className="swiper-button-next swiperUniqueNext text-primary" onClick={() => PropertySwiperRef.current?.slideNext()}>
                                                <span className=''>
                                                    <i className='bi bi-chevron-right fs-1'></i>
                                                </span>
                                            </div>
                                            <div className="swiper-pagination"></div>
                                        </Swiper>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="my-5 ">
                <div className="container">
                    <div className="row g-3 justify-content-center">
                        <div className="col-12 col-lg-12 col-md-12">
                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-12 col-md-12">
                                    <div>
                                        <div className="mainHead mb-5 text-primary">
                                            <h4>PROPERTY INSIGHTS</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-12 col-md-12">
                                    <div className="border-bottom border-dark pb-3">
                                        <table className="table table-striped text-center table-lg tableinsights table-borderless">
                                            <thead>
                                                <tr>
                                                    <th scope="col">APARTMENT TYPE</th>
                                                    <th scope="col">AVG SELLING PRICE</th>
                                                    <th scope="col">AVG SELLING PRICE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>STUDIO
                                                    </td>
                                                    <td>AED 1.8 MILLION</td>
                                                    <td>AED 90,000</td>
                                                </tr>
                                                <tr>
                                                    <td>1 BEDROOM</td>
                                                    <td>AED 1.8 MILLION</td>
                                                    <td>AED 90,000</td>
                                                </tr>
                                                <tr>
                                                    <td>2 BEDROOM</td>
                                                    <td>AED 1.8 MILLION</td>
                                                    <td>AED 90,000</td>
                                                </tr>
                                                <tr>
                                                    <td>3 BEDROOM</td>
                                                    <td>AED 1.8 MILLION</td>
                                                    <td>AED 90,000</td>
                                                </tr>
                                                <tr>
                                                    <td>4 BEDROOM</td>
                                                    <td>AED 1.8 MILLION</td>
                                                    <td>AED 90,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="py-3">
                                        <table className="table table-striped text-center table-lg tableinsights table-borderless">
                                            <thead>
                                                <tr>
                                                    <th scope="col">TOWNHOUSE/ VILLA TYPE</th>
                                                    <th scope="col">AVG SELLING PRICE</th>
                                                    <th scope="col">AVG SELLING PRICE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1 BEDROOM</td>
                                                    <td>AED 1.8 MILLION</td>
                                                    <td>AED 90,000</td>
                                                </tr>
                                                <tr>
                                                    <td>2 BEDROOM</td>
                                                    <td>AED 1.8 MILLION</td>
                                                    <td>AED 90,000</td>
                                                </tr>
                                                <tr>
                                                    <td>3 BEDROOM</td>
                                                    <td>AED 1.8 MILLION</td>
                                                    <td>AED 90,000</td>
                                                </tr>
                                                <tr>
                                                    <td>4 BEDROOM</td>
                                                    <td>AED 1.8 MILLION</td>
                                                    <td>AED 90,000</td>
                                                </tr>
                                                <tr>
                                                    <td>5 BEDROOM</td>
                                                    <td>AED 1.8 MILLION</td>
                                                    <td>AED 90,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-5 bg-light py-5">
                <div className="container">
                    <div className="row g-3 justify-content-center">
                        <div className="col-12 col-lg-12 col-md-12">
                            <div className="row">
                                <div className="col-12 col-lg-12 col-md-12">
                                    <div>
                                        <div className="mainHead mb-5 text-primary">
                                            <h4>NEIGHBOURHOOD</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-12 col-md-12">
                                    <div className="swiper pb-5 projectSlider">
                                        <div className="swiper-button-prev swiperUniquePrev text-primary">
                                            <span className=''>
                                                <i className='bi bi-chevron-left fs-1'></i>
                                            </span>
                                        </div>
                                        <div className="swiper-wrapper">


                                        </div>
                                        <div className="swiper-button-next swiperUniqueNext text-primary">
                                            <span className=''>
                                                <i className='bi bi-chevron-right fs-1'></i>
                                            </span>
                                        </div>
                                        <div className="swiper-pagination"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default SingleCommunity;