import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Message } from "../components/Message";
import { login, reset } from "../slices/authSlice";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);

    function handleSubmit(e) {
        e.preventDefault();

        const user = {
            email,
            password
        };

        dispatch(login(user));
    };

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <div className="max-w-[33%] py-[1.5em] px-[2em] my-[2em] mx-auto border border-[#363636] bg-black">
            <h1 className="text-center text-[2.1em]">ReactGram</h1>
            <p className="font-bold text-[#999] mb-[1.5em] text-center">Faça o login para ver o que há de novo.</p>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-[100%] pb-[1.5em] mb-[1.5em] gap-[0.6em] border-b border-[#363636]"
            >
                <input 
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="py-[10px] px-[8px] rounded-sm border bg-[#3b3b3b] border-[#555] placeholder:text-[#AAA]"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="py-[10px] px-[8px] rounded-sm border bg-[#3b3b3b] border-[#555] placeholder:text-[#AAA]"
                />

                {!loading &&
                    <input
                        type="submit"
                        value="Entrar"
                        className="py-[10px] px-[8px] mt-4 text-[1em] rounded-[4px] font-bold opacity-[0.8] text-[#FFF] bg-[#0094f6] cursor-pointer hover:opacity-[1] transition-all"
                    />
                }
                {loading &&
                    <input
                        type="submit"
                        value="Aguarde"
                        className="py-[10px] px-[8px] mt-4 text-[1em] rounded-[4px] font-bold opacity-[0.8] text-[#FFF] border border-[#555] disabled:cursor-not-allowed disabled:bg-black"
                        disabled
                    />
                }
                {error && <Message msg={error} type="error" />}

            </form>
            <p  className="text-center">
                Não tem uma conta? <Link to="/register" className="font-bold text-[#0094f6]">Clique aqui.</Link>
            </p>
        </div>
    );
};