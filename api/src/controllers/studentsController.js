import { userServices, certificateServices } from "../services/index.js";

export async function createCertificate(req, res) {
    const { studentId } = req.params;
    const { body } = req;
    const tokenUser = req.user;
    const { user, error } = await userServices.getUserById(studentId);

    if (error) {
        return res.status(404).json({ error });
    }

    // if (user.id !== tokenUser.id) {
    //     return res.sendStatus(403);
    // }

    const certificateData = {
        ...body,
        user
    }

    await certificateServices.createCertificate(certificateData);

    res.sendStatus(204);
}