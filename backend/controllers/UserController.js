const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

function generateToken(id) {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};

async function register(req, res) {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        res.status(422).json({erros: ["Email já registrado."] })
        return;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    });

    if (!newUser) {
        res.status(422).json({erros: ["Houve um erro, por favor tente mais tarde."] })
        return;
    };

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });
};

async function login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404).json({errors: ["Usuário inválido."] });
        return;
    };

    if (!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({errors: ["Senha inválida."] })
        return;
    }

    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    });
}

module.exports = {
    register,
    login,
};