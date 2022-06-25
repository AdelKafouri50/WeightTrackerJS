function index() {
  const weightRef = React.useRef();
  const macrosRef = React.useRef();
  const foodsRef = React.useRef();
  const dateRef = React.useRef();

  const handleSubmit = async (e) => {
    const weight = weightRef.current.value;
    const macros = macrosRef.current.value;
    const foods = foodsRef.current.value;
    const date = dateRef.current.value;
    const data = { weight, macros, foods, date };
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

  return (
    <div className="container flex-col flex justify-center items-center text-center mx-auto h-screen font-anek">
      <div className="mb-4 text-xl">Add a New Entry</div>
      <div className="border border-gray-500 py-10 px-10 rounded-md w-1/3">
        <label htmlFor="">
          <h1 className="text-xl text-left mb-2">Weight: </h1>
          <input
            type="number"
            className="border border-gray-500 rounded-md mb-2 p-2 w-full"
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
            className="border border-gray-500 rounded-md mb-2 p-2 w-full"
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
            className="border border-gray-500 rounded-md mb-2 p-2 w-full"
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
            className="border border-gray-500 rounded-md mb-2 p-2 w-full"
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
            className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded w-full mt-2"
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
  )
}

export default index