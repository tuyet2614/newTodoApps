import http from "./http-common"
const getAll = () => {

    return http.get("/task");
};
const get = id => {
    return http.get(`/task/${id}`);
};
const create = data => {
    return http.post("/task", data);
};
const update = (id, data) => {
    return http.put(`/task/${id}`, data);
};
const remove = id => {
    return http.delete(`/task/${id}`);
};
const removeAll = () => {
    return http.delete(`/task`);
};
const findByTitle = title => {
    return http.get(`/task?title=${title}`);
};
const todoService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};
export default todoService;