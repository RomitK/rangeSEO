import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";
function PaymentPlanModel(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    formName: "enquireForm",
    page: props.pageUrl,
  });
  const contactCloseRef = useRef(null);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      return toast.error("Please fill required field");
    }
    saveContactFormApi(formData)
      .then((res) => {
        toast.success(
          "Enquire form submitted successfully, out support teams contact you soon"
        );
        contactCloseRef.current.click();
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          phone: "",
          formName: "enquireForm",
          page: props.pageUrl,
        });
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again");
      });
  };
  return (
    <>
      <div
        className="modal fade"
        id="paymentplan"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={contactCloseRef}
      >
        <div className="modal-dialog  modal-dialog-centered modal-lg modalBookMeet ">
          <div className="modal-content">
            <div className="modal-header border-0 justify-content-end p-1">
              <button
                type="button"
                className="bg-transparent border-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="bi bi-x-circle text-primary"></i>
              </button>
            </div>

            <div className="modal-body  p-0 rounded-1 m-2">
              <div className="row g-0">
                <div className="col-12 col-lg-12 col-md-12 descricalenderCol">
                  <div className="labelFLex">
                    <label className="priceLabel">
                      Sizes From : {props?.project?.areaAvailable} {props?.project?.areaUnit}
                    </label>
                    <label className="priceLabel">
                      Starting Price : AED {  new Intl.NumberFormat().format(props?.project?.price)}
                    </label>
                  </div>
                  {props?.project?.payment?.map(function (pay, index) {
                    return (
                      <table
                      
                        className="table table-bordered tblThText border-collapse"
                        key={"payment-" + index}
                      >
                        <thead>
                          <tr>
                            <th colSpan={3} className="text-center">
                              {" "}
                              {pay.title}
                            </th>
                          </tr>
                          <tr>
                            <th className="tblThText">Payments</th>
                            <th className="tblThText">Percentage (%)</th>
                            {/* <th className="tblThText">Milestones</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {pay?.rows.map((paymentPlan, index) => {
                            return (
                              <tr key={paymentPlan.id}>
                                 <td>
                                  <p className="tblTdText text-secondary">
                                    {paymentPlan?.value}
                                  </p>
                                </td>

                                <td>
                                  <p className="tblTdText text-secondary">
                                    {paymentPlan?.key}
                                  </p>
                                </td>
                                
                               
                                {/* <td>
                                  {" "}
                                  <p className="tblTdText text-secondary">
                                    {paymentPlan?.name}
                                  </p>
                                </td> */}
                                
                                
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PaymentPlanModel;
