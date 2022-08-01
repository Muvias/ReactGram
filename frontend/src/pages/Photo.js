import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { uploads } from "../utils/config";

import { Message } from "../components/Message";
import { PhotoItem } from "../components/PhotoItem";

import { getPhoto } from "../slices/photoSlice";

export function Photo() {
    const { id } = useParams();

    const { user } = useSelector((state) => state.auth);
    const { photo, loading, error, message } = useSelector((state) => state.photo);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div className="w-[50%] mx-auto text-center mt-8">
            <PhotoItem photo={photo} />
        </div>
    );
};