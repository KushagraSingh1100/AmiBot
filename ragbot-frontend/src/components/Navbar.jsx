function Navbar() {
  return (
    <nav className="w-full h-[80px] p-10 flex flex-row justify-between items-center border-b-2 border-neutral-200">
        <div>
          <h1 className="font-semibold text-2xl">AmiBot</h1>
        </div>
        <div>
          <ul className="flex flex-row gap-6">
            <li className="relative cursor-pointer after:block after:h-[2px] after:bg-black after:transition-transform after:duration-300 after:origin-left after:scale-x-0 hover:after:scale-x-100">
              Home
            </li>
            <li className="relative cursor-pointer after:block after:h-[2px] after:bg-black after:transition-transform after:duration-300 after:origin-left after:scale-x-0 hover:after:scale-x-100">
              About
            </li>
            <li className="relative cursor-pointer after:block after:h-[2px] after:bg-black after:transition-transform after:duration-300 after:origin-left after:scale-x-0 hover:after:scale-x-100">
              Contact
            </li>
          </ul>
        </div>
      </nav>
  )
}

export default Navbar