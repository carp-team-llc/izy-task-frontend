import { useState,  } from "react";


interface InputValue {
  email: string;
  password: string;
}

const App = () => {
  const [input, setInput] = useState<InputValue>({
    email: "",
    password: "",
  });

  const handleChangeInput = (value: string, keyInput: string) => {
    setInput((prev) => ({
      ...prev,
      [keyInput]: value,
    }));
  };

  return (
   
    <div className="login-page  " >
      <div >
        <img src="./assets/Image/a.png"  />
      </div>
      <div>
        <form className=" login-page flex flex-col justify-center items-center w-[400px] h-[650px] bg-black rounded-[20px] relative " >
          <div>
            <label>Email:</label>
            <input
              value={input?.email}
              onChange={(event) =>
                handleChangeInput(event.target.value, "email")
              }
              placeholder="Enter email"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              value={input?.password}
              onChange={(event) =>
                handleChangeInput(event.target.value, "password")
              }
              placeholder="Enter password"
            />
          </div>
        </form>
      </div>
    </div>
  );
};


export default App;
