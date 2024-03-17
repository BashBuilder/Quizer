import { useAuthContext } from "@/hooks/authContext";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleReLogIn = async () => {
    logout();
    navigate("/auth");
  };

  return (
    <article className="flex flex-col items-center justify-center gap-10 pt-10 ">
      <div className="w-11/12 max-w-2xl rounded-md bg-orange-600 p-6 text-white shadow-lg md:p-20">
        <p className="text-center capitalize">
          A verification Email has been sent to your Email Address. Kindly
          verify your Email address to continue
        </p>
      </div>
      <button
        onClick={handleReLogIn}
        className="border-2 border-primary  bg-white transition duration-300 hover:bg-primary hover:text-white"
      >
        Login With A Different Account
      </button>
    </article>
  );
}
