import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://reqres.in/api/users?page=1';

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <nav>
        <h1>Brand User</h1>
        <button onClick={getUsers} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Get Users'}
        </button>
      </nav>
      <div className="card-grid">
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          users.map((user) => (
            <div className="card" key={user.id}>
              <img src={user.avatar} alt={user.first_name} />
              <h3>{`${user.first_name} ${user.last_name}`}</h3>
              <p>{user.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;