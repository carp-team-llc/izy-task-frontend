import { useState } from "react";
import useLogin from "./hook/Api/auth/useLogin";

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

  const { onLogin, data } = useLogin();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await onLogin(input); // Thực hiện gọi API login với thông tin từ form
      console.log("Login success", data); // Xử lý response sau khi đăng nhập thành công
    } catch (err) {
      console.error("Login failed:", err); // Xử lý lỗi nếu có
    }
  };

  return (
    <div className="login-page  ">
      <div>
        <img src="./assets/Image/a.png" />
      </div>
      <div>
        <form 
          className=" login-page flex flex-col justify-center items-center w-[400px] h-[650px] bg-red-500 rounded-[20px] relative "
          onSubmit={onSubmit}
        >
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
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
};

export default App;
