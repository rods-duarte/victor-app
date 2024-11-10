import { userRepository } from "../repositories/index.js";
import { cryptUtils } from "../utils/index.js";
import jwt from 'jsonwebtoken';

export async function registerUser(user) {
    const { email, senha } = user;
    const userExists = await userRepository.findUserByEmail(email);

    if (userExists.rowCount > 0) {
        return { error: 'User already exists' };
    }

    user.senha = await cryptUtils.createHash(senha);
    await userRepository.createUser(user);

    return { success: 'User registered successfully' };
}

export async function loginUser(user) {
    const { email, senha } = user;
    const userExists = await userRepository.findUserByEmail(email);

    if (userExists.rowCount === 0) {
        return { error: 'User not found' };
    }

    const userFound = userExists.rows[0];
    const isPasswordCorrect = await cryptUtils.compareHash(senha, userFound.senha);

    if (!isPasswordCorrect) {
        return { error: 'Invalid password' };
    }

    const token = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    delete userFound.senha;

    return { success: 'User logged in successfully', user: userFound, token };
}

export async function getUserById(id) {
    const userExists = await userRepository.findUserById(id);

    if (userExists.rowCount === 0) {
        return { error: 'User not found' };
    }

    const userFound = userExists.rows[0];
    delete userFound.senha;

    return { success: 'User found', user: userFound };
}