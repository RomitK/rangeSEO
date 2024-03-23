import GoldenVisaModel from "../models/GoldenVisaModel";
function VisaCategory({ visaCategory }) {
    return (
        <>
            <div className="col-md-3 ng-scope">
                <div className="dash-section">
                    <div className="icondiv col-md-12">
                        <img loading="lazy" src="/images/visas/VISA-Multi-Entry1.svg" alt="visa" />
                    </div>
                    <div className="col-md-12">
                        <p style={{ minHeight: "50px" }} className="ng-binding">
                            {visaCategory.title}
                        </p>
                    </div>
                    <div className="col-md-12">
                        <p style={{ minHeight: "50px" }} className="ng-binding">
                            {visaCategory.description}
                        </p>

                    </div>
                    <div className="col-md-12 text-center">
                        <button
                            className="fillBtn  mrAuto cardBtn goldenVisa btn btn-primary rounded-0"
                            data-bs-toggle="modal"
                            data-bs-target="#enquireNow"
                        >
                            Click For More Info
                        </button>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
            <GoldenVisaModel></GoldenVisaModel>
        </>
    );
}

export default VisaCategory;