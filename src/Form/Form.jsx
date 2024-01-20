import { useState } from "react";
import { List } from "../DataStatic/ListName";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [selectName, setSelectName] = useState(
    List.sort((a, b) => a.group - b.group)
  );
  const [Name, setName] = useState([]);
  const navigate = useNavigate();

  const handleClick = (nilai, color, strong) => {
    Name.push({ nilai: nilai, color: color, strong: strong });

    let x = [];
    selectName.map((value) => {
      if (value.nilai === nilai) {
        x.push({ name: value.name, nilai: value.nilai, status: true });
      } else {
        x.push({ name: value.name, nilai: value.nilai, status: value.status });
      }
    });
    setSelectName(x);
  };

  const handleSubmit = () => {
    navigate("/result", {
      state: Name,
    });
  };

  return (
    <div className="p-2 h-screen bg-amber-100 overflow-y-scroll">
      <h1 className="text-center text-2xl font-semibold">List ST-30</h1>
      <p className="text-center text-sm mb-5">
        Silahkan pilih domain warna pada setiap item list.
      </p>
      {selectName.map((value) => (
        <div key={value.name}>
          {!value.status && (
            <div className="flex justify-between p-2 my-2 border-b-2 border-amber-700">
              <div>
                <h1 className=" font-semibold">{value.name}</h1>
              </div>
              <div className="flex justify-around">
                <button
                  className="bg-red-600 w-8 h-8 rounded-lg mx-5"
                  onClick={() => handleClick(value.nilai, "red-600", "Strong")}
                ></button>
                <button
                  className="bg-yellow-500 w-8 h-8 rounded-lg mx-5"
                  onClick={() =>
                    handleClick(value.nilai, "yellow-500", "Middle-Strong")
                  }
                ></button>
                <button
                  className="bg-black w-8 h-8 rounded-lg mx-5"
                  onClick={() => handleClick(value.nilai, "black", "Weak")}
                ></button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-center">
        <div
          className="w-2/4 my-5 bg-amber-400 rounded-xl p-4 text-center font-semibold text-xl border-white border-2"
          onClick={handleSubmit}
        >
          Submit
        </div>
      </div>
    </div>
  );
};
export default Form;
