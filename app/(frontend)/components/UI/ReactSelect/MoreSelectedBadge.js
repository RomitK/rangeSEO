

const MoreSelectedBadge = ({ items }) => {
    const style = {
        background: "#d4eefa",
        borderRadius: "2px",
        fontSize: "85%",
        padding: "3px",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        whiteSpace: "nowrap",
    };
    const addStyle = {
        color: "gray",
        fontSize: "85%",
        whiteSpace: "nowrap",
    };
    const title = items.join(", ");
    const length = items.length;
    const label = `${length} more`;

    return (
        <div className="serchMoreBtn">
            <div style={style} title={title} > 
                {label}
            </div>
            <span>+ Add</span>
        </div>
    );
};

export default MoreSelectedBadge;
