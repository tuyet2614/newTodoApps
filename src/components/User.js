import axios from "axios";
import { useEffect, useState } from "react";
import "./User.css";
import CreateIcon from '@mui/icons-material/Create';



const User = (props) => {

    const token = localStorage.getItem("token");

    let [isEmpty, setIsEmpty] = useState(true);

    let [editText, setEditText] = useState("");
    let [editEmailText, setEditEmailText] = useState("");
    let [check, setCheck] = useState("")
    let [image, setImage] = useState(null)
    let [user, setUser] = useState([]);
    let [avatar, setAvatar] = useState()
    let [done, setDone] = useState(false)


    const getUser = async () => {
        await axios.get(`https://api-nodejs-todolist.herokuapp.com/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setUser(res.data);
                setDone(true)
            })
            .catch((error) => console.log(error));
    };

    const getAvartar = async () => {
        await axios.get(`https://api-nodejs-todolist.herokuapp.com/user/${user._id}/avatar`)
            .then((res) => {
                console.log(res)
                setImage(res.request.responseURL)
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getUser()
        if (done === true)
            getAvartar()
    }, [])


    const handleOnchangeEditUser = (e) => {
        setEditText(e.target.value);
    };

    const handleOnchangeEditEmailUser = (e) => {
        setEditEmailText(e.target.value);
    };




    const handleEditUser = (text) => {
        setIsEmpty(false);
        setCheck('name')
        if (isEmpty === false) {
            axios
                .put(
                    `https://api-nodejs-todolist.herokuapp.com/user/me`,
                    {
                        name: text,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    setUser({ ...user, name: text });
                    setIsEmpty(true);
                    setCheck('')
                })
                .catch((error) => console.log(error));
        }
    };

    const handleEditEmailUser = (text) => {
        setIsEmpty(false);
        setCheck('email')
        if (isEmpty === false) {
            axios
                .put(
                    `https://api-nodejs-todolist.herokuapp.com/user/me`,
                    {
                        email: text,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    setUser({ ...user, email: text });
                    setIsEmpty(true);
                    setCheck('')
                })
                .catch((error) => console.log(error));
        }
    };


    const onImageChange = async (e) => {
        e.preventDefault()
        const formData = new FormData()


        formData.append("avatar", e.target.files[0])

        axios.post(`https://api-nodejs-todolist.herokuapp.com/user/me/avatar`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,

                }
            })
            .then(res => {
                setImage(URL.createObjectURL(e.target.files[0]))
                alert("ok")
                console.log(res)
                console.log(formData)
            })
            .catch(error => console.log(error));




    };

    return (


        < div >
            <div className="container">
                <div className="rightbox">
                    <div className="profile">
                        <form encType="multipart/form-data" action="#" method="POST" className="avatar-upload" >
                            <div className="avatar-edit">

                                <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" name="avatar" className="{{ $errors->has('email') ? 'alert alert-danger' : '' }}" onChange={(e) => onImageChange(e)} />
                                <label htmlFor="imageUpload"><CreateIcon className="icon" /> </label>
                            </div>
                            <div className="avatar-preview container2">
                                <div id="imagePreview" >

                                    <img className="avatar-preview" src={image}></img>
                                </div>
                            </div>

                        </form>

                        <h1>Personal Info</h1>
                        <h2>Full Name</h2>
                        <p >
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
                        <p >
                            {isEmpty === false && check === "email" ? (
                                <input
                                    defaultValue={user.email}
                                    onChange={(e) => handleOnchangeEditEmailUser(e)}

                                />

                            ) : (
                                user.email
                            )}
                            <button className="btn" onClick={() => handleEditEmailUser(editEmailText)}>
                                {isEmpty === false && check === "email" ? "Save" : "Update"}</button>
                        </p>
                        <h2>Password </h2>
                        <p>
                            {user.password}
                            <button className="btn">Change</button>
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
};
export default User;