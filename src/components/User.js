import axios from "axios";
import { useEffect, useState } from "react";
import "./User.css";
import CreateIcon from "@mui/icons-material/Create";
import blankUser from '../images/blankAvatar.jpeg'
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { useNavigate } from "react-router-dom";
import userService from '../service/userService';

const User = (props) => {
    let { openNotificationWithIcon } = props
    let navigate = useNavigate()
    const token = localStorage.getItem("token");

    let [isEmpty, setIsEmpty] = useState(true);

    let [editText, setEditText] = useState("");
    let [editEmailText, setEditEmailText] = useState("");
    let [check, setCheck] = useState("");
    let [image, setImage] = useState(null);
    let [user, setUser] = useState([]);

    const getUser = () => {

        userService.get()
            .then((res) => {
                setUser(res.data);
                getAvartar(res.data._id);
            })
            .catch((error) => console.log(error));

    };

    const getAvartar = (id) => {
        userService.avatar(id)
            .then((res) => {
                setImage(res.request.responseURL);
            })
            .catch((error) => console.log(error));

    };

    useEffect(() => {
        getUser();
    }, []);

    const handleOnchangeEditUser = (e) => {
        setEditText(e.target.value);
    };

    const handleOnchangeEditEmailUser = (e) => {
        setEditEmailText(e.target.value);
    };

    const handleEditUser = (text) => {
        setIsEmpty(false);
        setCheck("name");
        let data = {
            name: text
        }
        if (isEmpty === false) {
            userService.update(data).then((res) => {
                setUser({ ...user, name: text });
                setIsEmpty(true);
                openNotificationWithIcon('success', "Edit name", "Change name successfully")
            }).catch((error) => console.log(error));

        }
    };

    const handleEditEmailUser = (text) => {
        setIsEmpty(false);
        setCheck("email");
        if (isEmpty === false) {
            let data = {
                email: text
            }

            userService.update(data).then((res) => {
                setUser({ ...user, email: text });
                setIsEmpty(true);
                openNotificationWithIcon('success', "edit email", "Change email successfully")
            }).catch((error) => console.log(error));

        }
    };

    const onImageChange = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("avatar", e.target.files[0]);
        userService.updateAvatar(formData)
            .then((res) => {
                setImage(URL.createObjectURL(e.target.files[0]));
                openNotificationWithIcon('success', "edit avatar", "Change avatar successfully")
            })
            .catch((error) => console.log(error));

    };

    const todoReturn = () => {
        navigate('/todo', { replace: true })
    }

    return (
        <div>
            <div className="container">
                <div className="rightbox">
                    <button className="todo" onClick={() => { todoReturn() }}><NoteAltIcon /></button>
                    <div className="profile">

                        <form
                            encType="multipart/form-data"
                            action="#"
                            method="POST"
                            className="avatar-upload"
                        >
                            <div className="avatar-edit">
                                <input
                                    type="file"
                                    id="imageUpload"
                                    accept=".png, .jpg, .jpeg"
                                    name="avatar"
                                    className="{{ $errors->has('email') ? 'alert alert-danger' : '' }}"
                                    onChange={(e) => onImageChange(e)}
                                />
                                <label htmlFor="imageUpload">
                                    <CreateIcon className="icon" />{" "}
                                </label>
                            </div>
                            <div className="container2">
                                {image ? (
                                    <img className="avatar-preview" src={image} />
                                ) : (
                                    <img src={blankUser} className="avatar-preview " />
                                )}
                            </div>
                        </form>

                        <h1>Personal Info</h1>
                        <h2>Full Name</h2>
                        <p>
                            {isEmpty === false && check === "name" ? (
                                <input
                                    defaultValue={user.name}
                                    onChange={(e) => handleOnchangeEditUser(e)}
                                />
                            ) : (
                                user.name
                            )}

                            <button className="btn" onClick={() => handleEditUser(editText)}>
                                {isEmpty === false && check === "name" ? "Save" : "Update"}
                            </button>
                        </p>
                        <h2>Birthday</h2>
                        <p>January 26</p>
                        <h2>Gender</h2>
                        <p>Female</p>
                        <h2>Email</h2>
                        <p>
                            {isEmpty === false && check === "email" ? (
                                <input
                                    defaultValue={user.email}
                                    onChange={(e) => handleOnchangeEditEmailUser(e)}
                                />
                            ) : (
                                user.email
                            )}
                            <button
                                className="btn"
                                onClick={() => handleEditEmailUser(editEmailText)}
                            >
                                {isEmpty === false && check === "email" ? "Save" : "Update"}
                            </button>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};
export default User;