import { useState } from "react";

const Bottombar = (props) => {
    const [itemActive, setItemActive] = useState(0);

    function bottomBarItemClick(fragment, index) {
        props.callBack(index);
        setItemActive(index);
    }

    return (
        <>
            <div className="app col-12 col-sm-12 d-block d-sm-none">
                <div className="d-flex justify-content-center w-100">
                    <ul className="nav bottomMenu justify-content-around align-items-center" id="tabs" role="tablist">
                        <li className="nav-item">
                            <div
                                onClick={() => bottomBarItemClick("f0", 0)}
                                className={"btMenu bm1 " + (itemActive === 0 ? "active" : "")}
                            >
                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                <p>Map</p>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div
                                onClick={() => bottomBarItemClick("f1", 1)}
                                className={"btMenu bm2 " + (itemActive === 1 ? "active" : "")}
                            >
                                <i className="fa fa-list" aria-hidden="true"></i>
                                <p>List</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Bottombar;
