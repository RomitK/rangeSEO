import React from "react";
import classes from "./CustomSelectToggle.module.css";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href="/"
        className={`dt text-truncate form-control form-select ${classes.customDropdown}`}
        ref={ref}
        style={{ textDecoration: "none" }}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {/* Customize the dropdown icon here */}
        {children}
    </a>
));

export default CustomToggle;
