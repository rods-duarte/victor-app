import bcrypt from 'bcrypt';

export function createHash(text) {
    return bcrypt.hashSync(text, bcrypt.genSaltSync(10));
}

export function compareHash(text, hash) {
    return bcrypt.compareSync(text, hash);
}