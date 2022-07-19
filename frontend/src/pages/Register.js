import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function Register() {
    function handleSubmit(e) {
        e.preventDefault();
    };

    return (
        <div className="flex flex-col w-[30%] justify-center items-center mx-auto">
            <h2>ReactGram</h2>
            <p>Cadastre-se para ver as fotos dos seus amigos.</p>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-[100%] mt-4 gap-[0.6em] text-left"
            >
                <input type="text" placeholder="Nome" className="py-[10px] px-[8px] rounded-sm border-solid bg-[#3b3b3b] border-[#555] placeholder:text-[#AAA]" />
                <input type="email" placeholder="Email" className="py-[10px] px-[8px] rounded-sm border-solid bg-[#3b3b3b] border-[#555] placeholder:text-[#AAA]" />
                <input type="password" placeholder="Senha" className="py-[10px] px-[8px] rounded-sm border-solid bg-[#3b3b3b] border-[#555] placeholder:text-[#AAA]" />
                <input type="password" placeholder="Confirme sua senha" className="py-[10px] px-[8px] rounded-sm border-solid bg-[#3b3b3b] border-[#555] placeholder:text-[#AAA]" />
                <input type="submit" value="Cadastrar" className="py-[10px] px-[8px] mt-4 text-[1em] rounded-[4px] font-bold opacity-[0.8] text-[#FFF] bg-[#0094f6] border-[#555] cursor-pointer hover:opacity-[1] transition-all disabled:cursor-not-allowed disabled:bg-black" disabled />
            </form>
            <p>
                Já tem conta? <Link to="/login">Clique aqui.</Link>
            </p>
        </div>
    )
}