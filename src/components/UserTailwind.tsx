import { useState } from "react";

interface User {
  name: string;
  avatar_url: string;
}

function UserTailwind() {
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
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Buscar Usuário (TailwindCSS)</h1>
      <input
        type="text"
        className="p-2 border rounded-md mr-2"
        placeholder="Digite o nome do usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        onClick={fetchUser}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Buscar
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {userData && !error && (
        <div>
          <h2>{userData.name}</h2>
          <img src={userData.avatar_url} alt="Avatar" width="100" />
        </div>
      )}
    </div>
  );
}

export default UserTailwind;
