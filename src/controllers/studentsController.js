import { userServices } from "../services";

export async function createCertificate(req, res) {
    const { studentId } = req.params;
    const { user, error } = await userServices.getUserById(studentId);

    if (error) {
        return res.status(404).json({ error });
    }

    res.sendStatus(204);
}