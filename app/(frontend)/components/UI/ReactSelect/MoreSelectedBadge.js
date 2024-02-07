

const MoreSelectedBadge = ({ items }) => {

    const [isMobileDev, setIsMobileDev] = useState(false);
    useEffect(() => {
        const handleResize = () => {
        // Check if the window width is below a certain threshold (e.g., 768 pixels for mobile)
        const isMobileDevice = window.innerWidth < 768;
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
            {
                !isMobileDevice && (
                    <div style={addStyle}>+ Add</div>
                )
            }
            
        </div>
    );
};

export default MoreSelectedBadge;
