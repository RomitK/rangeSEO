"use client";
import Link from "next/link";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import Image from 'next/image'

function LookingFor() {
  const swiperRef = useRef<SwiperType>();
  return (
    <>
      <section className="my-5">
        <div className="container">
          <div className="col-12 col-lg-12 col-md-12">
            <div>
              <div className="mainHead mb-5 text-primary text-center">
                <h4>I AM INTERESTED IN</h4>
              </div>
            </div>
          </div>
          <div className="d-flex circleCardsRow">
            {/* Circle box Start */}
            <div className="proCircleCard">
              <Link className="proCircleBox" href="/properties">
                <div className="circleContent">
                  <Image loading="lazy"
                    src="/images/icons/interest1.webp"
                    className="proCricleImg"
                    alt="range"
                    width={80}
                    height={30}
                  />
                  <p className="text">Buying/Renting</p>
                </div>
              </Link>

            </div>
            {/* Circle box End */}

            {/* Circle box Start */}
            <div className="proCircleCard">
              <Link className="proCircleBox" href="/sell">
                <div className="circleContent">
                  <Image loading="lazy"
                    src="/images/icons/sell.webp"
                    className="proCricleImg"
                    alt="range"
                    width={80}
                    height={30}
                  />
                  <p className="text">Selling</p>
                </div>
              </Link>
            </div>
            {/* Circle box End */}

            {/* Circle box Start */}
            <div className="proCircleCard">
              <Link className="proCircleBox" href="/services">
                <div className="circleContent">
                  <Image loading="lazy"
                    src="/images/icons/interest2.webp"
                    className="proCricleImg"
                    alt="range"
                    width={80}
                    height={30}
                  />
                  <p className="text">Property Management</p>
                </div>
              </Link>

            </div>
            {/* Circle box End */}

            {/* Circle box Start */}
            <div className="proCircleCard">
              <Link className="proCircleBox" href="/services">
                <div className="circleContent">
                  <Image loading="lazy"
                    src="/images/icons/interest3.webp"
                    className="proCricleImg"
                    alt="range"
                    width={80}
                    height={30}
                  />
                  <p className="text">Holiday Homes</p>
                </div>
              </Link>

            </div>
            {/* Circle box End */}

            {/* Circle box Start */}
            <div className="proCircleCard">
              <Link className="proCircleBox" href="/mortgage">
                <div className="circleContent">
                  <Image loading="lazy"
                    src="/images/icons/interest4.webp"
                    className="proCricleImg"
                    alt="range"
                    width={80}
                    height={30}
                  />
                  <p className="text"> Mortgage </p>
                </div>
              </Link>

            </div>
            {/* Circle box End */}
          </div>
          <div className="col-12 col-lg-12 col-md-12">
            <div className="borderBottom"></div>
          </div>
        </div>
      </section>
    </>
  );
}
export default LookingFor;
