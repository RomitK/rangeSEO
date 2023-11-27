import Link from "next/link";
function Project(props) {
  console.log(props)
  return (
    <>
      <div>
        {" "}
        <div className="card propertyCardNew rounded-0">
          <div className="">
          <Link
              href={`/projects/${props.slug}`}
              className="text-decoration-none"
            >
              <div className="projectImgCont">
                <img
                  src={props.mainImage}
                  alt="project1"
                  className="img-fluid propImg"
                />
                <div className="projectImgOverlay">
                  <div>
                    <span className="badge float-start fs-10 projectType">
                    {props.completionStatusName}
                    </span>
                  </div>
                  <div>
                    <span className="badge float-start fs-10 projectType">
                      {props.accommodationName}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="card-body rounded-3 rounded-top-0">
            <Link
              href={`/projects/${props.slug}`}
              className="text-decoration-none"
            >
              <h6 className="text-black fs-16 fw-semibold mb-0">
                {props.title}
              </h6>
            </Link>
            <div className="mb-1">
              <small className="text-secondary">{props.address}</small>
            </div>
            <p className="fs-18 mb-2 text-primary fw-semibold">
              AED {  new Intl.NumberFormat().format(props.starting_price )}
            </p>
            <div className="features">
              <div>
                <i
                  aria-hidden="true"
                  className="fa fa-bed fa-lg bed"
                  title="bedroom"
                ></i>
                <span>{props.bedrooms}</span>
              </div>
              {/* <div>
                <i
                  aria-hidden="true"
                  className="fa fa-bath fa-lg bath"
                  title="bathroom"
                ></i>
                <span>{props.bathrooms}</span>
              </div> */}
              <div>
                <i
                  aria-hidden="true"
                  className="fa fa-map-o fa-lg size"
                  title="size"
                ></i>
                <span className="fa-sr-only"></span>
                <span>
                  {props.area} {props.area_unit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Project;
