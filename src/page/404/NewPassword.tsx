import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { notifyError } from "../../component/toastify/Toastify";
import UseChangePassword from "../../hook/Api/auth/useChangePassword";

interface InputValue {
  password: string;
  rePassword: string;
}

interface SubmitForm {
  email: string;
  token: string;
  newPassword: string;
}

const NewPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [input, setInput] = useState<InputValue>({
    password: "",
    rePassword: "",
  });
  const [submitForm, setSubmitForm] = useState<SubmitForm>({
    email: "",
    token: "",
    newPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const { onChangePassword, isPending } = UseChangePassword();
  const { token, email } = location.state || {};

  useEffect(() => {
    setSubmitForm({
      email: email || "",
      token: token || "",
      newPassword: input.password,
    });
  }, [email, token, input.password]);

  const handleChangeInput = (value: string, field: keyof InputValue) => {
    setInput((prev) => {
      const updatedInput = { ...prev, [field]: value };
      if (field === "rePassword") {
        handleCheckPasswordMatch(updatedInput.password, value);
      }
      return updatedInput;
    });
  };

  const handleCheckPasswordMatch = (password: string, rePassword: string) => {
    if (password !== rePassword) {
      setError("Passwords do not match!");
    } else {
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.password || !input.rePassword) {
      notifyError("Please fill in the information completely!");
      return;
    }
    onChangePassword(submitForm);
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="../../../../public/a.png"
          alt="Coastal scene with lighthouse and sailboat"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 bg-[#0f172a] p-8 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto space-y-8">
          {/* Logo and welcome message */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
            </div>
            <h2 className="text-2xl font-bold text-white">Izy Task</h2>
            <p className="mt-2 text-gray-400">Nice to see you again</p>
          </div>

          {/* Login form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <h2 className="text-lg font-bold text-white mb-2">
                Set a new password.
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Your previous password has been reseted. Please set a new
                password for your account.
              </p>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400"
              >
                New password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isPending}
                  className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                  onChange={(event) =>
                    handleChangeInput(event.target.value, "password")
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="re-password"
                className="block text-sm font-medium text-gray-400"
              >
                Re-type password
              </label>
              <div className="mt-1 relative">
                <input
                  id="re-password"
                  name="rePassword"
                  type={showRePassword ? "text" : "password"}
                  required
                  disabled={isPending}
                  className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Re-enter your password"
                  onChange={(event) =>
                    handleChangeInput(event.target.value, "rePassword")
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowRePassword(!showRePassword)}
                >
                  {showRePassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>

            <div>
              <button
                type="submit"
                disabled={isPending}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isPending
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                }`}
              >
                {isPending ? "Submitting..." : "Set password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
