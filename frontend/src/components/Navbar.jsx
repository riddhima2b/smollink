import { Link } from "react-router-dom";
const Navbar = () => {
        return(
            <nav className="border-b border-[#f5f1eb]/20 px-10 py-5">
                <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    <Link to="/">S <span className="text-[#69ff4f]">.</span></Link>
                </h1>

                <div className="flex gap-8 text-xl">
                    <span>My Links</span>
                    <span>Analytics</span>
                    <span className="text-[#69ff4f]">Logout</span>
                </div>
                </div>
            </nav>
        )
}
export default Navbar;