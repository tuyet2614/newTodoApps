import { useEffect, useState } from "react";
import './listTodo.css'
import AddTodo from "./addTodo";
import axios from "axios";
import Items from "./item";
import Pagination from "./Pagination";
import 'antd/dist/antd.css';
import { notification } from 'antd';
import { useNavigate, Link } from 'react-router-dom';


const ListTodo = () => {

    let navigate = useNavigate();
    const [isShow, setIsShow] = useState(false)
    const handleOnShow = () => setIsShow(true)
    const token = localStorage.getItem('token')
    const [todoList, setTodoList] = useState([])
    const [newContent, setNewContent] = useState()

    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(10)


    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'Notification Title',
            description:
                "add successfully",
        });
    };



    const showData = () => {


        axios.get(`https://api-nodejs-todolist.herokuapp.com/task`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                setTodoList(res.data.data)
                console.log(res);
                console.log(res.data);
                console.log("Todolist: " + todoList)

            })
            .catch(error => console.log(error));

    }

    const indexOfLastPost = currentPage * postPerPage
    const indexOfFistPost = indexOfLastPost - postPerPage
    const currentItems = todoList.slice(indexOfFistPost, indexOfLastPost)

    useEffect(() => {
        setLoading(true)
        showData()
        setLoading(false)
    }, [])

    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const handleOnclick = () => {
        axios.post(`https://api-nodejs-todolist.herokuapp.com/task`, {
            "description": newContent
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                setTodoList((pre) => [...pre, res.data.data,])
                openNotificationWithIcon('success')
            })
            .catch(error => console.log(error));

        setIsShow(false)
    }

    const handleOnChange = (e) => {

        setNewContent(e.target.value)
        console.log(e.target.value)


    }



    const handleDelete = (todo) => {
        console.log(todo._id)

        axios.delete(`https://api-nodejs-todolist.herokuapp.com/task/${todo._id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                const newTodoList = todoList.filter(item => item._id !== todo._id)
                setTodoList(newTodoList)
            })
            .catch(error => console.log(error));
    }
    const keyDownHandler = (event, todo) => {

        if (event.key === 'Enter') {
            axios.put(`https://api-nodejs-todolist.herokuapp.com/task/${todo._id}`, {
                "description": event.target.value
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    setTodoList(todoList.map(item => item._id === todo._id ? { ...res.data.data, description: event.target.value } : item))
                })
                .catch(error => console.log(error));

        }
    }

    const DataSave = (event, todo) => {

        axios.put(`https://api-nodejs-todolist.herokuapp.com/task/${todo._id}`, {
            "description": event.target.value
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                setTodoList(todoList.map(item => item._id === todo._id ? { ...res.data.data, description: event.target.value } : item))
            })
            .catch(error => console.log(error));


    }

    const handleEditTodo = (todo, e) => {

        setNewContent(todo)
        const TodoItem = todoList.find(item => item._id === todo._id)

        setTodoList(
            todoList.map(item => item._id === todo._id ? { ...TodoItem, description: '' } : item)

        )
    }

    const DoneTodo = (todo) => {

        axios.put(`https://api-nodejs-todolist.herokuapp.com/task/${todo._id}`, {
            "completed": true
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                setTodoList(todoList.map(item => item._id === todo._id ? { ...res.data.data, completed: true } : item))

            })
            .catch(error => console.log(error));

    }

    const logOutUser = () => {
        console.log(token)
        localStorage.setItem('token', null)
        navigate('/login', { replace: true })
        // axios.post(`https://api-nodejs-todolist.herokuapp.com/user/logout`, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`,

        //     }
        // })
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //         navigate('/', { replace: true })

        //     })
        //     .catch(error => console.log(error));
    }

    return (
        <div className="mainList">
            <div className="header">
                <div className="logOut">
                    <button onClick={() => logOutUser()}>Log Out</button>
                </div>
                <div className="add_button">

                    {isShow ? <AddTodo
                        handleOnclick={handleOnclick}
                        handleOnChange={handleOnChange}

                    /> :
                        <button onClick={() => handleOnShow()} className="addTodo">create</button>}
                </div>

                <div className="user">
                    <button className="btnUser"><Link to='/user'>User</Link></button>
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