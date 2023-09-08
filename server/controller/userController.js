const User = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require('../configs/config');

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function checkPassword(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}

const getUsers = async (req, res) => {
    try{
        const users = await User.find()
        return res.json(users)
    }
    catch(err){
        return res.status(500).json({ message: 'Error retrieving users' });
    }
}

const postUser = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    
    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }
    
    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match.");
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send("User already exists.");
    }
    
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ email, password: hashedPassword });
    
    const token = jwt.sign(
        {
            email: newUser.email,
            id: newUser._id,
        },
        JWT_SECRET_KEY,
        { expiresIn: "1h" }
    )
    
    res.status(200).json({ result: newUser, token });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).send("Email and password are required.");
    }

    const existingUser = await User.findOne({ email });

    if(!existingUser) {
        return res.status(403).send("Wrong email or password.");
    }

    const isPasswordCorrect = await checkPassword(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(403).send("Wrong email or password.");
    }
    const token = jwt.sign(
        {
            email: existingUser.email,
            id: existingUser._id
        },
        JWT_SECRET_KEY,
        { expiresIn: "1h" }
    );

    res.status(200).json({ user: existingUser, token });
}

module.exports = {postUser, loginUser, getUsers};
