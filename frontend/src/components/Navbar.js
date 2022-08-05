import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from "react-icons/bs";

import { useAuth } from "../hooks/useAuth";

import { logout, reset } from "../slices/authSlice";

export function Navbar() {
    const [search, setSearch] = useState("");

    const { auth } = useAuth();
    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logout());
        dispatch(reset());

        navigate("/login");
    };

    function handleSearch(e) {
        e.preventDefault();

        if (search === "") {
            navigate("/")
        };

        if (search) {
            return navigate(`/search?q=${search}`);
        };
    };

    return (
        <nav className="flex justify-between items-center py-[0.4em] px-[1em] bg-black border-b-[1px] border-solid border-[#363636]">
            <Link to="/">ReactGram</Link>
            <form
                onSubmit={handleSearch}
                className="relative w-[20%] items-center justify-center"
            >
                <BsSearch className="absolute top-[15px] left-[9px]" />
                <input
                    type="text"
                    placeholder="pesquisar"
                    value={search || ""}
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={() => setSearch("")}
                    className="w-[100%] pl-[2.5em] py-[10px] pr-[8px] bg-[#3b3b3b] rounded-sm border-solid placeholder:text-[#AAA]"
                />
            </form>
            <ul className="flex items-center gap-[1em]">
                {auth ? (
                    <>
                        <li>
                            <NavLink to="/">
                                <BsHouseDoorFill className="text-[1.5em]" />
                            </NavLink>
                        </li>

                        {user && (
                            <li>
                                <NavLink to={`/users/${user._id}`}>
                                    <BsFillCameraFill className="text-[1.5em]" />
                                </NavLink>
                            </li>
                        )}

                        <li>
                            <NavLink to="/profile">
                                <BsFillPersonFill className="text-[1.5em]" />
                            </NavLink>
                        </li>

                        <li className="cursor-pointer">
                            <span onClick={handleLogout}>
                                Sair
                            </span>
                        </li>
                        
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/login">
                                Entrar
                            </NavLink>
                        </li>

                        <li>                    
                            <NavLink to="/register">
                                Cadastrar
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}