import { ChevronLeft, Cog, Mail } from "lucide-react";
import { useLocation } from 'react-router-dom';
import useResendVerification from "../../hook/Api/auth/useResendVerification";

export default function Verify() {
  
  const location = useLocation();
  const getEmail = new URLSearchParams(location.search).get("email");

  const { onResendVerify } = useResendVerification();

  const onSubmit = async () => {
    await onResendVerify({ email: getEmail || "" })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0A012E]">
      <header className="p-6">
        <div className="flex items-center space-x-2 text-xl font-semibold">
          <span className="text-[#7260E6]">Izy Task</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 bg-[#05051F]">
        <div className="w-full max-w-md space-y-8">
          {/* Illustration */}
          <div className="relative w-64 h-64 mx-auto">
            <div className="absolute inset-0 bg-[#6956E5] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Browser Window */}
                <div className="absolute -top-12 -left-20 w-16 h-12 bg-white rounded-lg shadow-md border border-gray-200" />
                {/* Gears */}
                <div className="absolute -top-16 right-0">
                  <Cog className="w-8 h-8 text-gray-300" />
                </div>
                <div className="absolute -top-8 -right-8">
                  <Cog className="w-6 h-6 text-gray-300" />
                </div>
                {/* Email Icon */}
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                  <Mail className="w-12 h-12 text-blue-500" />
                </div>
                {/* Check Mark */}
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <h1 className="text-2x1 font-semibold text-[#6956E5]">
              Welcome to izytask ╰(°▽°)╯
            </h1>
            <p className="text-gray-600">
              Please check your email inbox and click on the provided link to
              verify your account. If you don&apos;t receive email,{" "}
            </p>
            <button onClick={onSubmit} className="text-blue-600 hover:text-blue-700">
              click here to resend
            </button>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <a
              href="/login"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Login
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-600">
        <div>
          <a className="hover:text-[#6956E5]" href="https://github.com/carp-calangthang">Carpthecalangthang</a> |{" "}
          <a className="hover:text-[#6956E5]" href="https://github.com/hxann">xann</a>
        </div>
      </footer>
    </div>
  );
}
