import React from "react";

const ErrorToast = ({ error }) => {
  return (
    <>
      <div>
        <p className="mb-1 fw-bolder">Error</p>
        {error.map((err, index) => {
          return <p key={index}>{err}</p>;
        })}
      </div>
    </>
  );
};

export default ErrorToast;
