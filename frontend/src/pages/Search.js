import { useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useResetComponentMessage } from "../hooks/useResetComponentMessage";
import { useQuery } from "../hooks/useQuery";

import { likePhoto, searchPhotos } from "../slices/photoSlice";

import { LikeContainer } from "../components/LikeContainer";
import { PhotoItem } from "../components/PhotoItem";


export function Search() {
    const dispatch = useDispatch();
    const resetMessage = useResetComponentMessage(dispatch);

    const query = useQuery();
    const search = query.get("q");

    const { user } = useSelector((state) => state.auth);
    const { photos, loading } = useSelector((state) => state.photo);

    useEffect(() => {
        dispatch(searchPhotos(search));
    }, [dispatch, search]);

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
            <h2 className="font-bold text-[1.8rem] text-center mt-8">
                Não há fotos correspondentes à sua busca...
            </h2>
        )}
    </div>
    );
}