import { Link } from "react-router-dom";
import { uploads } from "../utils/config";

export function PhotoItem({photo}) {
    return (
        <div>
            {photo.image && (
                <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} className="w-[10%] mb-4" />
            )}
            <h1 className="font-bold text-[1.8em] mb-4">{photo.title}</h1>
            <p className="text-left mb-4">
                Publicada por: <Link to={`/users/${photo.userId}`} className="pl-[2px] font-bold">{photo.userName}</Link>
            </p>
        </div>
    );
};