import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCheckValidInfomation from "../../hook/Api/auth/useCheckValidInfo";

type CheckPrams = {
  email: string;
  token: string;
  resetPasswordCreatedAt: string;
  resetPasswordExpires: string;
};

const CheckInfomation = () => {
  const [checkForm, setCheckForm] = useState<CheckPrams>({
    email: "",
    token: "",
    resetPasswordCreatedAt: "",
    resetPasswordExpires: "",
  });
  const [isValid, setIsValid] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { onCheckValid } = useCheckValidInfomation();

  useEffect(() => {
    const email = new URLSearchParams(location.search).get("email") || "";
    const token = new URLSearchParams(location.search).get("token") || "";
    const resetPasswordCreatedAt =
      new URLSearchParams(location.search).get("createdAt") || "";
    const resetPasswordExpires =
      new URLSearchParams(location.search).get("expiresAt") || "";

    setCheckForm({
      email,
      token,
      resetPasswordCreatedAt,
      resetPasswordExpires,
    });
  }, [location]);

  useEffect(() => {
    if (
      checkForm.email &&
      checkForm.token &&
      checkForm.resetPasswordCreatedAt &&
      checkForm.resetPasswordExpires
    ) {
      onCheckValid(checkForm)
        .then(() => {
          navigate("/new-password", { state: { token: checkForm.token, email: checkForm.email } });
          setIsValid(true);
        })
        .catch((e: any) => {
          setIsValid(true);
          console.log("Error: ", e.message);
          navigate("/forgot-password")
        });
    }
  }, [checkForm, onCheckValid, navigate]);

  return (
    <div>
      <p>Check result: {isValid ? "Valid infomation" : "Invalid infomation"}</p>
    </div>
  );
};

export default CheckInfomation;