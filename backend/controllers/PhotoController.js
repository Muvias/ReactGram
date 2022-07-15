const photo = require("../models/Photo");

const mongoose = require("mongoose");
const User = require("../models/User");
const Photo = require("../models/Photo");

async function insertPhoto(req, res) {
    const { title } = req.body;
    const image = req.file.filename;

    const user = await User.findById(req.user._id).select("-password");

    const newPhoto = await Photo.create({
        image,
        title,
        userId: user.id,
        userName: user.name,
    });

    if (!newPhoto) {
        res.status(422).json({errors: ["Houve um problema, por favor tente novamente mais tarde."] });
        return;
    };

    res.status(201).json(newPhoto);
};

async function deletePhoto(req, res) {
    const { id } = req.params;

    try {
        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        if (!photo) {
            res.status(404).json({errors: ["Foto não encontrada!"] });
            return;
        };
    
        if (!photo.userId.equals(req.user._id)) {
            res.status(422).json({errors: ["Ocorreu um erro, por favor tente novamente mais tarde."] })
        };
    
        await Photo.findByIdAndDelete(photo._id);
    
        res.status(200).json({ id: photo._id, message: "Foto excluída com sucesso." })
    } catch (err) {
        res.status(404).json({errors: ["Foto não encontrada."]});
        return;
    }
};

async function getAllPhotos(req, res) {
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec();

    return res.status(200).json(photos);
};

async function getUserPhotos(req, res) {
    const { id } = req.params;
    const photos = await Photo.find({userId: id}).sort([["createdAt", -1]]).exec();

    return res.status(200).json(photos);
};

async function getPhotoById(req, res) {
    const { id } = req.params;
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    if (!photo) {
        res.status(404).json({errors: ["Foto não encontrada."] });
        return;
    };

    res.status(200).json(photo);
};

async function updatePhoto(req, res) {
    const { id } = req.params;
    const { title } = req.body;

    const photo = await Photo.findById(id);

    if (!photo) {
        res.status(404).json({errors: ["Foto não encontrada."] });
        return;
    };

    if (!photo.userId.equals(req.user._id)) {
        res.status(422).json({errors: ["Ocorreu um erro, tente novamente mais tarde."] });
        return;
    };

    if (title) {
        photo.title = title;
    };

    await photo.save();

    res.status(200).json({photo, message: "Foto atualizada com sucesso!" });
};

async function likePhoto(req, res) {
    const { id } = req.params;

    const photo = await Photo.findById(id);
    
    if (!photo) {
        res.status(404).json({errors: ["Foto não encontrada."] });
        return;
    };

    if (photo.likes.includes(req.user._id)) {
        res.status(422).json({errors: ["Você já curtiu a foto."] });
        return;
    };

    photo.likes.push(req.user._id);

    photo.save();

    res.status(200).json({photoId: id, userId: req.user._id, message: "A foto foi curtida." })
};

async function commentPhoto(req, res) {
    const { id } = req.params;
    const { comment } = req.body;

    const user = await User.findById(req.user._id);
    const photo = await Photo.findById(id);

    if (!photo) {
        res.status(404).json({errors: ["Foto não encontrada."] });
        return;
    };

    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id,
    };

    photo.comments.push(userComment);

    await photo.save();

    res.status(200).json({comment: userComment, message: "Comentário adicionado." })
};

async function searchPhotos(req, res) {
    const { q } = req.query;
    const photos = await Photo.find({title: new RegExp(q, "i")}).exec();

    res.status(200).json(photos);
};

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos,
};