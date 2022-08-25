import logo from './logo.svg';
import './App.css';
import ListTodo from './components/listTodo';
import { useEffect, useState } from "react";
import Login from './components/Login';
import axios from 'axios';
import User from './components/User';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Routes,
  Link,
  useNavigate,
  BrowserRouter,
  Navigate,
  Outlet
} from "react-router-dom";
import SignUp from './components/signUp';
import { notification } from 'antd';
import 'antd/dist/antd.css';

// function Splash() {
//   const navigate = useNavigate();
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     console.log('token: ', token)

//     if (!token) {
//       navigate('/login', { replace: true });


//     } else {
//       navigate('/todo', { replace: true });
//     }
//   }, []);

// };


const openNotificationWithIcon = (type, des) => {
  notification[type]({
    message: 'Notification Title',
    description: des
  });
};

const PrivateRoute = (token) => {

  return token ? <Outlet /> : <Navigate to='/login' />
}

const ProtectedRoute = (token,
  redirectPath = '/login',
) => {

  return token ? <Outlet /> : <Navigate to={redirectPath} replace />
};

function App() {
  const token = localStorage.getItem("token")


  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Login />} /> */}
            <Route element={<PrivateRoute token={token} />}>
              <Route path="/" element={<Login openNotificationWithIcon={openNotificationWithIcon} />} />
              <Route path="/todo" element={<ListTodo
                openNotificationWithIcon={openNotificationWithIcon}
              />} />
            </Route>

            <Route exact path="/signup" element={<SignUp openNotificationWithIcon={openNotificationWithIcon} />} />
            <Route exact path="/login" element={<Login openNotificationWithIcon={openNotificationWithIcon} />} />
            {/* <Route exact path="/todo"
              element={<ListTodo />} /> */}


            <Route path="/user"
              element={<User token={token}
                openNotificationWithIcon={openNotificationWithIcon}
              />}>
              <Route path=":id" element={<User />} />
            </Route>
          </Routes>
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;