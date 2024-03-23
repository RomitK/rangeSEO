import { useEffect, useState } from "react";
import { getCurrentUrl } from "@/src/utils/helpers/common";
const AgentBotton = (props) => {
  return (
    <>
      <div className="app col-12 col-sm-12 d-block d-sm-none">
        <div className="d-flex justify-content-center w-100">
          <ul
            className="nav bottomMenu justify-content-around align-items-center"

          >
            <li className="nav-item">
              <a href={"tel:" + props.contact} className="Probtn bg-primary p-3">
                <img loading="lazy" src="/images/icons/phone.png" className="proPhoneIcon" />
                CALL NOW
              </a>
            </li>
            <li className="nav-item">
              <a
                className="Probtn whatsappBtn wd50pr p-3"
                href={
                  "https://wa.me/" +
                  props?.whatsapp +
                  "?text=Hi, " +
                  props?.name +
                  " Please let me know more about the following property " +
                  getCurrentUrl()
                }
              >
                <i className="fa fa-whatsapp"></i>
                WHATSAPP
              </a>
            </li>

            <li className="nav-item">
              <a
                className="Probtn bg-primary wd50pr p-3"
                href={"mailto:" + props.email}
              >
                <i className="fa fa-envelope"></i>
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AgentBotton;
