import React from "react";
import Header from "../components/header";
import { useUser } from "@auth0/nextjs-auth0";

export default function New({}) {

  const { user, isLoading, error } = useUser();
        
  const weightRef = React.useRef();
  const macrosRef = React.useRef();
  const foodsRef = React.useRef();
  const dateRef = React.useRef();

  const handleSubmit = async (e) => {
    if (user){
        const data = {
            weight: weightRef.current.value,
            macros: macrosRef.current.value,
            foods: foodsRef.current.value,
            date: dateRef.current.value,
            createdBy: user.email 
        };
        console.log('Datasent: ', data);
        const response = await fetch("/api/entries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await response.json();
        console.log(json);
        weightRef.current.value = "";
        macrosRef.current.value = "";
        foodsRef.current.value = "";
        dateRef.current.value = "";
        window.location.href = "/";
    }
  }



    if (isLoading) {
        return <p>Loading...</p>;
      }
    
      if (error){
        return(
          <div>
            <p>Please login</p>
          </div>
        )
        
      }

  return (
    <div className="bg-black flex flex-col items-center">
      <div className="w-3/4 flex justify-between">
        {user && (
            <Header user={user} isLoading={isLoading} />
        )}
      </div>
      <div className="container flex-col flex justify-center items-center text-center mx-auto h-screen font-anek text-rose-500">
        <div className="text-xl">Add a New Entry</div>
        <div className="border border-rose-500 mt-8 py-10 px-10 rounded-md w-1/3 flex flex-col gap-3">
          <label htmlFor="">
            <h1 className="text-xl text-left mb-2">Weight: </h1>
            <input
              type="number"
              className="border border-rose-500 text-rose-500 placeholder:text-rose-400 bg-black outline-black rounded-md mb-2 p-2 w-full"
              placeholder="Weight"
              name="weight"
              id="weight"
              onChange={(e) => {
                weightRef.current.value = e.target.value;
                }
              }
              ref={weightRef}
            />
          </label>
          <label htmlFor="">
            <h1 className="text-xl text-left mb-2">Macros: </h1>
            <input
              type="number"
              className="border border-rose-500 text-rose-500 placeholder:text-rose-400 bg-black outline-black rounded-md mb-2 p-2 w-full"
              placeholder="Macros"
              name="macros"
              id="macros"
              onChange={(e) => {
                macrosRef.current.value = e.target.value;
                }
              }
              ref={macrosRef}
            />
          </label>
          <label htmlFor="">
            <h1 className="text-xl text-left mb-2">Foods: </h1>
            <input
              type="number"
              className="border border-rose-500 text-rose-500 placeholder:text-rose-400 bg-black outline-black rounded-md mb-2 p-2 w-full"
              placeholder="Foods"
              name="foods"
              id="foods"
              onChange={(e) => {
                foodsRef.current.value = e.target.value;
                }
              }
              ref={foodsRef}
            />
          </label>
          <label htmlFor="">
            <h1 className="text-xl text-left mb-2">Date: </h1>
            <input
              type="date"
              className="border bg-black text-rose-400 placeholder:text-black border-rose-500 outline-black rounded-md mb-2 p-2 w-full"
              name="date"
              id="date"
              onChange={(e) => {
                dateRef.current.value = e.target.value;
                }
              }
              ref={dateRef}
            />
          </label>
          <div>
            <button
              className="bg-rose-500  hover:text-white text-black py-2 px-4 rounded w-full mt-4 transition-colors"
              onClick={() => {
                handleSubmit();
              }
              }
            >
              Submit
            </button>
            
          </div>
        </div>
      </div>
    </div>
  )
}
