import { BsHeart, BsHeartFill } from "react-icons/bs";

export function LikeContainer({ photo, user, handleLike }) {
    return (
        <div className="flex items-center py-3 mb-2 border-t border-b border-t-[#363636] border-b-[#363636] gap-4">
            {photo.likes && user && (
                <>
                    {photo.likes.includes(user._id) ? (
                        <BsHeartFill className="cursor-pointer text-[1.5em]" />
                    ) : (
                        <BsHeart className="cursor-pointer text-[1.5em]" onClick={() => handleLike(photo)} />
                    )}
                    <p>{photo.likes.length} like(s)</p>
                </>
            )}
        </div>
    );
};