import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AccountVerified = () => {

  const { uuid } = useParams<{ uuid: string }>();
  const navigateTo = useNavigate();

    useEffect(() => {
        const storedUUID = sessionStorage.getItem('registrationUUID');
        if (storedUUID !== uuid) {
          navigateTo("/")
        }
    }, [uuid]);

  return (
    <div className="flex flex-col min-h-screen text-white bg-[#05051F]">
      <div className="flex flex-col justify-center items-center flex-1">
        <div className="bg-[#14142b] rounded-lg p-10 shadow-lg text-center">
          <div className="text-6xl text-[#43E97B] mb-5">✔️</div>
          <h1 className="text-3xl font-semibold text-[#7260E6] mb-5">Welcome to Izy Task</h1>
          <p className="text-lg mb-5">Hello</p>
          <p className="text-lg mb-5">You have registered an account at Izy Task, please check your email to verify your account!</p>
          <p className="text-lg mb-8">Have a great experience on our website.</p>
          <a
            href="/login"
            className="bg-[#7260E6] text-white py-2 px-6 rounded-lg transition duration-300 hover:bg-[#5b48c4]"
          >
            Go to Login
          </a>
        </div>
      </div>

      <footer className="bg-[#14142b] py-4 text-center shadow-md">
        <p className="text-sm">
          <a
            href="https://github.com/carp-calangthang"
            target="_blank"
            className="text-[#7260E6] hover:text-[#5b48c4] mx-2"
            rel="noreferrer"
          >
            @carpthecalangthang
          </a>
          |
          <a
            href="https://github.com/hxann"
            target="_blank"
            className="text-[#7260E6] hover:text-[#5b48c4] mx-2"
            rel="noreferrer"
          >
            @Hxann
          </a>
        </p>
      </footer>
    </div>
  );
};

export default AccountVerified;
