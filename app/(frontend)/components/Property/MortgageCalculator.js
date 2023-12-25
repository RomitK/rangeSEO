import { useEffect, useState } from "react";
import ContactModel from "../models/contactModel";
import MortgageModel from "../models/MortgageModel";
function MortgageCalculator({ property }) {

    const [price, setPrice] = useState(property?.price);
    const [downPaymentPercentage, setDownPaymentPerecntage] = useState(20);
    const [mortgageTerm, setMortageTerm] = useState(25);
    const [mortgageTermMonths, setMortgageTermMonths] = useState(0);
    const [interestRate, setInterestRate] = useState(4.99);
    const [downPayment, setDownPayment] = useState(0);
    const [payableEMI, setPayableEMI] = useState(0);
    const contactSideText ="An esteemed award-winning real estate brokerage based in Dubai, UAE.";
    const pageUrl ="Home"
    
    const calculateDownPayment = () => {
        const downPayment = (price * downPaymentPercentage) / 100;
        setDownPayment(downPayment);
    };

    const calculateEMI = () => {
        calculateMortgage();
        return 0;
    };

    function calculateMortgage() {
        const amountBorrowed = price - downPayment;
        const r = percentToDecimal(interestRate);
        let n = yearsToMonths(mortgageTerm);
        n = n + parseInt(mortgageTermMonths);
        const pmt = (r * amountBorrowed) / (1 - Math.pow(1 + r, -n));
        setPayableEMI(parseFloat(pmt.toFixed(2)));
    }

    const yearsToMonths = (termYears) => {
        return termYears * 12;
    };

    function percentToDecimal(percent) {
        if (!percent) {
            return 0.0;
        }
        return percent / 12 / 100;
    }

    useEffect(() => {
        
        calculateDownPayment();
        calculateEMI();
    }, []);
    useEffect(() => {
        setPrice(property?.price)
        
    }, [property?.price]);

    useEffect(() => {
        calculateDownPayment();
    }, [price, downPaymentPercentage]);

    useEffect(() => {
        calculateEMI();
    }, [downPayment, mortgageTerm, interestRate, mortgageTermMonths]);

    const handleMortgageTermMonthChange = (e) => {
        if (mortgageTerm == 25) {
            setMortgageTermMonths(0);
            return;
        }
        if (e.target.value == 12) {
            setMortageTerm(parseInt(mortgageTerm) + 1);
            setMortgageTermMonths(0);
            return;
        }
        setMortgageTermMonths(e.target.value);
    };
    const handleInterestRateIncrement = () => {
        if (interestRate == 100) {
            return;
        } else if (interestRate > 100 || interestRate + 1 > 100) {
            setInterestRate(100);
            return;
        }
        setInterestRate(interestRate + 1);
    };
    const handleInterestRateDecrement = () => {
        if (interestRate == 0.1) {
            return;
        } else if (interestRate < 0.1 || interestRate - 1 < 0.1) {
            setInterestRate(0.1);
            return;
        }
        setInterestRate(interestRate - 1);
    };

    function formatNumber(n) {
        // format number 1000000 to 1,234,567
        return n
            .toString()
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <div className="bg-light px-3 py-2 mb-5">
            <div className="pt-3">
                <p className="text-primary fw-500 mb-0 fs-20">MORTGAGE CALCULATOR</p>
            </div>
            <div className="mortgageForm py-3">
                <form>
                    <div className="mb-3">
                        <label className="form-label fw-500">Property Value</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text  rounded-0 border-end p-2 bg-white">AED</span>
                            <input
                                type="text"
                                className="form-control border-start-0  rounded-0"
                                placeholder="Enter amount"
                                value={price}
                                name="price"
                                onChange={(e) => setPrice(parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="d-flex justify-content-between">
                            <label className="form-label fw-500">Down payment</label>
                            <label className="form-label fw-500">{downPaymentPercentage}%</label>
                        </div>
                        <input
                            type="range"
                            className="form-range mb-3"
                            id="customRange1"
                            min={20}
                            max={80}
                            value={downPaymentPercentage}
                            name="downPaymentPercentage"
                            onChange={(e) => setDownPaymentPerecntage(parseInt(e.target.value))}
                        />
                        <input
                            type="text"
                            className="form-control rounded-0 mb-2"
                            placeholder={0}
                            value={downPayment}
                            name="downPayment"
                            onChange={(e) => setDownPayment(parseInt(e.target.value))}
                        />
                        <small>
                            <i>Minimum of 20%</i>
                        </small>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-500">Mortgage Term</label>
                        <input
                            type="range"
                            className="form-range"
                            id="customRange1"
                            min={1}
                            max={25}
                            value={mortgageTerm}
                            name="mortgageTerm"
                            onChange={(e) => setMortageTerm(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label fw-500">Year</label>
                                <input
                                    type="number"
                                    className="form-control rounded-0"
                                    id="customRange1"
                                    placeholder={25}
                                    min={1}
                                    max={25}
                                    value={mortgageTerm}
                                    name="mortgageTerm"
                                    onChange={(e) => setMortageTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label fw-500">Month</label>
                                <input
                                    type="number"
                                    min={0}
                                    max={12}
                                    className="form-control rounded-0"
                                    id="customRange1"
                                    placeholder={0}
                                    value={mortgageTermMonths}
                                    onChange={handleMortgageTermMonthChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-500">
                            RATE <small>(choose from the current best options)</small>
                        </label>
                        <div className="input-group bg-white border">
                            <input
                                type="string"
                                min={0.1}
                                className="form-control border-0"
                                placeholder="RATE"
                                value={interestRate}
                                name="interestRate"
                                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                            />
                            <button
                                className="btn border border-primary text-primary px-2 py-1 rounded-circle m-1 "
                                type="button"
                                onClick={handleInterestRateDecrement}
                            >
                                <i className="bi bi-dash-lg" />
                            </button>
                            <button
                                className="btn border border-primary text-primary px-2 py-1 rounded-circle m-1 "
                                type="button"
                                onClick={handleInterestRateIncrement}
                            >
                                <i className="bi bi-plus-lg" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="p-4 my-2 bg-primary text-white text-center">
                <p className="fs-14 mb-2">Your monthly payable EMI will be</p>
                <div className="mainHead">
                    <h4 className=" mb-2">AED {payableEMI ? payableEMI : ""}</h4>
                </div>
                <div className="mb-2">
                    <a href="" className="text-white fs-16"  data-bs-toggle="modal"
                    data-bs-target="#enquireNow">
                        VIEW CLOSING COSTS
                    </a>
                </div>
                <p className="fs-14  mb-2">
                    Estimated monthly payment based on {formatNumber(downPayment)} AED finance amount with a{" "}
                    {interestRate}% variable finance rate.
                </p>
                <p className="fs-14  mb-0">Disclaimer Rates may vary based on bank policies. T&amp;C's apply</p>
            </div>
            <div className="py-3">
                <p className="text-primary fw-500 fs-20">ABOUT MY MORTGAGE</p>
                <p className="mb-0 fs-14">
                    Leading mortgage brokerage dedicated to helping our clients achieve their dream of home ownership.
                    Our team of experienced professionals are committed to providing exceptional customer service and
                    personalised solutions to meet the specific needs of each of our clients
                </p>
            </div>
            <MortgageModel></MortgageModel>
        </div>
    );
}

export default MortgageCalculator;
