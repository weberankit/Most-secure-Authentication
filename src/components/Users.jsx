import { useState, useEffect } from "react";
//import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../utils/useAxiosPrivate";
import axios from "axios";
const Users = () => {
    const [users, setUsers] = useState();
   const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    //const axiosPrivate=useAxiosPrivate
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
   /*
 Steps to Use AbortController with Axios:
Create a new AbortController instance.
Pass controller.signal to the Axios request configuration.
Call controller.abort() to cancel the request.
    */
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                //if refersh token expired then move to login
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default Users;
