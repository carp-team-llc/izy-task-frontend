import { useState, type CSSProperties } from "react";

interface InputValue {
  username: string;
  email: string;
  phone: string;
  password: string;
}



const LoginPage = () => {
  const [input, setInput] = useState<InputValue>({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChangeInput = (value: string, keyInput: string) => {
    setInput((prev) => ({
      ...prev,
      [keyInput]: value,
    }));
  };

  return (
    <div className="login-page" style={styles.loginPage}>
      <div style={styles.imageContainer}>
        <img src="./assets/Image/login.png" style={styles.image} />
      </div>
      <div style={styles.formContainer}>
        <form className="login-form" style={styles.form}>
          <label>Username:</label>
          <input
            value={input?.username}
            onChange={(event) =>
              handleChangeInput(event.target.value, "username")
            }
            placeholder="Enter Username"
          />
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  loginPage: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  formContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
  },
  form: {
    width: "80%",
    padding: "20px",
    borderRadius: "8px",
  
  },
};

export default LoginPage;
