import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Input = styled.input`
  padding: 8px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

interface User {
  name: string;
  avatar_url: string;
}

function UserStyled() {
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  const fetchUser = async () => {
    if (!username) return;

    setError(""); // Limpa erro anterior
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      const data = await res.json();

      if (res.ok) {
        setUserData(data);
      } else {
        setError("Usuário não encontrado.");
        setUserData(null);
      }
    } catch (error) {
      setError("Erro ao buscar dados.");
    }
  };

  return (
    <Container>
      <h1>Buscar Usuário (Styled-Components)</h1>
      <Input
        type="text"
        placeholder="Digite o nome do usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button onClick={fetchUser}>Buscar</Button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {userData && !error && (
        <div>
          <h2>{userData.name}</h2>
          <img src={userData.avatar_url} alt="Avatar" width="100" />
        </div>
      )}
    </Container>
  );
}

export default UserStyled;
