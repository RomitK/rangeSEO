"use client";
import React, { useState, useEffect, useRef } from "react";
import "@/public/css/sell-with-range.css";
import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";
import PhoneInput from "react-phone-number-input";
import { getCurrentUrl } from "@/src/utils/helpers/common";
import { useForm, Controller } from "react-hook-form";
import SellModel from "../models/SellModel";
import {
    useGetBankNames,
    useGetMortageYears,
} from "@/src/services/HomeService";
import "@/public/css/mortgage-styles.css";
import "@/public/css/responsive.css";
import Select from "react-select";

type OptionType = {
    value: string;
    label: string;
};

function MortgagePage() {
    const { bankNameOption } = useGetBankNames();
    const { mortgageYearOption } = useGetMortageYears();

    const [bankData, setBankData] = useState();
    const [yearData, setYearData] = useState();
    const [isMobileDev, setIsMobileDev] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            // Check if the window width is below a certain threshold (e.g., 768 pixels for mobile)
            const isMobileDevice = window.innerWidth < 768;

            if (isMobileDevice) {
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
    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const inputRef5 = useRef(null);
    useEffect(() => {
        inputRef?.current.click();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm();
    const currentPageURL = getCurrentUrl();
    const onSubmit = (data) => {
        saveContactFormApi(data)
            .then((res) => {
                toast.success("Thank you. Our team will get back to you soon.");
                setStep(1);
                reset();
            })
            .catch((err) => {
                toast.error("Something went wrong, please try again");
            });
    };

    const bankOptions: OptionType[] = [
        { value: "Dubai Islamic Bank", label: "Dubai Islamic Bank" },
        { value: "Citi Bank", label: "Citi Bank" },
    ];

    const years: OptionType[] = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" },
        { value: "13", label: "13" },
        { value: "14", label: "14" },
        { value: "15", label: "15" },
        { value: "16", label: "16" },
        { value: "17", label: "17" },
        { value: "18", label: "18" },
        { value: "19", label: "19" },
        { value: "20", label: "20" },
        { value: "21", label: "21" },
        { value: "22", label: "22" },
        { value: "23", label: "23" },
        { value: "24", label: "24" },
        { value: "25", label: "25" },
    ];

    // const developerOptions: OptionType[] = options;

    const [propertyValue, setPropertyValue] = useState(0);
    const [propertyLoanValue, setPropertyLoanValue] = useState(0);
    const [step1Ans, setStep1Ans] = useState(null);
    const [step2Ans, setStep2Ans] = useState(null);
    const [step3Ans, setStep3Ans] = useState(null);
    const [step4Ans, setStep4Ans] = useState(null);
    const [step5Ans, setStep5Ans] = useState(null);

    const [step12Ans, setStep12Ans] = useState(1);
    const [step13Ans, setStep13Ans] = useState(1);

    const [step, setStep] = useState(1);
    const handlePreClicked = () => {
        if (step == 2) {
            setStep(1);
            setStep1Ans(step1Ans);
        }
        if (step == 3) {
            setStep(2);
            setStep2Ans(step2Ans);
        }

        if (step == 4) {
            setStep(3);
            setStep3Ans(step3Ans);
        }

        if (step == 5) {
            setStep(4);
            setStep4Ans(step4Ans);
        }
    };
    const handleNextClicked = () => {
        setStep((prev) => prev + 1);
        if (step == 1) {
            setStep1Ans(step1Ans);
            inputRef2?.current?.click();
        }
        if (step == 2) {
            setStep2Ans(step2Ans);
        }
        if (step == 3) {
            setStep3Ans(step3Ans);
        }
        if (step == 4) {
            setStep4Ans(step4Ans);
        }
        // if (step == 5) {
        //   setStep5Ans(inputRef5.current.value);
        // }
    };
    const handleStep1Ans = (event) => {
        const value = event.target.value;
        setStep1Ans(value);
        console.log(event.target);
    };

    const handleStep2Ans = (event) => {
        const value = event.target.value;
        setStep2Ans(value);
    };

    const handleStep3Ans = (event) => {
        const value = event.target.value;
        setStep3Ans(value);
    };

    const handleStep4Ans = (event) => {
        const value = event.target.value;
        setStep4Ans(value);
    };

    const handleStep5Ans = (event) => {
        const value = event.target.value;
        setStep5Ans(value);
    };

    const handleStep12Ans = (event) => {
        const value = event.target.value;
        setStep12Ans(value);
    };

    const handleStep13Ans = (event) => {
        const value = event.target.value;
        setStep13Ans(value);
    };

    return (
        <>
            <section className={`${isMobileDev ? "my-2" : "my-5"}`}>
                <div className="container">
                    <div className="">
                        <div className=" ">
                            <h1 className="sctionMdTitle text-primary text-center">
                                Mortgage Journey
                            </h1>
                        </div>
                        <div className="wrapper dashoboardpage golderservicepage">
                            <div className="row">
                                <div className="col-md-12 margin0">
                                    <div
                                        className={`"dashboardcontrols dashboardcontrolsboxs dashboardcontrolsboxs2 box-wrapper card-box-shadow wizardWrapArea ${isMobileDev ? "m-0 p-0" : "p-5 my-5"
                                            }`}
                                    >
                                        {step == 1 && (
                                            <>
                                                <div
                                                    className={`"row ${isMobileDev ? "nospace-row" : ""}`}
                                                >
                                                    <div className="col-md-12">
                                                        <p className="wzdTitleBar">
                                                            <strong>What are you looking for</strong>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`"row ${isMobileDev ? "nospace-row" : ""}`}
                                                >
                                                    <div className="form-group col-md-12">
                                                        {!isMobileDev && (
                                                            <>
                                                                <div className="mortage-custom-checkbox d-flex justify-content-center mt-3">
                                                                    <div className="col-md-6">
                                                                        <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                            <input
                                                                                id="yes"
                                                                                type="radio"
                                                                                name="insideUAE"
                                                                                onChange={handleStep1Ans}
                                                                                required
                                                                                checked={step1Ans === "new_purchase"}
                                                                                value="new_purchase"
                                                                                ref={inputRef}
                                                                            />
                                                                            <label
                                                                                className="d-flex flex-row align-items-center"
                                                                                htmlFor="yes"
                                                                            >
                                                                                <span className="px-2">
                                                                                    {" "}
                                                                                    New Purchase
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                            <input
                                                                                id="no"
                                                                                type="radio"
                                                                                name="insideUAE"
                                                                                onChange={handleStep1Ans}
                                                                                required
                                                                                checked={
                                                                                    step1Ans === "mortage_refinance"
                                                                                }
                                                                                value="mortage_refinance"
                                                                            />
                                                                            <label
                                                                                className="d-flex flex-row align-items-center"
                                                                                htmlFor="no"
                                                                            >
                                                                                <span className="px-2">
                                                                                    {" "}
                                                                                    Mortgage Refinances
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}

                                                        {isMobileDev && (
                                                            <>
                                                                <div className="mortage-custom-checkbox ">
                                                                    <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                        <input
                                                                            id="yes"
                                                                            type="radio"
                                                                            name="insideUAE"
                                                                            onChange={handleStep1Ans}
                                                                            required
                                                                            checked={step1Ans === "new_purchase"}
                                                                            value="new_purchase"
                                                                            ref={inputRef}
                                                                        />
                                                                        <label
                                                                            className="d-flex flex-row align-items-center"
                                                                            htmlFor="yes"
                                                                        >
                                                                            <span className="px-2">
                                                                                {" "}
                                                                                New Purchase
                                                                            </span>
                                                                        </label>
                                                                    </div>
                                                                    <br />
                                                                    <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                        <input
                                                                            id="no"
                                                                            type="radio"
                                                                            name="insideUAE"
                                                                            onChange={handleStep1Ans}
                                                                            required
                                                                            checked={step1Ans === "mortage_refinance"}
                                                                            value="mortage_refinance"
                                                                        />
                                                                        <label
                                                                            className="d-flex flex-row align-items-center"
                                                                            htmlFor="no"
                                                                        >
                                                                            <span className="px-2">
                                                                                {" "}
                                                                                Mortgage Refinances
                                                                            </span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                {step1Ans && (
                                                    <>
                                                        <div className="col-md-12 d-flex justify-content-between wizardFooterBar">
                                                            <div></div>
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-lg btn-blue"
                                                                    onClick={handleNextClicked}
                                                                >
                                                                    Next
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        )}

                                        {step == 2 && step1Ans === "new_purchase" && (
                                            <>
                                                <div
                                                    className={`"row ${isMobileDev ? "nospace-row" : ""}`}
                                                >
                                                    <div className="col-md-12">
                                                        <p className="wzdTitleBar">
                                                            <strong>
                                                                Thanks! Have you found a property already?
                                                            </strong>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`"row ${isMobileDev ? "nospace-row" : ""}`}
                                                >
                                                    <div className="form-group col-md-12">
                                                        {!isMobileDev && (
                                                            <>
                                                                <div className="mortage-custom-checkbox d-flex justify-content-center mt-3">
                                                                    <div className="col-md-4">
                                                                        <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                            <input
                                                                                id="yes"
                                                                                type="radio"
                                                                                name="insideUAE"
                                                                                required
                                                                                onChange={handleStep2Ans}
                                                                                value="just_browersing_the_market"
                                                                                checked={
                                                                                    step2Ans ===
                                                                                    "just_browersing_the_market"
                                                                                }
                                                                            />
                                                                            <label
                                                                                className="d-flex flex-row align-items-center"
                                                                                htmlFor="yes"
                                                                            >
                                                                                <span className="px-2">
                                                                                    {" "}
                                                                                    Just browsing the market
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                            <input
                                                                                id="no"
                                                                                type="radio"
                                                                                name="insideUAE"
                                                                                onChange={handleStep2Ans}
                                                                                required
                                                                                value="started_looking_around"
                                                                                checked={
                                                                                    step2Ans === "started_looking_around"
                                                                                }
                                                                            />
                                                                            <label
                                                                                className="d-flex flex-row align-items-center"
                                                                                htmlFor="no"
                                                                            >
                                                                                <span className="px-2">
                                                                                    {" "}
                                                                                    I’ve started looking around
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                            <input
                                                                                id="noo"
                                                                                type="radio"
                                                                                name="insideUAE"
                                                                                onChange={handleStep2Ans}
                                                                                checked={
                                                                                    step2Ans === "found_dream_home"
                                                                                }
                                                                                value="found_dream_home"
                                                                            />
                                                                            <label
                                                                                className="d-flex flex-row align-items-center"
                                                                                htmlFor="noo"
                                                                            >
                                                                                <span className="px-2">
                                                                                    {" "}
                                                                                    I’ve found my dream home
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}

                                                        {isMobileDev && (
                                                            <>
                                                                <div className="mortage-custom-checkbox">
                                                                    <div className="">
                                                                        <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                            <input
                                                                                id="yes"
                                                                                type="radio"
                                                                                name="insideUAE"
                                                                                required
                                                                                onChange={handleStep2Ans}
                                                                                value="just_browersing_the_market"
                                                                                checked={
                                                                                    step2Ans ===
                                                                                    "just_browersing_the_market"
                                                                                }
                                                                            />
                                                                            <label
                                                                                className="d-flex flex-row align-items-center"
                                                                                htmlFor="yes"
                                                                            >
                                                                                <span className="px-2">
                                                                                    {" "}
                                                                                    Just browsing the market
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <br />
                                                                    <div className="">
                                                                        <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                            <input
                                                                                id="no"
                                                                                type="radio"
                                                                                name="insideUAE"
                                                                                onChange={handleStep2Ans}
                                                                                required
                                                                                value="started_looking_around"
                                                                                checked={
                                                                                    step2Ans === "started_looking_around"
                                                                                }
                                                                            />
                                                                            <label
                                                                                className="d-flex flex-row align-items-center"
                                                                                htmlFor="no"
                                                                            >
                                                                                <span className="px-2">
                                                                                    {" "}
                                                                                    I’ve started looking around
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <br />
                                                                    <div className="">
                                                                        <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                            <input
                                                                                id="noo"
                                                                                type="radio"
                                                                                name="insideUAE"
                                                                                onChange={handleStep2Ans}
                                                                                checked={
                                                                                    step2Ans === "found_dream_home"
                                                                                }
                                                                                value="found_dream_home"
                                                                            />
                                                                            <label
                                                                                className="d-flex flex-row align-items-center"
                                                                                htmlFor="noo"
                                                                            >
                                                                                <span className="px-2">
                                                                                    {" "}
                                                                                    I’ve found my dream home
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-12 d-flex justify-content-between wizardFooterBar">
                                                    <div>
                                                        {step > 1 && (
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-lg btn-blue"
                                                                    onClick={handlePreClicked}
                                                                >
                                                                    Back
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {step2Ans && (
                                                        <>
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-lg btn-blue"
                                                                    onClick={handleNextClicked}
                                                                >
                                                                    Next
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        {step == 2 && step1Ans === "mortage_refinance" && (
                                            <>
                                                <div
                                                    className={`"row ${isMobileDev ? "nospace-row" : ""}`}
                                                >
                                                    <div className="col-md-12">
                                                        <p className="wzdTitleBar">
                                                            <strong>
                                                                Perfect! Let’s get some more information about
                                                                you existing mortgage
                                                            </strong>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`"row ${isMobileDev ? "nospace-row" : ""}`}
                                                >
                                                    <div className="form-group col-md-12">
                                                        {!isMobileDev && (
                                                            <>
                                                                <div className="d-flex  mt-3">
                                                                    <div className="col-md-4">
                                                                        <p>Which bank is your mortgage with?</p>
                                                                        <Select
                                                                            options={bankNameOption}
                                                                            value={bankData}
                                                                            onChange={(selectedOption) =>
                                                                                setBankData(selectedOption)
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}

                                                        {isMobileDev && (
                                                            <>
                                                                <div className="mortage-custom-checkbox  ">
                                                                    <div className="col-md-12 my-3">
                                                                        <div className="answers-options-container d-flex justify-content-center  mx-3">
                                                                            <input
                                                                                id="yes"
                                                                                type="radio"
                                                                                name="insideUAE"
                                                                                required
                                                                                value="1"
                                                                            />
                                                                            <label
                                                                                className="d-flex flex-row align-items-center"
                                                                                htmlFor="yes"
                                                                            >
                                                                                <span className="px-2">
                                                                                    {" "}
                                                                                    New Purchase
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-12 my-3">
                                                                        <div className="answers-options-container d-flex  justify-content-center  mx-3">
                                                                            <input
                                                                                id="no"
                                                                                type="radio"
                                                                                name="insideUAE"
                                                                                required
                                                                                value="0"
                                                                            />
                                                                            <label
                                                                                className="d-flex flex-row align-items-center"
                                                                                htmlFor="no"
                                                                            >
                                                                                <span className="px-2">
                                                                                    {" "}
                                                                                    Mortgage Refinances
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="col-md-12 d-flex justify-content-between wizardFooterBar">
                                                    <div>
                                                        {step > 1 && (
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-lg btn-blue"
                                                                    onClick={handlePreClicked}
                                                                >
                                                                    Back
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {bankData && (
                                                        <>
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-lg btn-blue"
                                                                    onClick={handleNextClicked}
                                                                >
                                                                    Next
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        {step === 3 &&
                                            step1Ans === "mortage_refinance" &&
                                            bankData && (
                                                <>
                                                    <div
                                                        className={`"row ${isMobileDev ? "nospace-row" : ""
                                                            }`}
                                                    >
                                                        <div className="col-md-12">
                                                            <p className="wzdTitleBar">
                                                                <strong>
                                                                    Alright, let's get a few details about your
                                                                    property?
                                                                </strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`"row ${isMobileDev ? "nospace-row" : ""
                                                            }`}
                                                    >
                                                        <div className="form-group col-md-12">
                                                            {!isMobileDev && (
                                                                <>
                                                                    <div className=" justify-content-center mt-3">
                                                                        <div className="col-md-12">
                                                                            <div className="">
                                                                                <p className="form-label fw-500">
                                                                                    Property Value
                                                                                </p>
                                                                                <div className="input-group maxContent">
                                                                                    <span className="input-group-text  rounded-0 border-end p-2">
                                                                                        AED
                                                                                    </span>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control border-start-0  rounded-0"
                                                                                        placeholder="Enter amount"
                                                                                        value={propertyValue}
                                                                                        onChange={(e) => {
                                                                                            const parsedValue = parseInt(e?.target?.value);
                                                                                            // Check if parsedValue is NaN, then set it to 0
                                                                                            setPropertyValue(isNaN(parsedValue) ? 0 : parsedValue);
                                                                                        }}
                                                                                        name="price"
                                                                                    />
                                                                                </div>
                                                                                <small>
                                                                                    Not sure what the amount is? Give us
                                                                                    an approximate figure.
                                                                                </small>
                                                                            </div>

                                                                            {/* <div className="mb-3">
                                        <p className="form-label fw-500">
                                        Outstanding loan amount
                                        </p>
                                        <div className="input-group maxContent">
                                          <span className="input-group-text  rounded-0 border-end p-2">
                                            AED
                                          </span>
                                          <input
                                            type="text"
                                            className="form-control border-start-0  rounded-0"
                                            placeholder="Enter amount"
                                            value={propertyLoanValue}
                                            onChange={(e) =>
                                              setPropertyLoanValue(
                                                parseInt(e.target.value)
                                              )
                                            }
                                            name="price"
                                          />
                                          
                                        </div>
                                        <small>Not sure what the amount is? Give us an approximate figure.</small>
                                      </div> */}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {isMobileDev && (
                                                                <>
                                                                    <div className="mortage-custom-checkbox  ">
                                                                        <div className="col-md-12 my-3">
                                                                            <div className="answers-options-container d-flex justify-content-center  mx-3">
                                                                                <input
                                                                                    id="yes"
                                                                                    type="radio"
                                                                                    name="insideUAE"
                                                                                    required
                                                                                    value="1"
                                                                                />
                                                                                <label
                                                                                    className="d-flex flex-row align-items-center"
                                                                                    htmlFor="yes"
                                                                                >
                                                                                    <span className="px-2">
                                                                                        {" "}
                                                                                        New Purchase
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-12 my-3">
                                                                            <div className="answers-options-container d-flex  justify-content-center  mx-3">
                                                                                <input
                                                                                    id="no"
                                                                                    type="radio"
                                                                                    name="insideUAE"
                                                                                    required
                                                                                    value="0"
                                                                                />
                                                                                <label
                                                                                    className="d-flex flex-row align-items-center"
                                                                                    htmlFor="no"
                                                                                >
                                                                                    <span className="px-2">
                                                                                        {" "}
                                                                                        Mortgage Refinances
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12 d-flex justify-content-between wizardFooterBar">
                                                        <div>
                                                            {step > 1 && (
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-lg btn-blue"
                                                                        onClick={handlePreClicked}
                                                                    >
                                                                        Back
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {propertyValue > 0 && (
                                                            <>
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-lg btn-blue"
                                                                        onClick={handleNextClicked}
                                                                    >
                                                                        Next
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </>
                                            )}

                                        {step === 4 &&
                                            step1Ans === "mortage_refinance" &&
                                            bankData &&
                                            propertyValue && (
                                                <>
                                                    <div
                                                        className={`"row ${isMobileDev ? "nospace-row" : ""
                                                            }`}
                                                    >
                                                        <div className="col-md-12">
                                                            <p className="wzdTitleBar">
                                                                <strong>
                                                                    What’s the remaining mortgage term?
                                                                </strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`"row ${isMobileDev ? "nospace-row" : ""
                                                            }`}
                                                    >
                                                        <div className="form-group col-md-12">
                                                            {!isMobileDev && (
                                                                <>
                                                                    <div className="d-flex  mt-3">
                                                                        <div className="col-md-4">
                                                                            <p>What’s the remaining mortgage term?</p>
                                                                            <Select
                                                                                options={mortgageYearOption}
                                                                                value={yearData}
                                                                                className=""
                                                                                onChange={(e) => setYearData(e)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {isMobileDev && (
                                                                <>
                                                                    <div className="mortage-custom-checkbox  ">
                                                                        <div className="col-md-12 my-3">
                                                                            <div className="answers-options-container d-flex justify-content-center  mx-3">
                                                                                <input
                                                                                    id="yes"
                                                                                    type="radio"
                                                                                    name="insideUAE"
                                                                                    required
                                                                                    value="1"
                                                                                />
                                                                                <label
                                                                                    className="d-flex flex-row align-items-center"
                                                                                    htmlFor="yes"
                                                                                >
                                                                                    <span className="px-2">
                                                                                        {" "}
                                                                                        New Purchase
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-12 my-3">
                                                                            <div className="answers-options-container d-flex  justify-content-center  mx-3">
                                                                                <input
                                                                                    id="no"
                                                                                    type="radio"
                                                                                    name="insideUAE"
                                                                                    required
                                                                                    value="0"
                                                                                />
                                                                                <label
                                                                                    className="d-flex flex-row align-items-center"
                                                                                    htmlFor="no"
                                                                                >
                                                                                    <span className="px-2">
                                                                                        {" "}
                                                                                        Mortgage Refinances
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12 d-flex justify-content-between wizardFooterBar">
                                                        <div>
                                                            {step > 1 && (
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-lg btn-blue"
                                                                        onClick={handlePreClicked}
                                                                    >
                                                                        Back
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {propertyValue > 0 && yearData && (
                                                            <>
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-lg btn-blue"
                                                                        onClick={handleNextClicked}
                                                                    >
                                                                        Next
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </>
                                            )}

                                        {step === 5 &&
                                            step1Ans === "mortage_refinance" &&
                                            bankData &&
                                            propertyValue &&
                                            yearData && (
                                                <>
                                                    <div
                                                        className={`"row ${isMobileDev ? "nospace-row" : ""
                                                            }`}
                                                    >
                                                        <div className="form-group col-md-12 text-center">
                                                            {!isMobileDev && (
                                                                <>
                                                                    <div className="container">
                                                                        <div className="row justify-content-center">
                                                                            <div className="col-lg-6">
                                                                                <p className="wzdTitleBar">
                                                                                    <strong>
                                                                                        Let's get some details to help serve
                                                                                        you better!
                                                                                    </strong>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="container">
                                                                        <div className="row justify-content-center">
                                                                            <div className="col-lg-6">
                                                                                <div className="contactForm">
                                                                                    <form
                                                                                        onSubmit={handleSubmit(onSubmit)}
                                                                                    >
                                                                                        <div className="row">
                                                                                            <div className="col-12 mb-2">
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                    id="name"
                                                                                                    placeholder="Name"
                                                                                                    {...register("name", {
                                                                                                        required: true,
                                                                                                    })}
                                                                                                />
                                                                                                {errors.name && (
                                                                                                    <small className="text-danger">
                                                                                                        Name is required.
                                                                                                    </small>
                                                                                                )}
                                                                                            </div>

                                                                                            <div className="col-12 mb-2">
                                                                                                <input
                                                                                                    type="email"
                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                    id="email"
                                                                                                    placeholder="Email Address"
                                                                                                    {...register("email", {
                                                                                                        required: true,
                                                                                                    })}
                                                                                                />
                                                                                                {errors.email && (
                                                                                                    <small className="text-danger">
                                                                                                        Email is required.
                                                                                                    </small>
                                                                                                )}
                                                                                            </div>

                                                                                            <div className="col-12 mb-2">
                                                                                                <Controller
                                                                                                    name="phone"
                                                                                                    control={control}
                                                                                                    rules={{ required: true }}
                                                                                                    render={({
                                                                                                        field: { onChange, value },
                                                                                                    }) => (
                                                                                                        <PhoneInput
                                                                                                            international
                                                                                                            countryCallingCodeEditable={
                                                                                                                false
                                                                                                            }
                                                                                                            className="form-control rounded-0 fs-14 d-flex"
                                                                                                            defaultCountry="AE"
                                                                                                            placeholder="Enter Phone Number"
                                                                                                            value={value}
                                                                                                            onChange={onChange}
                                                                                                            style={{ border: "0px" }}
                                                                                                        />
                                                                                                    )}
                                                                                                />

                                                                                                {errors.phone && (
                                                                                                    <small className="text-danger">
                                                                                                        Phone is required.
                                                                                                    </small>
                                                                                                )}
                                                                                            </div>

                                                                                            <div className="col-12 mb-2">
                                                                                                <textarea
                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                    id="message"
                                                                                                    rows={3}
                                                                                                    placeholder="Message"
                                                                                                    {...register("message", {
                                                                                                        required: false,
                                                                                                    })}
                                                                                                ></textarea>
                                                                                                {errors.message && (
                                                                                                    <small className="text-danger">
                                                                                                        Message is required.
                                                                                                    </small>
                                                                                                )}
                                                                                            </div>
                                                                                            <input
                                                                                                type="hidden"
                                                                                                value="ContactForm"
                                                                                                {...register("formName", {
                                                                                                    required: false,
                                                                                                })}
                                                                                            />
                                                                                            <input
                                                                                                type="hidden"
                                                                                                value={currentPageURL}
                                                                                                {...register("page", {
                                                                                                    required: false,
                                                                                                })}
                                                                                            />
                                                                                            <div className="col-12 mb-2">
                                                                                                <div className="text-start">
                                                                                                    <button
                                                                                                        className="btn btn-primary px-5 text-uppercase rounded-0 btn-lg"
                                                                                                        type="submit"
                                                                                                    >
                                                                                                        Submit
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {isMobileDev && (
                                                                <>
                                                                    <div className="mortage-custom-checkbox  ">
                                                                        <div className="col-md-12 my-3">
                                                                            <div className="answers-options-container d-flex justify-content-center  mx-3">
                                                                                <input
                                                                                    id="yes"
                                                                                    type="radio"
                                                                                    name="insideUAE"
                                                                                    required
                                                                                    value="1"
                                                                                />
                                                                                <label
                                                                                    className="d-flex flex-row align-items-center"
                                                                                    htmlFor="yes"
                                                                                >
                                                                                    <span className="px-2">
                                                                                        {" "}
                                                                                        New Purchase
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-12 my-3">
                                                                            <div className="answers-options-container d-flex  justify-content-center  mx-3">
                                                                                <input
                                                                                    id="no"
                                                                                    type="radio"
                                                                                    name="insideUAE"
                                                                                    required
                                                                                    value="0"
                                                                                />
                                                                                <label
                                                                                    className="d-flex flex-row align-items-center"
                                                                                    htmlFor="no"
                                                                                >
                                                                                    <span className="px-2">
                                                                                        {" "}
                                                                                        Mortgage Refinances
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                        {step === 3 &&
                                            step1Ans === "new_purchase" &&
                                            [
                                                "just_browersing_the_market",
                                                "started_looking_around",
                                                "found_dream_home",
                                            ].includes(step2Ans) && (
                                                <>
                                                    <div
                                                        className={`"row ${isMobileDev ? "nospace-row" : ""
                                                            }`}
                                                    >
                                                        <div className="col-md-12">
                                                            <p className="wzdTitleBar">
                                                                <strong>
                                                                    What kind of property are you in the market
                                                                    for?
                                                                </strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`"row ${isMobileDev ? "nospace-row" : ""
                                                            }`}
                                                    >
                                                        <div className="form-group col-md-12">
                                                            {!isMobileDev && (
                                                                <>
                                                                    <div className="mortage-custom-checkbox d-flex justify-content-center mt-3">
                                                                        <div className="col-md-4">
                                                                            <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                                <input
                                                                                    id="yes"
                                                                                    type="radio"
                                                                                    name="insideUAE"
                                                                                    required
                                                                                    onChange={handleStep3Ans}
                                                                                    value="villa"
                                                                                    checked={step3Ans === "villa"}
                                                                                />
                                                                                <label
                                                                                    className="d-flex flex-row align-items-center"
                                                                                    htmlFor="yes"
                                                                                >
                                                                                    <span className="px-2"> Villa</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                                <input
                                                                                    id="no"
                                                                                    type="radio"
                                                                                    name="insideUAE"
                                                                                    onChange={handleStep3Ans}
                                                                                    checked={step3Ans === "apartment"}
                                                                                    value="apartment"
                                                                                />
                                                                                <label
                                                                                    className="d-flex flex-row align-items-center"
                                                                                    htmlFor="no"
                                                                                >
                                                                                    <span className="px-2">
                                                                                        {" "}
                                                                                        Apartment
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                                <input
                                                                                    id="noo"
                                                                                    type="radio"
                                                                                    name="insideUAE"
                                                                                    onChange={handleStep3Ans}
                                                                                    checked={step3Ans === "undecided"}
                                                                                    value="undecided"
                                                                                />
                                                                                <label
                                                                                    className="d-flex flex-row align-items-center"
                                                                                    htmlFor="noo"
                                                                                >
                                                                                    <span className="px-2">
                                                                                        {" "}
                                                                                        Undecided
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {isMobileDev && (
                                                                <>
                                                                    <div className="mortage-custom-checkbox">
                                                                        <div className="col-md-4">
                                                                            <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                                <input
                                                                                    id="yes"
                                                                                    type="radio"
                                                                                    name="insideUAE"
                                                                                    required
                                                                                    onChange={handleStep3Ans}
                                                                                    value="villa"
                                                                                    checked={step3Ans === "villa"}
                                                                                />
                                                                                <label
                                                                                    className="d-flex flex-row align-items-center"
                                                                                    htmlFor="yes"
                                                                                >
                                                                                    <span className="px-2"> Villa</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <br />
                                                                        <div className="col-md-4">
                                                                            <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                                <input
                                                                                    id="no"
                                                                                    type="radio"
                                                                                    name="insideUAE"
                                                                                    onChange={handleStep3Ans}
                                                                                    checked={step3Ans === "apartment"}
                                                                                    value="apartment"
                                                                                />
                                                                                <label
                                                                                    className="d-flex flex-row align-items-center"
                                                                                    htmlFor="no"
                                                                                >
                                                                                    <span className="px-2">
                                                                                        {" "}
                                                                                        Apartment
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <br />
                                                                        <div className="col-md-4">
                                                                            <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                                <input
                                                                                    id="noo"
                                                                                    type="radio"
                                                                                    name="insideUAE"
                                                                                    onChange={handleStep3Ans}
                                                                                    checked={step3Ans === "undecided"}
                                                                                    value="undecided"
                                                                                />
                                                                                <label
                                                                                    className="d-flex flex-row align-items-center"
                                                                                    htmlFor="noo"
                                                                                >
                                                                                    <span className="px-2">
                                                                                        {" "}
                                                                                        Undecided
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12 d-flex justify-content-between wizardFooterBar">
                                                        <div>
                                                            {step > 1 && (
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-lg btn-blue"
                                                                        onClick={handlePreClicked}
                                                                    >
                                                                        Back
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {step3Ans && (
                                                            <>
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-lg btn-blue"
                                                                        onClick={handleNextClicked}
                                                                    >
                                                                        Next
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </>
                                            )}

                                        {step === 4 &&
                                            step1Ans === "new_purchase" &&
                                            [
                                                "just_browersing_the_market",
                                                "started_looking_around",
                                                "found_dream_home",
                                            ].includes(step2Ans) &&
                                            ["villa", "apartment"].includes(step3Ans) && (
                                                <>
                                                    <div
                                                        className={`"row ${isMobileDev ? "nospace-row" : ""
                                                            }`}
                                                    >
                                                        <div className="col-md-12">
                                                            <p className="wzdTitleBar">
                                                                <strong>
                                                                    Looking for something ready? Would an off-plan
                                                                    project work as well?
                                                                </strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`"row ${isMobileDev ? "nospace-row" : ""
                                                            }`}
                                                    >
                                                        <div className="form-group col-md-12">
                                                            {!isMobileDev && (
                                                                <>
                                                                    <div className="mortage-custom-checkbox d-flex justify-content-center mt-3">
                                                                        <div className="col-md-6">
                                                                            <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                                <input
                                                                                    id="yes"
                                                                                    type="radio"
                                                                                    name="insideUAE"
                                                                                    checked={
                                                                                        step4Ans === "ready_to_move_in"
                                                                                    }
                                                                                    onChange={handleStep4Ans}
                                                                                    value="ready_to_move_in"
                                                                                />
                                                                                <label
                                                                                    className="d-flex flex-row align-items-center"
                                                                                    htmlFor="yes"
                                                                                >
                                                                                    <span className="px-2">
                                                                                        {" "}
                                                                                        Ready to move in
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                                <input
                                                                                    id="no"
                                                                                    type="radio"
                                                                                    name="insideUAE"
                                                                                    onChange={handleStep4Ans}
                                                                                    checked={
                                                                                        step4Ans === "under_construction"
                                                                                    }
                                                                                    value="under_construction"
                                                                                />
                                                                                <label
                                                                                    className="d-flex flex-row align-items-center"
                                                                                    htmlFor="no"
                                                                                >
                                                                                    <span className="px-2">
                                                                                        {" "}
                                                                                        Under construction
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {isMobileDev && (
                                                                <>
                                                                    <div className="mortage-custom-checkbox">
                                                                        <div className="">
                                                                            <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                                <input
                                                                                    id="yes"
                                                                                    type="radio"
                                                                                    name="insideUAE"
                                                                                    checked={
                                                                                        step4Ans === "ready_to_move_in"
                                                                                    }
                                                                                    onChange={handleStep4Ans}
                                                                                    value="ready_to_move_in"
                                                                                />
                                                                                <label
                                                                                    className="d-flex flex-row align-items-center"
                                                                                    htmlFor="yes"
                                                                                >
                                                                                    <span className="px-2">
                                                                                        {" "}
                                                                                        Ready to move in
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <br />
                                                                        <div className="">
                                                                            <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                                <input
                                                                                    id="no"
                                                                                    type="radio"
                                                                                    name="insideUAE"
                                                                                    onChange={handleStep4Ans}
                                                                                    checked={
                                                                                        step4Ans === "under_construction"
                                                                                    }
                                                                                    value="under_construction"
                                                                                />
                                                                                <label
                                                                                    className="d-flex flex-row align-items-center"
                                                                                    htmlFor="no"
                                                                                >
                                                                                    <span className="px-2">
                                                                                        {" "}
                                                                                        Under construction
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12 d-flex justify-content-between wizardFooterBar">
                                                        <div>
                                                            {step > 1 && (
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-lg btn-blue"
                                                                        onClick={handlePreClicked}
                                                                    >
                                                                        Back
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {step4Ans && (
                                                            <>
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-lg btn-blue"
                                                                        onClick={handleNextClicked}
                                                                    >
                                                                        Next
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </>
                                            )}

                                        {step === 5 &&
                                            step1Ans === "new_purchase" &&
                                            [
                                                "just_browersing_the_market",
                                                "started_looking_around",
                                                "found_dream_home",
                                            ].includes(step2Ans) &&
                                            ["villa", "apartment"].includes(step3Ans) &&
                                            ["ready_to_move_in", "under_construction"].includes(
                                                step4Ans
                                            ) && (
                                                <>
                                                    <div
                                                        className={`"row ${isMobileDev ? "nospace-row" : ""
                                                            }`}
                                                    >
                                                        <div className="col-md-12">
                                                            <p className="wzdTitleBar">
                                                                <strong>
                                                                    Mention the maximum amount you are willing to
                                                                    spend on the property
                                                                </strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`"row ${isMobileDev ? "nospace-row" : ""
                                                            }`}
                                                    >
                                                        <div className="form-group col-md-12">
                                                            {!isMobileDev && (
                                                                <>
                                                                    <div className=" justify-content-center mt-3">
                                                                        <div className="col-md-12">
                                                                            <div className="mb-3">
                                                                                <p className="form-label fw-500">
                                                                                    Property Value
                                                                                </p>
                                                                                <div className="input-group maxContent">
                                                                                    <span className="input-group-text  rounded-0 border-end p-2">
                                                                                        AED
                                                                                    </span>
                                                                                    <input
                                                                                        type="number"
                                                                                        className="form-control border-start-0  rounded-0"
                                                                                        placeholder="Enter amount"
                                                                                        value={propertyValue}
                                                                                        onChange={(e) =>
                                                                                            setPropertyValue(parseInt(e.target.value))
                                                                                        }
                                                                                        name="price"
                                                                                    />
                                                                                </div>
                                                                                <small>
                                                                                    Not sure what the amount is? Give us
                                                                                    an approximate figure.
                                                                                </small>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {isMobileDev && (
                                                                <>
                                                                    <div className="px-3">
                                                                        <p className="form-label fw-500">
                                                                            Property Value
                                                                        </p>
                                                                        <div className="input-group maxContent">
                                                                            <span className="input-group-text  rounded-0 border-end p-2">
                                                                                AED
                                                                            </span>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control border-start-0  rounded-0"
                                                                                placeholder="Enter amount"
                                                                                value={propertyValue}
                                                                                onChange={(e) => {
                                                                                    const parsedValue = parseInt(e?.target?.value);
                                                                                    // Check if parsedValue is NaN, then set it to 0
                                                                                    setPropertyValue(isNaN(parsedValue) ? 0 : parsedValue);
                                                                                }}
                                                                                name="price"
                                                                            />
                                                                        </div>
                                                                        <small>
                                                                            Not sure what the amount is? Give us an
                                                                            approximate figure.
                                                                        </small>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12 d-flex justify-content-between wizardFooterBar">
                                                        <div>
                                                            {step > 1 && (
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-lg btn-blue"
                                                                        onClick={handlePreClicked}
                                                                    >
                                                                        Back
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {propertyValue > 0 && (
                                                            <>
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-lg btn-blue"
                                                                        onClick={handleNextClicked}
                                                                    >
                                                                        Next
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </>
                                            )}

                                        {step === 6 &&
                                            step1Ans === "new_purchase" &&
                                            [
                                                "just_browersing_the_market",
                                                "started_looking_around",
                                                "found_dream_home",
                                            ].includes(step2Ans) &&
                                            ["villa", "apartment"].includes(step3Ans) &&
                                            ["ready_to_move_in", "under_construction"].includes(
                                                step4Ans
                                            ) &&
                                            propertyValue && (
                                                <>
                                                    <div
                                                        className={`"row ${isMobileDev ? "nospace-row" : ""
                                                            }`}
                                                    >
                                                        <div className="form-group col-md-12 text-center">
                                                            {!isMobileDev && (
                                                                <>
                                                                    <div className="container">
                                                                        <div className="row justify-content-center">
                                                                            <div className="col-lg-6">
                                                                                <p className="wzdTitleBar">
                                                                                    <strong>
                                                                                        Let's get some details to help serve
                                                                                        you better!
                                                                                    </strong>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="container">
                                                                        <div className="row justify-content-center">
                                                                            <div className="col-lg-6">
                                                                                <div className="contactForm">
                                                                                    <form
                                                                                        onSubmit={handleSubmit(onSubmit)}
                                                                                    >
                                                                                        <div className="row">
                                                                                            <div className="col-12 mb-2">
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                    id="name"
                                                                                                    placeholder="Name"
                                                                                                    {...register("name", {
                                                                                                        required: true,
                                                                                                    })}
                                                                                                />
                                                                                                {errors.name && (
                                                                                                    <small className="text-danger">
                                                                                                        Name is required.
                                                                                                    </small>
                                                                                                )}
                                                                                            </div>

                                                                                            <div className="col-12 mb-2">
                                                                                                <input
                                                                                                    type="email"
                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                    id="email"
                                                                                                    placeholder="Email Address"
                                                                                                    {...register("email", {
                                                                                                        required: true,
                                                                                                    })}
                                                                                                />
                                                                                                {errors.email && (
                                                                                                    <small className="text-danger">
                                                                                                        Email is required.
                                                                                                    </small>
                                                                                                )}
                                                                                            </div>

                                                                                            <div className="col-12 mb-2">
                                                                                                <Controller
                                                                                                    name="phone"
                                                                                                    control={control}
                                                                                                    rules={{ required: true }}
                                                                                                    render={({
                                                                                                        field: { onChange, value },
                                                                                                    }) => (
                                                                                                        <PhoneInput
                                                                                                            international
                                                                                                            countryCallingCodeEditable={
                                                                                                                false
                                                                                                            }
                                                                                                            className="form-control rounded-0 fs-14 d-flex"
                                                                                                            defaultCountry="AE"
                                                                                                            placeholder="Enter Phone Number"
                                                                                                            value={value}
                                                                                                            onChange={onChange}
                                                                                                            style={{ border: "0px" }}
                                                                                                        />
                                                                                                    )}
                                                                                                />

                                                                                                {errors.phone && (
                                                                                                    <small className="text-danger">
                                                                                                        Phone is required.
                                                                                                    </small>
                                                                                                )}
                                                                                            </div>

                                                                                            <div className="col-12 mb-2">
                                                                                                <textarea
                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                    id="message"
                                                                                                    rows={3}
                                                                                                    placeholder="Message"
                                                                                                    {...register("message", {
                                                                                                        required: false,
                                                                                                    })}
                                                                                                ></textarea>
                                                                                                {errors.message && (
                                                                                                    <small className="text-danger">
                                                                                                        Message is required.
                                                                                                    </small>
                                                                                                )}
                                                                                            </div>
                                                                                            <input
                                                                                                type="hidden"
                                                                                                value="ContactForm"
                                                                                                {...register("formName", {
                                                                                                    required: false,
                                                                                                })}
                                                                                            />
                                                                                            <input
                                                                                                type="hidden"
                                                                                                value={currentPageURL}
                                                                                                {...register("page", {
                                                                                                    required: false,
                                                                                                })}
                                                                                            />
                                                                                            <div className="col-12 mb-2">
                                                                                                <div className="text-start">
                                                                                                    <button
                                                                                                        className="btn btn-primary px-5 text-uppercase rounded-0 btn-lg"
                                                                                                        type="submit"
                                                                                                    >
                                                                                                        Submit
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {isMobileDev && (
                                                                <>
                                                                    <div className="container">
                                                                        <div className="row justify-content-center">
                                                                            <div className="col-lg-6">
                                                                                <p className="wzdTitleBar">
                                                                                    <strong>
                                                                                        Let's get some details to help serve
                                                                                        you better!
                                                                                    </strong>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="container">
                                                                        <div className="row justify-content-center">
                                                                            <div className="col-lg-6">
                                                                                <div className="contactForm">
                                                                                    <form
                                                                                        onSubmit={handleSubmit(onSubmit)}
                                                                                    >
                                                                                        <div className="row">
                                                                                            <div className="col-12 mb-2">
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                    id="name"
                                                                                                    placeholder="Name"
                                                                                                    {...register("name", {
                                                                                                        required: true,
                                                                                                    })}
                                                                                                />
                                                                                                {errors.name && (
                                                                                                    <small className="text-danger">
                                                                                                        Name is required.
                                                                                                    </small>
                                                                                                )}
                                                                                            </div>

                                                                                            <div className="col-12 mb-2">
                                                                                                <input
                                                                                                    type="email"
                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                    id="email"
                                                                                                    placeholder="Email Address"
                                                                                                    {...register("email", {
                                                                                                        required: true,
                                                                                                    })}
                                                                                                />
                                                                                                {errors.email && (
                                                                                                    <small className="text-danger">
                                                                                                        Email is required.
                                                                                                    </small>
                                                                                                )}
                                                                                            </div>

                                                                                            <div className="col-12 mb-2">
                                                                                                <Controller
                                                                                                    name="phone"
                                                                                                    control={control}
                                                                                                    rules={{ required: true }}
                                                                                                    render={({
                                                                                                        field: { onChange, value },
                                                                                                    }) => (
                                                                                                        <PhoneInput
                                                                                                            international
                                                                                                            countryCallingCodeEditable={
                                                                                                                false
                                                                                                            }
                                                                                                            className="form-control rounded-0 fs-14 d-flex"
                                                                                                            defaultCountry="AE"
                                                                                                            placeholder="Enter Phone Number"
                                                                                                            value={value}
                                                                                                            onChange={onChange}
                                                                                                            style={{ border: "0px" }}
                                                                                                        />
                                                                                                    )}
                                                                                                />

                                                                                                {errors.phone && (
                                                                                                    <small className="text-danger">
                                                                                                        Phone is required.
                                                                                                    </small>
                                                                                                )}
                                                                                            </div>

                                                                                            <div className="col-12 mb-2">
                                                                                                <textarea
                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                    id="message"
                                                                                                    rows={3}
                                                                                                    placeholder="Message"
                                                                                                    {...register("message", {
                                                                                                        required: false,
                                                                                                    })}
                                                                                                ></textarea>
                                                                                                {errors.message && (
                                                                                                    <small className="text-danger">
                                                                                                        Message is required.
                                                                                                    </small>
                                                                                                )}
                                                                                            </div>
                                                                                            <input
                                                                                                type="hidden"
                                                                                                value="ContactForm"
                                                                                                {...register("formName", {
                                                                                                    required: false,
                                                                                                })}
                                                                                            />
                                                                                            <input
                                                                                                type="hidden"
                                                                                                value={currentPageURL}
                                                                                                {...register("page", {
                                                                                                    required: false,
                                                                                                })}
                                                                                            />
                                                                                            <div className="col-12 mb-2">
                                                                                                <div className="text-start">
                                                                                                    <button
                                                                                                        className="btn btn-primary px-5 text-uppercase rounded-0 btn-lg"
                                                                                                        type="submit"
                                                                                                    >
                                                                                                        Submit
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                        {step === 4 &&
                                            step1Ans === "new_purchase" &&
                                            [
                                                "just_browersing_the_market",
                                                "started_looking_around",
                                                "found_dream_home",
                                            ].includes(step2Ans) &&
                                            ["undecided"].includes(step3Ans) && (
                                                <>
                                                    <div
                                                        className={`"row ${isMobileDev ? "nospace-row" : ""
                                                            }`}
                                                    >
                                                        <div className="form-group col-md-12">
                                                            {!isMobileDev && (
                                                                <>
                                                                    <div
                                                                        className={`"row ${isMobileDev ? "nospace-row" : ""
                                                                            }`}
                                                                    >
                                                                        <div className="form-group col-md-12 text-center">
                                                                            {!isMobileDev && (
                                                                                <>
                                                                                    <div className="container">
                                                                                        <div className="row justify-content-center">
                                                                                            <div className="col-lg-6">
                                                                                                <p className="wzdTitleBar">
                                                                                                    <strong>
                                                                                                        Let's get some details to
                                                                                                        help serve you better!
                                                                                                    </strong>
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="container">
                                                                                        <div className="row justify-content-center">
                                                                                            <div className="col-lg-6">
                                                                                                <div className="contactForm">
                                                                                                    <form
                                                                                                        onSubmit={handleSubmit(
                                                                                                            onSubmit
                                                                                                        )}
                                                                                                    >
                                                                                                        <div className="row">
                                                                                                            <div className="col-12 mb-2">
                                                                                                                <input
                                                                                                                    type="text"
                                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                                    id="name"
                                                                                                                    placeholder="Name"
                                                                                                                    {...register("name", {
                                                                                                                        required: true,
                                                                                                                    })}
                                                                                                                />
                                                                                                                {errors.name && (
                                                                                                                    <small className="text-danger">
                                                                                                                        Name is required.
                                                                                                                    </small>
                                                                                                                )}
                                                                                                            </div>

                                                                                                            <div className="col-12 mb-2">
                                                                                                                <input
                                                                                                                    type="email"
                                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                                    id="email"
                                                                                                                    placeholder="Email Address"
                                                                                                                    {...register(
                                                                                                                        "email",
                                                                                                                        {
                                                                                                                            required: true,
                                                                                                                        }
                                                                                                                    )}
                                                                                                                />
                                                                                                                {errors.email && (
                                                                                                                    <small className="text-danger">
                                                                                                                        Email is required.
                                                                                                                    </small>
                                                                                                                )}
                                                                                                            </div>

                                                                                                            <div className="col-12 mb-2">
                                                                                                                <Controller
                                                                                                                    name="phone"
                                                                                                                    control={control}
                                                                                                                    rules={{
                                                                                                                        required: true,
                                                                                                                    }}
                                                                                                                    render={({
                                                                                                                        field: {
                                                                                                                            onChange,
                                                                                                                            value,
                                                                                                                        },
                                                                                                                    }) => (
                                                                                                                        <PhoneInput
                                                                                                                            international
                                                                                                                            countryCallingCodeEditable={
                                                                                                                                false
                                                                                                                            }
                                                                                                                            className="form-control rounded-0 fs-14 d-flex"
                                                                                                                            defaultCountry="AE"
                                                                                                                            placeholder="Enter Phone Number"
                                                                                                                            value={value}
                                                                                                                            onChange={
                                                                                                                                onChange
                                                                                                                            }
                                                                                                                            style={{
                                                                                                                                border: "0px",
                                                                                                                            }}
                                                                                                                        />
                                                                                                                    )}
                                                                                                                />

                                                                                                                {errors.phone && (
                                                                                                                    <small className="text-danger">
                                                                                                                        Phone is required.
                                                                                                                    </small>
                                                                                                                )}
                                                                                                            </div>

                                                                                                            <div className="col-12 mb-2">
                                                                                                                <textarea
                                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                                    id="message"
                                                                                                                    rows={3}
                                                                                                                    placeholder="Message"
                                                                                                                    {...register(
                                                                                                                        "message",
                                                                                                                        {
                                                                                                                            required: false,
                                                                                                                        }
                                                                                                                    )}
                                                                                                                ></textarea>
                                                                                                                {errors.message && (
                                                                                                                    <small className="text-danger">
                                                                                                                        Message is required.
                                                                                                                    </small>
                                                                                                                )}
                                                                                                            </div>
                                                                                                            <input
                                                                                                                type="hidden"
                                                                                                                value="ContactForm"
                                                                                                                {...register(
                                                                                                                    "formName",
                                                                                                                    {
                                                                                                                        required: false,
                                                                                                                    }
                                                                                                                )}
                                                                                                            />
                                                                                                            <input
                                                                                                                type="hidden"
                                                                                                                value={currentPageURL}
                                                                                                                {...register("page", {
                                                                                                                    required: false,
                                                                                                                })}
                                                                                                            />
                                                                                                            <div className="col-12 mb-2">
                                                                                                                <div className="text-start">
                                                                                                                    <button
                                                                                                                        className="btn btn-primary px-5 text-uppercase rounded-0 btn-lg"
                                                                                                                        type="submit"
                                                                                                                    >
                                                                                                                        Submit
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </form>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            )}

                                                                            {isMobileDev && (
                                                                                <>
                                                                                    <div className="container">
                                                                                        <div className="row justify-content-center">
                                                                                            <div className="col-lg-6">
                                                                                                <p className="wzdTitleBar">
                                                                                                    <strong>
                                                                                                        Let's get some details to
                                                                                                        help serve you better!
                                                                                                    </strong>
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="container">
                                                                                        <div className="row justify-content-center">
                                                                                            <div className="col-lg-6">
                                                                                                <div className="contactForm">
                                                                                                    <form
                                                                                                        onSubmit={handleSubmit(
                                                                                                            onSubmit
                                                                                                        )}
                                                                                                    >
                                                                                                        <div className="row">
                                                                                                            <div className="col-12 mb-2">
                                                                                                                <input
                                                                                                                    type="text"
                                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                                    id="name"
                                                                                                                    placeholder="Name"
                                                                                                                    {...register("name", {
                                                                                                                        required: true,
                                                                                                                    })}
                                                                                                                />
                                                                                                                {errors.name && (
                                                                                                                    <small className="text-danger">
                                                                                                                        Name is required.
                                                                                                                    </small>
                                                                                                                )}
                                                                                                            </div>

                                                                                                            <div className="col-12 mb-2">
                                                                                                                <input
                                                                                                                    type="email"
                                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                                    id="email"
                                                                                                                    placeholder="Email Address"
                                                                                                                    {...register(
                                                                                                                        "email",
                                                                                                                        {
                                                                                                                            required: true,
                                                                                                                        }
                                                                                                                    )}
                                                                                                                />
                                                                                                                {errors.email && (
                                                                                                                    <small className="text-danger">
                                                                                                                        Email is required.
                                                                                                                    </small>
                                                                                                                )}
                                                                                                            </div>

                                                                                                            <div className="col-12 mb-2">
                                                                                                                <Controller
                                                                                                                    name="phone"
                                                                                                                    control={control}
                                                                                                                    rules={{
                                                                                                                        required: true,
                                                                                                                    }}
                                                                                                                    render={({
                                                                                                                        field: {
                                                                                                                            onChange,
                                                                                                                            value,
                                                                                                                        },
                                                                                                                    }) => (
                                                                                                                        <PhoneInput
                                                                                                                            international
                                                                                                                            countryCallingCodeEditable={
                                                                                                                                false
                                                                                                                            }
                                                                                                                            className="form-control rounded-0 fs-14 d-flex"
                                                                                                                            defaultCountry="AE"
                                                                                                                            placeholder="Enter Phone Number"
                                                                                                                            value={value}
                                                                                                                            onChange={
                                                                                                                                onChange
                                                                                                                            }
                                                                                                                            style={{
                                                                                                                                border: "0px",
                                                                                                                            }}
                                                                                                                        />
                                                                                                                    )}
                                                                                                                />

                                                                                                                {errors.phone && (
                                                                                                                    <small className="text-danger">
                                                                                                                        Phone is required.
                                                                                                                    </small>
                                                                                                                )}
                                                                                                            </div>

                                                                                                            <div className="col-12 mb-2">
                                                                                                                <textarea
                                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                                    id="message"
                                                                                                                    rows={3}
                                                                                                                    placeholder="Message"
                                                                                                                    {...register(
                                                                                                                        "message",
                                                                                                                        {
                                                                                                                            required: false,
                                                                                                                        }
                                                                                                                    )}
                                                                                                                ></textarea>
                                                                                                                {errors.message && (
                                                                                                                    <small className="text-danger">
                                                                                                                        Message is required.
                                                                                                                    </small>
                                                                                                                )}
                                                                                                            </div>
                                                                                                            <input
                                                                                                                type="hidden"
                                                                                                                value="ContactForm"
                                                                                                                {...register(
                                                                                                                    "formName",
                                                                                                                    {
                                                                                                                        required: false,
                                                                                                                    }
                                                                                                                )}
                                                                                                            />
                                                                                                            <input
                                                                                                                type="hidden"
                                                                                                                value={currentPageURL}
                                                                                                                {...register("page", {
                                                                                                                    required: false,
                                                                                                                })}
                                                                                                            />
                                                                                                            <div className="col-12 mb-2">
                                                                                                                <div className="text-start">
                                                                                                                    <button
                                                                                                                        className="btn btn-primary px-5 text-uppercase rounded-0 btn-lg"
                                                                                                                        type="submit"
                                                                                                                    >
                                                                                                                        Submit
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </form>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {isMobileDev && (
                                                                <>
                                                                    <div
                                                                        className={`"row ${isMobileDev ? "nospace-row" : ""
                                                                            }`}
                                                                    >
                                                                        <div className="form-group col-md-12 text-center">
                                                                            {!isMobileDev && (
                                                                                <>
                                                                                    <div className="container">
                                                                                        <div className="row justify-content-center">
                                                                                            <div className="col-lg-6">
                                                                                                <p className="wzdTitleBar">
                                                                                                    <strong>
                                                                                                        Let's get some details to
                                                                                                        help serve you better!
                                                                                                    </strong>
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="container">
                                                                                        <div className="row justify-content-center">
                                                                                            <div className="col-lg-6">
                                                                                                <div className="contactForm">
                                                                                                    <form
                                                                                                        onSubmit={handleSubmit(
                                                                                                            onSubmit
                                                                                                        )}
                                                                                                    >
                                                                                                        <div className="row">
                                                                                                            <div className="col-12 mb-2">
                                                                                                                <input
                                                                                                                    type="text"
                                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                                    id="name"
                                                                                                                    placeholder="Name"
                                                                                                                    {...register("name", {
                                                                                                                        required: true,
                                                                                                                    })}
                                                                                                                />
                                                                                                                {errors.name && (
                                                                                                                    <small className="text-danger">
                                                                                                                        Name is required.
                                                                                                                    </small>
                                                                                                                )}
                                                                                                            </div>

                                                                                                            <div className="col-12 mb-2">
                                                                                                                <input
                                                                                                                    type="email"
                                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                                    id="email"
                                                                                                                    placeholder="Email Address"
                                                                                                                    {...register(
                                                                                                                        "email",
                                                                                                                        {
                                                                                                                            required: true,
                                                                                                                        }
                                                                                                                    )}
                                                                                                                />
                                                                                                                {errors.email && (
                                                                                                                    <small className="text-danger">
                                                                                                                        Email is required.
                                                                                                                    </small>
                                                                                                                )}
                                                                                                            </div>

                                                                                                            <div className="col-12 mb-2">
                                                                                                                <Controller
                                                                                                                    name="phone"
                                                                                                                    control={control}
                                                                                                                    rules={{
                                                                                                                        required: true,
                                                                                                                    }}
                                                                                                                    render={({
                                                                                                                        field: {
                                                                                                                            onChange,
                                                                                                                            value,
                                                                                                                        },
                                                                                                                    }) => (
                                                                                                                        <PhoneInput
                                                                                                                            international
                                                                                                                            countryCallingCodeEditable={
                                                                                                                                false
                                                                                                                            }
                                                                                                                            className="form-control rounded-0 fs-14 d-flex"
                                                                                                                            defaultCountry="AE"
                                                                                                                            placeholder="Enter Phone Number"
                                                                                                                            value={value}
                                                                                                                            onChange={
                                                                                                                                onChange
                                                                                                                            }
                                                                                                                            style={{
                                                                                                                                border: "0px",
                                                                                                                            }}
                                                                                                                        />
                                                                                                                    )}
                                                                                                                />

                                                                                                                {errors.phone && (
                                                                                                                    <small className="text-danger">
                                                                                                                        Phone is required.
                                                                                                                    </small>
                                                                                                                )}
                                                                                                            </div>

                                                                                                            <div className="col-12 mb-2">
                                                                                                                <textarea
                                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                                    id="message"
                                                                                                                    rows={3}
                                                                                                                    placeholder="Message"
                                                                                                                    {...register(
                                                                                                                        "message",
                                                                                                                        {
                                                                                                                            required: false,
                                                                                                                        }
                                                                                                                    )}
                                                                                                                ></textarea>
                                                                                                                {errors.message && (
                                                                                                                    <small className="text-danger">
                                                                                                                        Message is required.
                                                                                                                    </small>
                                                                                                                )}
                                                                                                            </div>
                                                                                                            <input
                                                                                                                type="hidden"
                                                                                                                value="ContactForm"
                                                                                                                {...register(
                                                                                                                    "formName",
                                                                                                                    {
                                                                                                                        required: false,
                                                                                                                    }
                                                                                                                )}
                                                                                                            />
                                                                                                            <input
                                                                                                                type="hidden"
                                                                                                                value={currentPageURL}
                                                                                                                {...register("page", {
                                                                                                                    required: false,
                                                                                                                })}
                                                                                                            />
                                                                                                            <div className="col-12 mb-2">
                                                                                                                <div className="text-start">
                                                                                                                    <button
                                                                                                                        className="btn btn-primary px-5 text-uppercase rounded-0 btn-lg"
                                                                                                                        type="submit"
                                                                                                                    >
                                                                                                                        Submit
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </form>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            )}

                                                                            {isMobileDev && (
                                                                                <>
                                                                                    <div className="container">
                                                                                        <div className="row justify-content-center">
                                                                                            <div className="col-lg-6">
                                                                                                <p className="wzdTitleBar">
                                                                                                    <strong>
                                                                                                        Let's get some details to
                                                                                                        help serve you better!
                                                                                                    </strong>
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="container">
                                                                                        <div className="row justify-content-center">
                                                                                            <div className="col-lg-6">
                                                                                                <div className="contactForm">
                                                                                                    <form
                                                                                                        onSubmit={handleSubmit(
                                                                                                            onSubmit
                                                                                                        )}
                                                                                                    >
                                                                                                        <div className="row">
                                                                                                            <div className="col-12 mb-2">
                                                                                                                <input
                                                                                                                    type="text"
                                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                                    id="name"
                                                                                                                    placeholder="Name"
                                                                                                                    {...register("name", {
                                                                                                                        required: true,
                                                                                                                    })}
                                                                                                                />
                                                                                                                {errors.name && (
                                                                                                                    <small className="text-danger">
                                                                                                                        Name is required.
                                                                                                                    </small>
                                                                                                                )}
                                                                                                            </div>

                                                                                                            <div className="col-12 mb-2">
                                                                                                                <input
                                                                                                                    type="email"
                                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                                    id="email"
                                                                                                                    placeholder="Email Address"
                                                                                                                    {...register(
                                                                                                                        "email",
                                                                                                                        {
                                                                                                                            required: true,
                                                                                                                        }
                                                                                                                    )}
                                                                                                                />
                                                                                                                {errors.email && (
                                                                                                                    <small className="text-danger">
                                                                                                                        Email is required.
                                                                                                                    </small>
                                                                                                                )}
                                                                                                            </div>

                                                                                                            <div className="col-12 mb-2">
                                                                                                                <Controller
                                                                                                                    name="phone"
                                                                                                                    control={control}
                                                                                                                    rules={{
                                                                                                                        required: true,
                                                                                                                    }}
                                                                                                                    render={({
                                                                                                                        field: {
                                                                                                                            onChange,
                                                                                                                            value,
                                                                                                                        },
                                                                                                                    }) => (
                                                                                                                        <PhoneInput
                                                                                                                            international
                                                                                                                            countryCallingCodeEditable={
                                                                                                                                false
                                                                                                                            }
                                                                                                                            className="form-control rounded-0 fs-14 d-flex"
                                                                                                                            defaultCountry="AE"
                                                                                                                            placeholder="Enter Phone Number"
                                                                                                                            value={value}
                                                                                                                            onChange={
                                                                                                                                onChange
                                                                                                                            }
                                                                                                                            style={{
                                                                                                                                border: "0px",
                                                                                                                            }}
                                                                                                                        />
                                                                                                                    )}
                                                                                                                />

                                                                                                                {errors.phone && (
                                                                                                                    <small className="text-danger">
                                                                                                                        Phone is required.
                                                                                                                    </small>
                                                                                                                )}
                                                                                                            </div>

                                                                                                            <div className="col-12 mb-2">
                                                                                                                <textarea
                                                                                                                    className="form-control rounded-0 fs-14"
                                                                                                                    id="message"
                                                                                                                    rows={3}
                                                                                                                    placeholder="Message"
                                                                                                                    {...register(
                                                                                                                        "message",
                                                                                                                        {
                                                                                                                            required: false,
                                                                                                                        }
                                                                                                                    )}
                                                                                                                ></textarea>
                                                                                                                {errors.message && (
                                                                                                                    <small className="text-danger">
                                                                                                                        Message is required.
                                                                                                                    </small>
                                                                                                                )}
                                                                                                            </div>
                                                                                                            <input
                                                                                                                type="hidden"
                                                                                                                value="ContactForm"
                                                                                                                {...register(
                                                                                                                    "formName",
                                                                                                                    {
                                                                                                                        required: false,
                                                                                                                    }
                                                                                                                )}
                                                                                                            />
                                                                                                            <input
                                                                                                                type="hidden"
                                                                                                                value={currentPageURL}
                                                                                                                {...register("page", {
                                                                                                                    required: false,
                                                                                                                })}
                                                                                                            />
                                                                                                            <div className="col-12 mb-2">
                                                                                                                <div className="text-start">
                                                                                                                    <button
                                                                                                                        className="btn btn-primary px-5 text-uppercase rounded-0 btn-lg"
                                                                                                                        type="submit"
                                                                                                                    >
                                                                                                                        Submit
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </form>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                        {step == 2 && step1Ans == 2 && (
                                            <>
                                                <div
                                                    className={`"row ${isMobileDev ? "nospace-row" : ""}`}
                                                >
                                                    <div className="col-md-12">
                                                        <p className="wzdTitleBar">
                                                            <strong>What are you looking for2</strong>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`"row ${isMobileDev ? "nospace-row" : ""}`}
                                                >
                                                    <div className="form-group col-md-12">
                                                        {!isMobileDev && (
                                                            <>
                                                                <div className="mortage-custom-checkbox d-flex justify-content-center mt-3">
                                                                    <div className="col-md-6">
                                                                        <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                            <input
                                                                                id="yes"
                                                                                type="radio"
                                                                                name="insideUAE"
                                                                                required
                                                                                value="1"
                                                                                ref={inputRef}
                                                                            />
                                                                            <label
                                                                                className="d-flex flex-row align-items-center"
                                                                                htmlFor="yes"
                                                                            >
                                                                                <span className="px-2">
                                                                                    {" "}
                                                                                    New Purchase
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="answers-options-container d-flex align-items-center justify-content-center flex-row mx-3">
                                                                            <input
                                                                                id="no"
                                                                                type="radio"
                                                                                name="insideUAE"
                                                                                required
                                                                                value="0"
                                                                            />
                                                                            <label
                                                                                className="d-flex flex-row align-items-center"
                                                                                htmlFor="no"
                                                                            >
                                                                                <span className="px-2">
                                                                                    {" "}
                                                                                    Mortgage Refinances
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}

                                                        {isMobileDev && (
                                                            <>
                                                                <div className="mortage-custom-checkbox  ">
                                                                    <div className="col-md-12 my-3">
                                                                        <div className="answers-options-container d-flex justify-content-center  mx-3">
                                                                            <input
                                                                                id="yes"
                                                                                type="radio"
                                                                                name="insideUAE"
                                                                                required
                                                                                value="1"
                                                                            />
                                                                            <label
                                                                                className="d-flex flex-row align-items-center"
                                                                                htmlFor="yes"
                                                                            >
                                                                                <span className="px-2">
                                                                                    {" "}
                                                                                    New Purchase
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-12 my-3">
                                                                        <div className="answers-options-container d-flex  justify-content-center  mx-3">
                                                                            <input
                                                                                id="no"
                                                                                type="radio"
                                                                                name="insideUAE"
                                                                                required
                                                                                value="0"
                                                                            />
                                                                            <label
                                                                                className="d-flex flex-row align-items-center"
                                                                                htmlFor="no"
                                                                            >
                                                                                <span className="px-2">
                                                                                    {" "}
                                                                                    Mortgage Refinances
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="aboutPgSection">
                <div className="container">
                    {/* <h4 className="sctionMdTitle text-primary uppercase-text ">
            My Mortgage{" "}
          </h4> */}
                    <div className="row">
                        <div className="col-md-3 text-center">
                            <img loading="lazy"
                                src="images/mortage_logo.png"
                                alt="My Mortgage"
                                className="img-fluid py-2"
                                width={150}
                            />
                        </div>
                        <div className="col-md-9">
                            <p className="fs-14 text-secondary mb-4">
                                Founded in 2019, the mortgage wing of Range International Property
                                Investments has grown to become a trusted name in the UAE property
                                market. Over the last few years, we have helped hundreds of
                                clients secure financing for their homes and we are proud to have
                                built a reputation of honesty, integrity and professionalism. We
                                understand that buying a home can be a complex and overwhelming
                                experience, which is why we are committed to providing
                                personalised solutions and exceptional customer service every step
                                of the way.
                                <br />
                                <br />
                                {/* We offer a wide range of services, including new mortgages,
              refinancing, handover payments, equity, non-resident mortgages and
              commercial mortgages. Our team will work with you to determine the
              best financing option as per your requirements and will guide you
              through the entire process from pre-approval to disbursal. */}
                            </p>
                        </div>


                    </div>

                </div>
            </section>
        </>
    );
}
export default MortgagePage;
