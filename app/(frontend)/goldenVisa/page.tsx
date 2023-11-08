"use client";
import { useState } from 'react'


function GoldenVisa() {
  const [data, setData] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "male",
    address: "",
})

const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
        ...data,
        [name]: value,
    });
};


const [activeTab, setActiveTab] = useState(0)

const formElements = [
   
]
    return (
      <>
      <section className="servicePageSec">
        <div className="container">
          <h4 className="sctionMdTitle text-primary text-center mb-4">
          Check Your Eligibility
          </h4>
        </div>
          <div className="card shadow-lg p-3 mb-5 bg-body rounded">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
      </section>    
      </>
    );
}
export default GoldenVisa;  