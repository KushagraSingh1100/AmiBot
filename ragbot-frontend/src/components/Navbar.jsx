import { useSelector } from "react-redux";
import { selectEmail } from "../store/authSlice";
import User from "/user.png";

function Navbar() {
  const username = useSelector(selectEmail);

  return (
    <nav className="w-full h-20 p-10 flex flex-row justify-between items-center border-b-2 border-neutral-200">
      <div>
        <a className="flex flex-row items-center" href="/">
          <img className="h-12" src="/logo.png" alt="" />
          <h1 className="font-semibold text-2xl">AmiBot</h1>
        </a>
      </div>
      <div className="flex flex-row items-center cursor-pointer bg-neutral-200 p-1.5 px-4 rounded-3xl group font-semibold">
        <div>
          <img className="w-10" src={User} />
        </div>
        <div>{username}</div>
      </div>
    </nav>
  );
}

export default Navbar;
