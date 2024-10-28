import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        console.log(response.data);
      } catch (er) {
        console.error("Error fetching users: ", er);
      }
    };

    fetchUsers();
  }, []);

  return (<>
    <div className='container mt-5'>
      <h1>User Dashboard</h1>
      <div className='row'>
      {users.map(user => (
                <div className="col-md-4 mb-4" key={user.id}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">@{user.username}</h6>
                            <button className="btn btn-primary" onClick={() => showModal(user)}>View Details</button>
                            </div>
                    </div>
                </div>
            ))}
      </div>
    </div>
  </>);

}
export default App;