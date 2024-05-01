import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumber] = useState(false);
  const [charaterAllowed, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charaterAllowed) str += "!@#$%^&*(){}?[]`~";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charaterAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charaterAllowed, passwordGenerator]);

  const copyPassword = useCallback(() => {
    // console.log("click");
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="main h-screen w-screen bg-gray-950  flex flex-col items-center justify-center text-white">
        <h1
          className="text-3xl text-center
        "
        >
          Password Generator
        </h1>
        <div className="innerBody py-7 w-[500px] h-40 p-3 my-4 rounded-xl bg-gray-900">
          <input
            type="text"
            value={password}
            name=""
            className="text-black py-1 mx-3 rounded-sm w-80"
            readOnly
            ref={passRef}
          />
          <button
            onClick={copyPassword}
            className="bg-blue-600 hover:bg-blue-400 px-3 py-1 rounded-md"
          >
            Copy
          </button>
          <br />
          <br />
          <div className="flex justify-between items-center">
            <div className="px-2 flex justify-center items-center">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="range accent-orange-700"
                name=""
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="" className="px-1 text-orange-600">
                Length({length})
              </label>
            </div>
            <div lassName="px-2 flex justify-center items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-orange-600 bg-orange-600 border-orange-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2"
                name=""
                defaultChecked={numberAllowed}
                onChange={() => setNumber((prev) => !prev)}
              />
              <label htmlFor="" className="px-2 text-orange-600">
                Numbers
              </label>
            </div>
            <div lassName="px-2 flex justify-center items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="w-4 h-4 text-orange-600 bg-orange-600 border-orange-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2"
                defaultChecked={charaterAllowed}
                onChange={() => setCharacter((prev) => !prev)}
              />
              <label htmlFor=" " className="px-2 text-orange-600">
                Charaters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
