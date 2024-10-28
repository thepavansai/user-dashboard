import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [seluser,setSeluser]=useState(null);

  const showModal=(user)=>{
    setSeluser(user);
  };
  const hideModal=()=>{
    setSeluser(null);
  }
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        
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
      {seluser && (
                    <div className="modal show" style={{ display: 'block' }} onClick={hideModal}>
                        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{seluser.name}</h5>
                                    <button type="button" className="btn-close" onClick={hideModal}></button>
                                </div>
                                <div className="modal-body">
                                    <p><strong>Address:</strong> {seluser.address.street}, {seluser.address.city}</p>
                                    <p><strong>Phone:</strong> {seluser.phone}</p>
                                    <p><strong>Website:</strong> {seluser.website}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
    </div>
  </>);

}
export default App;