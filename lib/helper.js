import { userSocketIDs } from "../app.js";

export const getOtherMember = (members, userId) => members.find((member) => member._id.toString() !== userId.toString());


export const getSockets = (users) => {
    if (!Array.isArray(users)) {
        return []; // Return an empty array or handle this case as needed
    }

    return users.map((user) => {
        const socketID = userSocketIDs.get(user.toString());
        return socketID;
    }).filter(Boolean); // Remove undefined values from the result
};


export const getBase64 = (file) => `data:${file.mimetype};base64,${file.buffer.toString("base64")}`