import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import Link from "next/link";
import PAGES from "@/src/constants/pages";
import "@/public/css/about-styles.css";
import Image from 'next/image'

const AboutPage = dynamic(() => import('@/app/(frontend)/components/AboutPage/AboutPage'));
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const HomeMeta = await fetch(
    `${process.env.API_HOST}meta/${PAGES.about_the_range}`,
    { cache: "no-store" }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log("err", err);
    });
  return {
    title: HomeMeta?.data?.title,
    description: HomeMeta?.data?.meta_description,
    keywords: HomeMeta?.data?.meta_keywords,
  };

};

export default function About() {
  return (
    <>
      <header className="aboutHeader">
        <img loading="lazy"
          src="/images/banner/new-about.webp"
          className="headerSimpleImg"
          id="headerSimpleImg"
          alt="header"
        />
      </header>
      <section className="aboutPgSection">
        <div className="container">
          <h4 className="sctionMdTitle text-primary ">ABOUT RANGE</h4>
          <p className="fs-14 text-secondary mb-4">
            Range International Property Investments is an esteemed award-winning real estate brokerage based in Dubai, UAE. With over two decades of unmatched experience, we have established ourselves as industry leaders, renowned for our exceptional services and deep knowledge of the real estate market locally and internationally. Our dynamic and innovative team of industry experts is dedicated to delivering exceptional results while building lasting relationships based on professionalism, integrity, and trust. <br /><br />
            Our forte goes beyond sales & leases of residential, commercial, and off-plan properties. Our expertise extends to Financial Consultancy, Wealth Management, Property Valuation, and Mortgage services. By closely monitoring market trends, we identify high-return investment opportunities, providing you with a seamless and customer-focused experience. Our commitment to research and guidance allows you to have access to extensive premium real estate opportunities in today’s dynamic market. Experience the difference with Range and unlock extraordinary possibilities in the ever-changing real estate landscape.
          </p>
          <div className="row">
            <div className="col-md-6">
              <div className="simpleCard">
                <img loading="lazy"
                  src="/images/icons/about-mission-icon.png"
                  className="cardIcon"
                  alt="mission"
                />
                <h3 className="cardTitle text-center">MISSION</h3>
                <p className="fs-12 text-secondary">
                  We aspire to shape tomorrow’s real estate through unparalleled
                  services, cutting-edge products, and seamless transactions.
                  Our commitment is to redefine customer satisfaction, offer
                  diverse investment opportunities, and set new industry
                  standards.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="simpleCard">
                <img loading="lazy"
                  src="/images/icons/about-vision-icon.png"
                  className="cardIcon"
                  alt="vission"
                />
                <h3 className="cardTitle text-center">VISION</h3>
                <p className="fs-12 text-secondary">
                  Empowering real estate aspirations, we strive to become a
                  premier brokerage in the UAE, with a vision to expand
                  globally. We focus on leveraging innovative real estate
                  technology to explore untapped potential, crafting bespoke
                  products to reshape the global real estate landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AboutPage />
    </>
  );
}
