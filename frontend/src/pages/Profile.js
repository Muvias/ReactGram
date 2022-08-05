import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

import { Message } from "../components/Message";

import { uploads } from "../utils/config";

import { getUserDetails } from "../slices/userSlice";
import { publishPhoto, getUserPhotos, deletePhoto, updatePhoto } from "../slices/photoSlice";
import { useResetComponentMessage } from "../hooks/useResetComponentMessage";

export function Profile() {
    const { id } = useParams();

    const dispatch = useDispatch();
    const resetComponentMessage = useResetComponentMessage(dispatch);

    const { user, loading } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);
    const { photos, loading: photoLoading, message: photoMessage, error: photoError } = useSelector((state) => state.photo);

    const newPhotoForm = useRef();
    const editPhotoForm = useRef();

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    const [editId, setEditId] = useState("");
    const [editImage, setEditImage] = useState("");
    const [editTitle, setEditTitle] = useState("");

    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
    }, [dispatch, id]);

    if (loading) {
        return <p>Carregando...</p>;
    };

    function handleSubmit(e) {
        e.preventDefault();

        const photoData = {
            title,
            image
        };

        const formData = new FormData();

        const photoFormData = Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]));

        formData.append("photo", photoFormData)

        dispatch(publishPhoto(formData));

        setTitle("");

        resetComponentMessage();
    };

    function handleFile(e) {
        const image = e.target.files[0];

        setImage(image);
    };

    function handleDelete(id) {
        dispatch(deletePhoto(id));

        resetComponentMessage();
    };

    function hideOrShowForms() {
        newPhotoForm.current.classList.toggle("hidden")
        editPhotoForm.current.classList.toggle("hidden")
    };

    function handleEdit(photo) {
        if (editPhotoForm.current.classList.contains("hidden")) {
            hideOrShowForms();
        };

        setEditId(photo._id);
        setEditTitle(photo.title);
        setEditImage(photo.image);

    };

    function handleUpdate(e) {
        e.preventDefault();

        const photoData = {
            title: editTitle,
            id: editId
        };

        dispatch(updatePhoto(photoData));
        resetComponentMessage();
    };

    function handleCancelEdit(e) {
        hideOrShowForms();
    };

    return (
        <div className="w-[50%] mx-auto mt-4">
            <div className="flex flex-wrap items-center p-4 border-b-[1px] border-b-[#363636]">
                {user.profileImage && (
                    <img
                        src={`${uploads}/users/${user.profileImage}`}
                        alt={user.name}
                        className="h-[100px] w-[100px] rounded-[50%] mr-8"
                    />
                )}
                <div>
                    <h1 className="font-bold text-[2em]">{user.name}</h1>
                    <p className="font-bold text-[#999]">{user.bio}</p>
                </div>
            </div>
            {id === userAuth._id && (
                <>
                    <div
                        ref={newPhotoForm}
                        className="py-[1.5em] px-[2em] my-[2em] mx-auto border border-[#363636] bg-black"
                    >
                        <h2 className="font-bold text-[1.8em] mb-4">Compartilhe algum momento seu</h2>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col w-[100%] pb-[1.5em] mb-[1.5em] gap-[0.6em] border-b border-[#363636]"
                        >
                            <label className="flex flex-col mb-2 gap-[0.6em]">
                                <span>Título para a foto:</span>
                                <input
                                    type="text"
                                    placeholder="Insira um título"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title || ""}
                                    className="py-[10px] px-[8px] rounded-sm bg-[#3b3b3b] border border-[#555] placeholder:text-[#AAA]"
                                />
                            </label>

                            <label className="flex flex-col mb-2 gap-[0.6em]">
                                <span>Imagem:</span>
                                <input
                                    type="file"
                                    onChange={handleFile}
                                    className="py-[10px] px-[8px] rounded-sm bg-[#3b3b3b] border border-[#555] text-[#AAA]"
                                />
                            </label>

                            {!photoLoading &&                
                                <input
                                    type="submit"
                                    value="Postar"
                                    className="py-[10px] px-[8px] mt-4 text-[1em] rounded-[4px] font-bold opacity-[0.8] text-[#FFF] bg-[#0094f6] cursor-pointer hover:opacity-[1] transition-all"
                                />
                            }
                            
                            {photoLoading &&
                                <input
                                    type="submit"
                                    value="Aguarde..."
                                    className="py-[10px] px-[8px] mt-4 text-[1em] rounded-[4px] font-bold opacity-[0.8] text-[#FFF] border border-[#555] disabled:cursor-not-allowed disabled:bg-black"
                                    disabled
                                />
                            }
                        </form>
                    </div>

                    <div className="hidden" ref={editPhotoForm}>
                        <p>Editando:</p>
                        {editImage && (
                            <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
                        )}
                         <form
                            onSubmit={handleUpdate}
                            className="flex flex-col w-[100%] pb-[1.5em] mb-[1.5em] gap-[0.6em] border-b border-[#363636]"
                        >

                            <input
                                type="text"
                                placeholder="Insira um novo título"
                                onChange={(e) => setEditTitle(e.target.value)}
                                value={editTitle || ""}
                                className="py-[10px] px-[8px] rounded-sm bg-[#3b3b3b] border border-[#555] placeholder:text-[#AAA]"
                            />

                            <input
                                type="submit"
                                value="Atualizar"
                                className="py-[10px] px-[8px] mt-4 text-[1em] rounded-[4px] font-bold opacity-[0.8] text-[#FFF] bg-[#0094f6] cursor-pointer hover:opacity-[1] transition-all"
                            />

                            <button className="py-[10px] px-[8px] text-[1em] rounded-[4px] font-bold opacity-[0.8] text-[#FFF] border border-[#555]" onClick={handleCancelEdit}>Cancelar edição</button>
                        </form>
                    </div>

                    {photoError && <Message msg={photoError} type="error" />}

                    {photoMessage && <Message msg={photoMessage} type="success" />}
                </>
            )}

            <div className="p-4 border border-[#363636] mb-4">
                <h2 className="mb-2">Fotos publicadas:</h2>
                <div className="grid grid-cols-3 gap-4">
                    {photos && photos.map((photo) => (
                        <div
                            key={photo._id}
                            className="mb-2"
                        >
                            {photo.image && (
                                <img
                                    src={`${uploads}/photos/${photo.image}`}
                                    alt={photo.title}
                                    className="w-[100%]"
                                />
                            )}
                            {id === userAuth._id ? (
                                <div className="flex justify-around p-[10px]">
                                    <Link to={`/photos/${photo._id}`}>
                                        <BsFillEyeFill />
                                    </Link>
                                    <BsPencilFill className="cursor-pointer" onClick={() => handleEdit(photo)} />
                                    <BsXLg
                                        onClick={() => handleDelete(photo._id)}
                                        className="cursor-pointer"
                                    />
                                </div>
                            ) : (
                                <Link to={`/photos/${photo._id}`} className="">Ver mais</Link>
                            )}
                        </div>
                    ))}

                    {photos.length === 0 && <p className="mx-auto my-4">Ainda não há fotos publicadas</p>}
                </div>
            </div>
        </div>
    );
};