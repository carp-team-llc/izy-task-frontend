import { useState, type CSSProperties } from "react";

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
    <div className="login-page" style={styles.loginPage}>
      <div style={styles.imageContainer}>
        <img src="./assets/Image/a.png" style={styles.image} />
      </div>
      <div style={styles.formContainer}>
        <form className="login-form" style={styles.form}>
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

const styles: { [key: string]: CSSProperties } = {
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

export default App;
