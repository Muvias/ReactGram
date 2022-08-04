import { useEffect } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useResetComponentMessage } from "../hooks/useResetComponentMessage";

import { getPhotos, likePhoto } from "../slices/photoSlice";

import { LikeContainer } from "../components/LikeContainer"
import { PhotoItem } from "../components/PhotoItem"

export function Home() {
    const dispatch = useDispatch();
    const resetMessage = useResetComponentMessage(dispatch);

    const { user } = useSelector((state) => state.auth);
    const { photos, loading } = useSelector((state) => state.photo);

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    function handleLike(photo) {
        dispatch(likePhoto(photo._id));
        
        resetMessage();
    };

    if (loading) {
        return <p>Caregando...</p>
    };

    return (
        <div className="flex flex-col w-[50%] mx-auto mt-8">
            {photos && photos.map((photo) => 
                <div key={photo._id} className="mb-8">
                    <PhotoItem photo={photo} />
                    <LikeContainer photo={photo} user={user} handleLike={handleLike} />
                    <Link to={`/photos/${photo._id}`}>Ver mais</Link>
                </div>
            )}

            {photos && photos.length === 0 && (
                <h2>
                    Ainda não há foto publicadas...
                    <Link to={`/users/${user._id}`} >Seja o primeiro a publicar</Link>
                </h2>
            )}
        </div>
    );
};