import { useState } from "react";
import QUESTIONS from "../../../../src/constants/checkEligibilityQuestions"
import VisaCategories from "./VisaCategories";
function GoldenVisaPage()
{
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState(0);
    const [answers, setAnswers] = useState({});
    const [checkClicked, setCheckClicked] = useState(false);

    const showCheck = () => {
        return (
            Object.values(answers)
                .slice(1)
                .filter((answer) => answer === 1).length > 0 || currentQuestion + 1 == QUESTIONS.length
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
    return (
        <>
                <section className="my-5">
            <div className="container">
                <div className="">
                    <div className=" ">
                        <h1 className="m-n h3">Check Your Eligibility</h1>
                    </div>
                    <div className="clearfix"></div>
                    <div className="wrapper dashoboardpage golderservicepage">
                        <div className="row">
                            {checkClicked ? (
                                <VisaCategories onBackToQuestionClicked={handleCheckClick} answers={answers} />
                            ) : (
                                <div className="col-md-12 margin0">
                                    <div className="dashboardcontrols dashboardcontrolsboxs dashboardcontrolsboxs2 box-wrapper card-box-shadow p-5 my-5">
                                        <div className="col-md-12 mb-5">
                                            <p className="ng-binding">
                                                {" "}
                                                <strong>{QUESTIONS[currentQuestion].question}</strong>
                                            </p>
                                            {QUESTIONS[currentQuestion].data &&
                                                (QUESTIONS[currentQuestion].data.length === 1 ? (
                                                    <p>{QUESTIONS[currentQuestion].data[0]}</p>
                                                ) : (
                                                    <ul>
                                                        {QUESTIONS[currentQuestion].data.map((data1, index) => (
                                                            <li key={index}>{data1}</li>
                                                        ))}
                                                    </ul>
                                                ))}
                                        </div>
                                        <div className="clearfix"></div>

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
                                                            answers[currentQuestion] == 0 || !answers[currentQuestion]
                                                        }
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

                                        <div className="clearfix"></div>
                                        <div className="col-md-12 mt-5 d-flex justify-content-between">
                                            <div>
                                                {currentQuestion > 0 && (
                                                    <button
                                                        type="button"
                                                       
                                                        onClick={() => setCurrentQuestion(currentQuestion - 1)}
                                                        className="btn btn-lg btn-primary"
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

                                                {currentQuestion + 1 != QUESTIONS.length && (
                                                    <button
                                                        type="button"
                                                        onClick={handleNextClicked}
                                                        className="btn btn-lg btn-primary ms-2"
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