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

const userService = {
    profile,
};

export default userService;