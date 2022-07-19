import {Link, NavLink} from "react-router-dom";
import {BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill} from "react-icons/bs";

export function Navbar() {
    return (
        <nav className="flex justify-between items-center py-[0.4em] px-[1em] bg-black border-b-[1px] border-solid border-[#363636]">
            <Link to="/">ReactGram</Link>
            <form className="relative w-[20%] items-center justify-center">
                <BsSearch className="absolute top-[15px] left-[9px]" />
                <input
                    type="text"
                    placeholder="pesquisar"
                    className="w-[100%] pl-[2.5em] py-[10px] pr-[8px] bg-[#3b3b3b] rounded-sm border-solid placeholder:text-[#AAA]"
                />
            </form>
            <ul className="flex items-center gap-[1em]">
                <li>
                    <NavLink to="/" className="cursor-pointer">
                        <BsHouseDoorFill className="text-[1.5em]" />
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/login" className="cursor-pointer">
                        Entrar
                    </NavLink>
                </li>

                <li>                    
                    <NavLink to="/register" className="cursor-pointer">
                        Cadastrar
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}