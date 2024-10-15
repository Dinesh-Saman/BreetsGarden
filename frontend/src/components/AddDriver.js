import {  useState } from "react";

import "jspdf-autotable";

export default function ManageEmp() {
 
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
 

  const [validation, setValidation] = useState(null);  

  console.log();

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await fetch("/api/items/Dcreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        console.log("sussessfull");
        alert("suscessfull");
        
       
        navigate("");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

    
  const handleSChange = (e) => {
    const quantity = e.target.value.trim();
    const quantityPattern = /^[1-9]\d*$/; // Pattern for positive integers

    if (quantity === "") {
        setValidation(null);
    } else if (!quantityPattern.test(quantity)) {
        if (isNaN(quantity)) {
            setValidation("must be a number");
        } else {
            setValidation("must be a positive integer");
        }
    } else {
        setFormData({ ...formData, quantity });
        setValidation(null);
    }
};



//validation
const handleContactChange = (e) => {
  const Dcontactnumber = e.target.value.trim();

  // Pattern for a valid contact number (example: 10 digits)
  const contactPattern = /^\d{10}$/; // Adjust this pattern as needed for different formats

  if (Dcontactnumber === "") {
    setValidation(null);
  } else if (!contactPattern.test(Dcontactnumber)) {
    if (isNaN(Dcontactnumber)) {
      setValidation("Contact number must be a number");
    } else {
      setValidation("Contact number must be a valid 10-digit number");
    }
  } else {
    setFormData({ ...formData, Dcontactnumber });
    setValidation(null);
  }
};

 





  return (
    <div className="h-[600px] relative">
      <img src="https://images.pexels.com/photos/16376825/pexels-photo-16376825/free-photo-of-a-car-window-with-a-sunset-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-full   h-full object-cover" />

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div>
          <div className=" flex justify-center items-center">
            <div>
              <h1 className="text-4xl mt-2 font-serif opacity-90 uppercase text-white   ">
               Add Driver
              </h1>
            </div>
          </div>
          <div>
            <div className="flex justify-center mt-4 bg-slate-100 rounded-lg bg-opacity-10 h-[500px] w-[500px] items-center">
              <form className="flex flex-col mt-10  gap-4" onSubmit={handleSubmit}>
                <div className="flex justify-center items-center gap-28">
                  <div>
                  <div className="mt-4">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                        type="text"
                        placeholder="Name"
                        id="Dname"
                        onChange={handlchange}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                        type="text"
                        placeholder="Address"
                        id="Daddress"
                        onChange={handlchange}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        placeholder="Contact Number"
                        id="Dcontactnumber"
                        maxLength={10}
                        onChange={handleContactChange}
                      />
                        {validation && (
                    <p className="mt-0 text-red-600 h-0 text-sm     rounded-lg text-center ">
                      {validation}
                    </p>
                  )}
                    </div>
                    <div className="mt-5">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-xl w-[400px] h-10"
                        type="text"
                        placeholder="Nic"
                        id="dnic"
                        onChange={handlchange}
                      />
                      
                    </div>

                     
                    <div className="mt-6">
                     
                      <select
                        className="bg-slate-100 p-3 rounded-lg w-[400px] h-11 "
                        id="Gender"
                        onChange={handlchange}
                      >
                        <option value="">Select </option>
                       
                        <option value="Male">Male</option>
                        <option value="Femal">Femal</option>
                      
                      </select>
                    </div>

                    <div className="mt-4">
                      <input
                        className=" bg-slate-100 p-3 border-none rounded-lg w-[400px] h-10"
                        type="text"
                        placeholder="Age"
                        id="GAge"
                        onChange={handlchange}
                      />
                    </div>

                    <div className="mt-6">
                     
                      <select
                        className="bg-slate-100 p-3 rounded-lg w-[400px] h-11 "
                        id="languagesSpeak"
                        onChange={handlchange}
                      >
                        <option value="">Select </option>
                       
                        <option value="English">English</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Korean">Korean</option>
                        <option value="Tamil">Tamil</option>
                        <option value="sinhale">sinhale</option>
                        
                      
                      </select>
                    </div>

                    <div className="mt-6">
                     
                      <select
                        className="bg-slate-100 p-3 rounded-lg w-[400px] h-11 "
                        id="Exprince"
                        onChange={handlchange}
                      >
                        <option value="">Select </option>
                       
                        <option value="1 Year">1 Year</option>
                        <option value="2 Year">2 Year</option>
                        <option value="3 Year">3 Year</option>
                        <option value="4 Year">4 Year</option>
                        <option value="5 Year">5 Year</option>
                        <option value="6 Year">6 Year</option>
                      
                      </select>
                    </div>
                       
                    
                   




                    <div className="mt-4">
                      <button
                        className=" bg-[#db1304] uppercase hover:text-black font-serif text-white p-3 rounded-lg w-[400px] h-11 hover:opacity-90"
                        type="submit"
                      >
                        submit
                      </button>
                    </div>
                  </div>

                 
               
                </div>
              </form>
            </div>
          </div>
          <div className="flex">
            <div className=" mb-1 mt-4   "></div>
          </div>
        </div>

      
      </div>
    </div>
  );
}

