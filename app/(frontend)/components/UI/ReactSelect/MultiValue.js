import { components } from "react-select";
import MoreSelectedBadge from "./MoreSelectedBadge";

const MultiValue = ({ index, getValue, children, ...props }) => {
    const maxToShow = 1;
    const overflow = getValue()
        .slice(maxToShow)
        .map((x) => x.name);
    return index < maxToShow ? (
        <components.MultiValue {...props}>
            <span title={children}>{children}</span>
        </components.MultiValue>
    ) : index === maxToShow ? (
        <MoreSelectedBadge items={overflow} />
    ) : null;
};

export default MultiValue;
