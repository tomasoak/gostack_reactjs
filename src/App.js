import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
      api.get('repositories').then(response => {
        setRepositories(response.data)
      });
    }, []);

    async function handleAddRepository() {
      const response = await api.post('repositories', {
        title: `Novo repositório ${Date.now()}`,
        url: "github.com/tomasoak",
        techs: "Node.js, ReactJS, ",
      });
    
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(repository => repository.id === id)

    //repositories.splice(repositoryIndex, 1)

    const response = await api.delete('repositories/:id', {
      where: { repositoryIndex }
    });

    //setRepositories([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
          {repositories.map(repository => <li key={repository.id}>{repository.title}</li>)}

        
        <button onClick={() => handleRemoveRepository(1)}>
            Remover
        </button>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
