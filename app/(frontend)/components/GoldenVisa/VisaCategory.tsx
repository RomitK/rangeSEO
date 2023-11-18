function VisaCategory({ visaCategory }) {
    return (
        <div className="col-md-3 ng-scope">
            <div className="dash-section">
                <div className="icondiv col-md-12">
                    <img src="/images/visas/VISA-Multi-Entry1.svg" />
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
                <div className="clearfix"></div>
            </div>
        </div>
    );
}

export default VisaCategory;
