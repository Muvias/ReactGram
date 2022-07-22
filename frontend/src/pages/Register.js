import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { register, reset } from "../slices/authSlice";
import { Message } from "../components/Message";

export function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);

    function handleSubmit(e) {
        e.preventDefault();

        const user = {
            name,
            email,
            password,
            confirmPassword
        };

        dispatch(register(user));
    };

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <div className="max-w-[33%] py-[1.5em] px-[2em] my-[2em] mx-auto border border-solid border-[#363636] bg-black">
            <h1 className="text-center text-[2.1em]">ReactGram</h1>
            <p className="font-bold text-[#999] mb-[1.5em] text-center">Cadastre-se para ver as fotos dos seus amigos.</p>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-[100%] pb-[1.5em] mb-[1.5em] gap-[0.6em] border-b border-[#363636]"
            >

                <input
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="py-[10px] px-[8px] rounded-sm border-solid bg-[#3b3b3b] border-[#555] placeholder:text-[#AAA]"
                />

                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="py-[10px] px-[8px] rounded-sm border-solid bg-[#3b3b3b] border-[#555] placeholder:text-[#AAA]"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="py-[10px] px-[8px] rounded-sm border-solid bg-[#3b3b3b] border-[#555] placeholder:text-[#AAA]"
                />

                <input
                    type="password"
                    placeholder="Confirme sua senha"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    className="py-[10px] px-[8px] rounded-sm border-solid bg-[#3b3b3b] border-[#555] placeholder:text-[#AAA]"
                />

                {!loading &&
                    <input
                        type="submit"
                        value="Cadastrar"
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
                Já tem conta? <Link to="/login" className="font-bold text-[#0094f6]">Clique aqui.</Link>
            </p>
        </div>
    );
};