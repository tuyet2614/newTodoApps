import todo from "./http-common"
const getAll = () => {

    return todo.get("/task");
};
const get = id => {
    return todo.get(`/task/${id}`);
};
const create = data => {
    return todo.post("/task", data);
};
const update = (id, data) => {
    return todo.put(`/task/${id}`, data);
};
const remove = id => {
    return todo.delete(`/task/${id}`);
};
const removeAll = () => {
    return todo.delete(`/task`);
};
const findByTitle = title => {
    return todo.get(`/task?title=${title}`);
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