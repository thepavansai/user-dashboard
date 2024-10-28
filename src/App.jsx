import React, { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [users, setUsers] = useState([]);
  const [seluser, setSeluser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  const showModal = (user) => {
    setSeluser(user);
  };

  const hideModal = () => {
    setSeluser(null);
  };

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

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOption === 'name') return a.name.localeCompare(b.name);
    if (sortOption === 'username') return a.username.localeCompare(b.username);
    return 0;
  });

  const displayUsers = sortedUsers.length > 0 ? sortedUsers : [];

  return (
    <>
      <div className="app-container" tyle={{ fontFamily: 'Verdana, sans-serif' }}>
      <center><h1>User Dashboard</h1></center>
        <div className='container mt-5'>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search users by name or username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="form-select mb-3" onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
            <option value="" disabled>Sort by</option>
            <option value="name">Name</option>
            <option value="username">Username</option>
          </select>
          <div className='row'>
            {displayUsers.length > 0 ? (
              displayUsers.map(user => (
                <div className="col-md-4 mb-4" key={user.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{user.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">@{user.username}</h6>
                      <button
                        className="btn btn-primary"
                        onClick={() => showModal(user)}
                        aria-label={`View details for ${user.name}`}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p>No users found.</p>
              </div>
            )}
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
      </div>
    </>
  );
}

export default App;