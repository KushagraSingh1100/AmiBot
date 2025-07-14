function Navbar() {
  return (
    <nav className="w-full h-[80px] p-10 flex flex-row justify-between items-center border-b-2 border-neutral-200">
        <div>
          <a className="flex flex-row items-center" href="/">
          <img className="h-12" src="/logo.png" alt="" />
          <h1 className="font-semibold text-2xl">AmiBot</h1>
          </a>
        </div>
        <div>
          <ul className="flex flex-row gap-6">
            <li className="relative cursor-pointer after:block after:h-[1.5px] after:bg-black after:transition-transform after:duration-300 after:origin-left after:scale-x-0 hover:after:scale-x-100">
              Home
            </li>
            <li className="relative cursor-pointer after:block after:h-[1.5px] after:bg-black after:transition-transform after:duration-300 after:origin-left after:scale-x-0 hover:after:scale-x-100">
              About
            </li>
            <li className="relative cursor-pointer after:block after:h-[1.5px] after:bg-black after:transition-transform after:duration-300 after:origin-left after:scale-x-0 hover:after:scale-x-100">
              Contact
            </li>
          </ul>
        </div>
      </nav>
  )
}

export default Navbar