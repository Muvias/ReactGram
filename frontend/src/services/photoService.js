import { api, requestConfig } from "../utils/config";

async function publishPhoto(data, token) {
    const config = requestConfig("POST", data, token, true);

    try {
      const res = await fetch(api + "/photos", config).then((res) => res.json()).catch((err) => err);
      
      return res
    } catch (err) {
        console.log(err)
    };
};

async function getUserPhotos(id, token) {
    const config = requestConfig("GET", null, token)
    
    try {
        const res = await fetch(api + `/photos/user/${id}`, config).then((res) => res.json()).catch((err) => err);

        return res;
    } catch (err) {
        console.log(err);
    };
};

async function deletePhoto(id, token) {
    const config = requestConfig("DELETE", null, token);

    try {
      const res = await fetch(api + `/photos/${id}`, config).then((res) => res.json()).catch((err) => err);
      
      return res;
    } catch (err) {
        console.log(err);
    };
}

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
};

export default photoService;