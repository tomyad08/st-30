import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [verif, setVerif] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (password === "edulab_asoy") {
      navigate("/form");
    } else {
      setVerif("Maap2 nih, passwordnya salah.");
    }
  };

  return (
    <div className="h-screen items-center flex justify-center bg-amber-400">
      <div className="w-3/4">
        {verif && (
          <p className="text-center p-2 bg-red-600 rounded-xl mb-5 font-semibold text-white">
            {verif}
          </p>
        )}
        <h1 className="text-xl font-semibold text-center mb-3">
          Please input your password!
        </h1>
        <input
          className="p-2 rounded-xl bg-white focus:outline-none w-full text-center"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center">
          <button
            className="w-2/4 bg-red-700 p-2 rounded-lg font-semibold text-white mt-4"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
