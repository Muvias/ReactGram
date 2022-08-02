import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { uploads } from "../utils/config";

import { Message } from "../components/Message";

import { profile, resetMessage, updateProfile } from "../slices/userSlice";

export function EditProfile() {
    const dispatch = useDispatch();

    const { user, message, error, loading } = useSelector((state) => state.user);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio)
        };
    }, [user]);

    async function handleSubmit(e) {
        e.preventDefault();

        const userData = {
            name,
        };

        if (profileImage) {
            userData.profileImage = profileImage;
        };

        if (bio) {
            userData.bio = bio;
        };

        if (password) {
            userData.password = password;
        };

        const formData = new FormData()

        Object.keys(userData).forEach((key) => formData.append(key, userData[key]));

        formData.append("user", formData);

        await dispatch(updateProfile(formData));

        setTimeout(() => {
            dispatch(resetMessage())
        }, 3000);
    };

    function handleFile(e) {
        const image = e.target.files[0];

        setPreviewImage(image);

        setProfileImage(image);
    };

    return (
        <div className="max-w-[40%] py-[1.5em] px-[2em] my-[2em] mx-auto border border-[#363636] bg-black">
            <h1 className="text-center text-[2.1em]">Edite seus dados</h1>
            <p className="font-bold text-[#999] mb-[1.5em] text-center">Altere ou adicione informações sobre você...</p>
            {(user.profileImage || previewImage) && (
                <img 
                    src={ previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}` }
                    alt="Prévia da imagem de perfil do usuário"
                    className="h-[150px] w-[150px] mb-4 mx-auto rounded-[50%]"
                />
            )}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-[100%] pb-[1.5em] mb-[1.5em] gap-[0.6em] border-b border-[#363636]"
            >
                <input 
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                    value={name || ""}
                    className="py-[10px] px-[8px] rounded-sm bg-[#3b3b3b] border border-[#555] placeholder:text-[#AAA]"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email || ""}
                    className="py-[10px] px-[8px] mb-2 rounded-sm bg-black border border-[#555] placeholder:text-[#AAA]"
                    disabled
                />

                <label className="flex flex-col mb-2 gap-[0.6em]">
                    <span className="text-[#999]">Imagem do Perfil:</span>
                    <input
                        type="file"
                        onChange={handleFile}
                        className="py-[10px] px-[8px] rounded-sm bg-[#3b3b3b] border border-[#555] text-[#AAA]"
                    />
                </label>

                <label className="flex flex-col mb-2 gap-[0.6em]">
                    <span className="text-[#999]">Bio:</span>
                    <input
                        type="text"
                        placeholder="Biografia do perfil"
                        onChange={(e) => setBio(e.target.value)}
                        value={bio || ""}
                        className="py-[10px] px-[8px] rounded-sm bg-[#3b3b3b] border border-[#555] placeholder:text-[#AAA]"
                    />
                </label>

                <label className="flex flex-col mb-2 gap-[0.6em]">
                    <span className="text-[#999]">Quer alterar sua senha?</span>
                    <input
                        type="password"
                        placeholder="Digite sua nova senha"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password || ""}
                        className="py-[10px] px-[8px] rounded-sm bg-[#3b3b3b] border border-[#555] placeholder:text-[#AAA]"
                    />
                </label>

                {!loading &&                
                    <input
                        type="submit"
                        value="Atualizar"
                        className="py-[10px] px-[8px] mt-4 text-[1em] rounded-[4px] font-bold opacity-[0.8] text-[#FFF] bg-[#0094f6] cursor-pointer hover:opacity-[1] transition-all"
                    />
                }
                
                {loading &&
                    <input
                        type="submit"
                        value="Aguarde..."
                        className="py-[10px] px-[8px] mt-4 text-[1em] rounded-[4px] font-bold opacity-[0.8] text-[#FFF] border border-[#555] disabled:cursor-not-allowed disabled:bg-black"
                        disabled
                    />
                }
                
                {error && <Message msg={error} type="error" />}

                {message && <Message msg={message} type="success" />}
            </form>
        </div>
    )
};