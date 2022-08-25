import user from "./http-user"

const get = () => {
    return user.get(`/me`);
};
const create = data => {
    return user.post("/register", data);
};
const update = (data) => {
    return user.put(`/me`, data);
};
const logout = id => {
    return user.delete(`/logout`, id);
};
const avatar = (id) => {
    return user.get(`/${id}/avatar`);
};
const updateAvatar = (data) => {
    return user.post(`/me/avatar`, data);
};
const userService = {
    get,
    create,
    update,
    logout,
    avatar,
    updateAvatar
};
export default userService;