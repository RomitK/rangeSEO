import VisaCategory from "./VisaCategory";
import QUESTIONS from "../../../../src/constants/checkEligibilityQuestions"
import VISAS from "../../../../src/constants/visas";
import { useEffect, useState } from "react";
import Link from "next/link";

function VisaCategories({ answers, onBackToQuestionClicked }) {
    const [visaCategories, setVisaCategories] = useState([]);

    useEffect(() => {
        let visaCategoriesDup = [];
        for (const property in answers) {
            if (property != 0) {
                if (answers[property]) {
                    visaCategoriesDup = [...visaCategoriesDup, ...QUESTIONS[property].visas];
                } else {
                    const index = visaCategories.indexOf(+property);
                    if (index !== -1) {
                        visaCategoriesDup.splice(index, 1);
                        visaCategoriesDup = [...visaCategoriesDup];
                    }
                }
            }
        }
        setVisaCategories([...visaCategoriesDup]);
    }, [answers]);
    return (
        <>
            <div className="col-md-12 m-0 px-0">
                <br />
                <div className="message-block message-block--success d-block col-sm-12 mb-5">
                    {visaCategories.length ? (
                        <p className="d-flex flex-column justify-content-center ng-binding">
                            Thank you for completing the eligibility assessment. Based on the information you have
                            provided, you will be eligible to apply for the following category(s) for Golden Residency.
                            <br />
                            <br />
                            <span
                                onClick={onBackToQuestionClicked}
                                style={{ display: "contents", color: "#ee3f43", cursor: "pointer" }}
                            >
                                Back to question
                            </span>
                        </p>
                    ) : (
                        <p className="d-flex flex-column justify-content-center ng-binding">
                            Thank you for completing the eligibility assessment. The information you provided is not
                            compatible with any of the Golden Residency categories. To learn more about each category,
                            please visit our homepage
                            <br />
                            <br />
                            For any other inquiries, please go to&nbsp;
                            <Link
                                className="link"
                                href={"/faqs"}
                                style={{ display: "contents", color: "#ee3f43", cursor: "pointer" }}
                            >
                                FAQ page
                            </Link>
                            &nbsp;or go&nbsp;
                            <span
                                onClick={onBackToQuestionClicked}
                                style={{ display: "contents", color: "#ee3f43", cursor: "pointer" }}
                            >
                                Back to question
                            </span>
                        </p>
                    )}
                </div>
                <div className="row dashboardcontrols dashboardcontrolsboxs dashboardcontrolsboxs2">
                    {visaCategories.map(
                        (visaCategory) =>
                            VISAS[visaCategory] && (
                                <VisaCategory key={visaCategory} visaCategory={VISAS[visaCategory]} />
                            )
                    )}
                </div>
            </div>
        </>
    );
}

export default VisaCategories;
