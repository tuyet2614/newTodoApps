import todo from "../constant/http-common"
const getAll = () => {

    return todo.get("/task");
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


const todoService = {
    getAll,
    create,
    update,
    remove,
};
export default todoService;