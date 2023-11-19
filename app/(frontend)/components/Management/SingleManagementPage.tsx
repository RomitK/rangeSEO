import Link from "next/link";
import { useGetSingleManagementData } from "@/src/services/ManagementService";
import parse from "html-react-parser";
import AwardGallery from "../Award/page";

function SingleManagementPage({ params }) {
  const slug = params.slug[0];
  const { managementData } = useGetSingleManagementData(slug);
  return (
    <>
      <div className="container">
        <div className="PagiList mb-4">
          <span className="pagiText">
            <Link href={`/about`}>Meet the Leader</Link>
          </span>
        </div>
        <section className="section ">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h4 className="sctionMdTitle text-primary">
                {managementData?.name}
              </h4>
              <span className="ceoText">{managementData?.designation}</span>
              <p className="fs-12 text-secondary mb-4">
                {managementData &&
                  managementData.message &&
                  parse(managementData?.message ?? "")}
              </p>
              <div>
                Email :
                <a
                  href={"mailto:" + managementData?.email}
                  className="text-decoration-none"
                  target="_blanket"
                >
                  {" "}
                  {managementData?.email}{" "}
                </a>{" "}
                <br />
                Phone No:{" "}
                <a
                  href={"tel:" + managementData?.contact}
                  className="text-decoration-none"
                  target="_blanket"
                >
                  {" "}
                  {managementData?.contact}
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <img
                src={managementData?.image}
                className="leaderImg"
                alt={managementData?.name}
              />
            </div>
          </div>
        </section>
        {managementData && managementData.video && (
          <section className="section carouselSection">
            <div className="col-md-12 video-section-text text-center">
              <h2 className="video-text">
                We pride ourselves on our personal touch, providing you with an
                honest and engaging service that focuses on ensuring you find
                the perfect real estate to invest in or a place to call home.
              </h2>
            </div>
            <div className="video">
              <iframe
                src="https://player.vimeo.com/video/392311980?h=2f90973f9d"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* <video
            className="w-100"
            autoPlay
            loop
            muted
            preload="metadata"
            poster="/images/services/service-header.webp"
          >
            <source src={managementData?.video} type="video/mp4" />
            <source src={managementData?.video} type="video/mov" />
            Sorry, your browser doesn't support videos.
          </video> */}
          </section>
        )}

        <AwardGallery />
      </div>
    </>
  );
}
export default SingleManagementPage;
