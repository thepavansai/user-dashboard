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
    <h1>Intial Render</h1>
    <ul>
      {
        users.map(user=>(<li key={user.id}>
          Name: {user.name} <br></br>
          Username: {user.username}<br></br>
          Email: {user.email}<br></br>
          Address<br></br>
          City:{user.address.city}

        </li>))
      }
    </ul>
  </>);

}
export default App;