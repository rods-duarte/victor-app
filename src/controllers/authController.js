import { userServices } from "../services/index.js";

export async function register(req, res) {
    const registeredUser = await userServices.registerUser(req.body);

    if (registeredUser.error) {
        return res.status(409).json({ error: registeredUser.error });
    }

    res.sendStatus(204);
}

export async function login(req, res) {
    const loginResponse = await userServices.loginUser(req.body);

    if (loginResponse.error) {
        return res.status(401).json({ error: loginResponse.error });
    }

    res.json(loginResponse);
}