import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { uploads } from "../utils/config";

import { Message } from "../components/Message";
import { PhotoItem } from "../components/PhotoItem";

import { getPhoto, likePhoto, comment } from "../slices/photoSlice";
import { LikeContainer } from "../components/LikeContainer";
import { useResetComponentMessage } from "../hooks/useResetComponentMessage";

export function Photo() {
    const { id } = useParams();

    const { user } = useSelector((state) => state.auth);
    const { photo, loading, error, message } = useSelector((state) => state.photo);

    const dispatch = useDispatch();
    const resetMessage = useResetComponentMessage(dispatch);

    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);

    if (loading) {
        return <p>Carregando...</p>
    };

    function handleLike() {
        dispatch(likePhoto(photo._id));

        resetMessage();
    };

    function handleComment(e) {
        e.preventDefault();

        const commentData = {
            comment: commentText,
            id: photo._id
        };

        dispatch(comment(commentData));

        setCommentText("");

        resetMessage();
    };

    return (
        <div className="w-[50%] mx-auto text-center mt-8">
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <div>
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </div>
            <div>
                {photo.comments && (
                    <>
                        <h2>Comentários: ({photo.comments.length})</h2>

                        <form
                        onSubmit={handleComment}
                        className="flex flex-col w-[100%] pb-[1.5em] mb-[1.5em] gap-[0.6em] border-b border-[#363636]"
                        >

                            <input
                                type="text"
                                placeholder="Adicione um comentário..."
                                onChange={(e) => setCommentText(e.target.value)}
                                value={commentText || ""}
                                className="py-[10px] px-[8px] rounded-sm bg-[#3b3b3b] border border-[#555] placeholder:text-[#AAA]"
                            />

                            <input
                                type="submit"
                                value="Enviar"
                                className="py-[10px] px-[8px] mt-4 text-[1em] rounded-[4px] font-bold opacity-[0.8] text-[#FFF] bg-[#0094f6] cursor-pointer hover:opacity-[1] transition-all"
                            />
                        </form>
                        
                        {photo.comments.length === 0 && <p>Não há comentários...</p>}
                        {photo.comments.map((comment) => (
                            <div key={comment.comment} className="text-left mb-4" >
                                <div className="flex items-center text-[1.2em] font-bold">
                                    {comment.userImage && (
                                        <img
                                            src={`${uploads}/users/${comment.userImage}`}
                                            alt={comment.userName}
                                            className="h-[55px] w-[55px] rounded-[50%] mr-4"
                                        />
                                    )}
                                    <Link to={`/users/${comment.userId}`}>
                                        <p>{comment.userName}</p>
                                    </Link>
                                </div>
                                <p className="pl-4 mt-4 text-[1.1em]">{comment.comment}</p>
                            </div>
                        ))}
                    </>
                )}
                
            </div>
        </div>
    );
};