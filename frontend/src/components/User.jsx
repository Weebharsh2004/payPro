import { useEffect, useState } from "react";
import { ButtonCom } from "./ButtonCom";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [wantedUsers, setWantedUsers] = useState();

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${wantedUsers}`)
        .then(response=>{
            setUsers(response.data.users)
        })
    },[wantedUsers])

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">User List</h1>
            <div className="mb-4">
                <input
                    onChange={(e)=>{
                        setWantedUsers(e.target.value);
                    }}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div>
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </div>
    );
}

function User({ user }) {
    const { firstName, lastName } = user;
    
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-md">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center mr-4">
                    <span className="text-xl text-gray-800 font-bold">{firstName[0]}</span>
                </div>
                <div>
                    <p className="text-xl font-semibold text-gray-800">{firstName} {lastName}</p>
                </div>
            </div>
            <div className="flex items-center">
                <ButtonCom onClick={(e)=>{
                    navigate(`/sendMoney?id=${user._id}&name=${user.firstName}`);
                }} label="Send Money" />
            </div>
        </div>
    );
}
