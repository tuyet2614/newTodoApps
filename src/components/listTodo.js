import { useEffect, useState } from "react";
import './listTodo.css'
import AddTodo from "./addTodo";
import axios from "axios";
import Items from "./item";
import Pagination from "./Pagination";
import { useNavigate, Link } from 'react-router-dom';
import todoService from "../service/todoService";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';


const ListTodo = (props) => {


    let { openNotificationWithIcon } = props
    let navigate = useNavigate()

    const [isShow, setIsShow] = useState(false)
    const handleOnShow = () => setIsShow(true)
    const token = localStorage.getItem('token')
    const [todoList, setTodoList] = useState([])
    const [newContent, setNewContent] = useState()

    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(10)
    const indexOfLastPost = currentPage * postPerPage
    const indexOfFistPost = indexOfLastPost - postPerPage
    const currentItems = todoList.slice(indexOfFistPost, indexOfLastPost)

    const showData = () => {
        todoService.getAll().then(res => {
            setTodoList(res.data.data)

        }).catch(error => console.log(error));

    }


    useEffect(() => {
        setLoading(true)
        showData()
        setLoading(false)
    }, [])

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const handleOnclick = () => {

        let data = {
            "description": newContent
        }

        todoService.create(data).
            then(res => {
                setTodoList((pre) => [res.data.data, ...pre])
                openNotificationWithIcon('success', 'add todo', "Add todolist successfully")
            }).catch(error => console.log(error));

        setIsShow(false)
    }

    const handleOnChange = (e) => {
        setNewContent(e.target.value)

    }



    const handleDelete = (todo) => {


        todoService.remove(todo._id)
            .then(res => {
                const newTodoList = todoList.filter(item => item._id !== todo._id)
                setTodoList(newTodoList)
                openNotificationWithIcon('success', 'delete todo', "Delete todolist successfully")
            })
            .catch(error => console.log(error));
    }
    const keyDownHandler = (event, todo) => {

        if (event.key === 'Enter') {
            let data = {
                "description": event.target.value
            }
            todoService.update(todo._id, data)
                .then(res => {
                    setTodoList(todoList.map(item => item._id === todo._id ? { ...res.data.data, description: event.target.value } : item))
                    openNotificationWithIcon('success', 'edit', "Change todolist successfully")
                }).catch(error => console.log(error));
        }
    }

    const DataSave = (event, todo) => {
        let data = {
            "description": event.target.value
        }
        todoService.update(todo._id, data)
            .then(res => {
                setTodoList(todoList.map(item => item._id === todo._id ? { ...res.data.data, description: event.target.value } : item))
                openNotificationWithIcon('success', 'edit todo', "Change todolist successfully")
            }).catch(error => console.log(error));
    }

    const handleEditTodo = (todo, e) => {

        setNewContent(todo)
        const TodoItem = todoList.find(item => item._id === todo._id)

        setTodoList(
            todoList.map(item => item._id === todo._id ? { ...TodoItem, description: '' } : item)

        )
    }

    const DoneTodo = (todo) => {
        let data = {
            "completed": true
        }
        todoService.update(todo._id, data)
            .then(res => {
                setTodoList(todoList.map(item => item._id === todo._id ? { ...res.data.data, completed: true } : item))
                openNotificationWithIcon('success', 'check todo', "Todo completed")
            }).catch(error => console.log(error));

    }

    const logOutUser = () => {

        localStorage.setItem('token', null)
        navigate('/login', { replace: true })
    }


    const getUser = () => {

        navigate('/user', { replace: true })
    }

    return (
        <div className="mainList">
            <div className="header">
                <div className="logOut">
                    <button onClick={() => logOutUser()}><LogoutIcon /></button>
                </div>
                <div className="add_button">

                    {isShow ? <AddTodo
                        handleOnclick={handleOnclick}
                        handleOnChange={handleOnChange}

                    /> :
                        <button onClick={() => handleOnShow()} className="addTodo">create</button>}
                </div>

                <div className="user">
                    <button onClick={() => getUser()}><AccountBoxIcon /></button>
                </div>

            </div>

            <div className="list_todo">
                <Items
                    currentItems={currentItems}
                    handleEditTodo={handleEditTodo}
                    keyDownHandler={keyDownHandler}
                    DoneTodo={DoneTodo}
                    handleDelete={handleDelete}
                    DataSave={DataSave}
                    newContent={newContent}

                    loading={loading}
                />
                <Pagination postPerPage={postPerPage} totalPosts={todoList.length} paginate={paginate} />
            </div>


        </div >
    )

}

export default ListTodo