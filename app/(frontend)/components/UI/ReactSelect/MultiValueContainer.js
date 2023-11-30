import { components } from "react-select";
import classes from "./ReactSelect.module.css";

const MultiValueContainer = ({ children, ...props }) => (
    <components.MultiValueContainer {...props}>
        <div className={classes.multivalueContainer}>{children}</div>
    </components.MultiValueContainer>
);

export default MultiValueContainer;
