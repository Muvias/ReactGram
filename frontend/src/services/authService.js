import { api, requestConfig } from "../utils/config";

async function register(data) {
    const config = requestConfig("POST", data);

    try {
        const response = await fetch(api + "/users/register", config)
            .then((res) => res.json())
            .catch((err) => err);

        if (response) {
            localStorage.setItem("user", JSON.stringify(response));
        };

        return response;
    } catch (err) {
        console.log(err);
    };
};

function logout() {
    localStorage.removeItem("user");
};

const authService = {
    register,
    logout,
};

export default authService;