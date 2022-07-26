import { api, requestConfig } from "../utils/config";

async function profile(data, token) {
    const config = requestConfig("GET", data, token);

    try {
        const res = await fetch(api + "/users/profile", config).then((res) => res.json()).catch((err) => err);

        return res;
    } catch (err) {
        console.log(err)
    };
};

async function updateProfile(data, token) {
    const config = requestConfig("PUT", data, token, true);

    try {
      const res = await fetch(api + "/users/", config).then((res) => res.json()).catch((err) => err);
      
      return res;
    } catch (err) {
        console.log(err);
    };
};

const userService = {
    profile,
    updateProfile,
};

export default userService;