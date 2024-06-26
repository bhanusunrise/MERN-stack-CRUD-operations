import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface User {
  _id: any;
  name: string;
  email: string;
  age: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      name: "Yousuf", email: "yousuf@gmail.com", age: "20",
      _id: undefined
    },
  ]);

  useEffect(() =>{
    axios.get('http://localhost:3001')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className = "btn btn-success">Add +</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/update/${user._id}`} className = "btn btn-warning">Update</Link>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
