import { useState, useRef, useEffect } from "react";
import QUESTIONS from "../../../../src/constants/checkEligibilityQuestions";
import VisaCategories from "./VisaCategories";
import "@/public/css/golden-visa-styles.css";
import "@/public/css/responsive.css";


function GoldenVisaPage() {

  const [isMobileDev, setIsMobileDev] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is below a certain threshold (e.g., 768 pixels for mobile)
      const isMobileDevice = window.innerWidth < 768;
      if(isMobileDevice){
        document.body.style.overflow = 'auto';
      }
      setIsMobileDev(isMobileDevice);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checkClicked, setCheckClicked] = useState(false);
  const inputRef = useRef(null);

  const showCheck = () => {
    return (
      Object.values(answers)
        .slice(1)
        .filter((answer) => answer === 1).length > 0 ||
      currentQuestion + 1 == QUESTIONS.length
    );
  };

  const handleRadioChange = (event) => {
    const value = +event.target.value;
    setAnswer(value);
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNextClicked = () => {
    if (!QUESTIONS[currentQuestion + 1]) {
      return;
    }
    setAnswers({ ...answers, [currentQuestion]: answer });
    setAnswer(0);
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleCheckClick = () => {
    setCheckClicked(!checkClicked);
  };

  useEffect(() => {
    inputRef?.current.click();
  }, []);

  return (
    <>
      <section className={`${isMobileDev ? "my-2" : "my-5"}`}>
        <div className="container">
          <div className="">
          <div className=" ">
              <h1 className="sctionMdTitle text-primary text-center">
                Check Your Eligibility
              </h1>
            </div>

            <div className="wrapper dashoboardpage golderservicepage">
              <div className={`"row ${isMobileDev ? "m-0 p-0" : ""}`}>
                {checkClicked ? (
                  <VisaCategories
                    onBackToQuestionClicked={handleCheckClick}
                    answers={answers}
                  />
                ) : (
                  <div className="col-md-12 margin0">
                    <div className={`"dashboardcontrols dashboardcontrolsboxs
                                                     dashboardcontrolsboxs2 box-wrapper 
                                                     card-box-shadow wizardWrapArea ${isMobileDev ? "m-0 p-0" : "p-5 my-5"}`}

                    >
                      <div className="col-md-12">
                        <p className="ng-binding wzdTitleBar">
                          {" "}
                          <strong>{QUESTIONS[currentQuestion].question}</strong>
                        </p>
                        {QUESTIONS[currentQuestion].data &&
                          (QUESTIONS[currentQuestion].data.length === 1 ? (
                            <p>{QUESTIONS[currentQuestion].data[0]}</p>
                          ) : (
                            <ul>
                              {QUESTIONS[currentQuestion].data.map(
                                (data1, index) => (
                                  <li key={index}>{data1}</li>
                                )
                              )}
                            </ul>
                          ))}
                      </div>

                      <div className="form-group col-md-12">
                        <div className="custom-checkbox d-flex justify-content-center mt-3 ng-binding">
                          <div className="answers-options-container d-flex align-items-center justify-content-center flex-column mx-3">
                            <input
                              id="yes"
                              type="radio"
                              name="insideUAE"
                              onChange={handleRadioChange}
                              required
                              value={1}
                              checked={answers[currentQuestion] == 1}
                              className="ng-pristine ng-untouched ng-not-empty ng-valid ng-valid-validation"
                            />
                            <label
                              className="d-flex flex-column align-items-center"
                              htmlFor="yes"
                            >
                              <span className="ng-binding">yes</span>
                            </label>
                          </div>
                          <div className="answers-options-container d-flex align-items-center justify-content-center flex-column mx-3">
                            <input
                              id="no"
                              type="radio"
                              name="insideUAE"
                              onChange={handleRadioChange}
                              required
                              value={0}
                              className="ng-untouched ng-not-empty ng-dirty ng-valid-parse ng-valid ng-valid-validation"
                              checked={
                                answers[currentQuestion] == 0 ||
                                !answers[currentQuestion]
                              }
                              ref={inputRef}
                            />
                            <label
                              className="d-flex flex-column align-items-center"
                              htmlFor="no"
                            >
                              <span className="ng-binding">No</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12  d-flex justify-content-between wizardFooterBar">
                        <div>
                          {currentQuestion > 0 && (
                            <button
                              type="button"
                              onClick={() =>
                                setCurrentQuestion(currentQuestion - 1)
                              }
                              className="btn btn-lg btn-blue"
                            >
                              Back
                            </button>
                          )}
                        </div>

                        <div>
                          {showCheck() && (
                            <button
                              type="button"
                              onClick={handleCheckClick}
                              className="btn btn-lg btn-primary"
                            >
                              Check
                            </button>
                          )}
                          </div>
                        <div>
                          {currentQuestion + 1 != QUESTIONS.length && (
                            <button
                              type="button"
                              onClick={handleNextClicked}
                              className="btn btn-lg btn-blue"
                            >
                              Next
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default GoldenVisaPage;