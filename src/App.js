import React, { useEffect, useState } from "react";

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        try {
            const res = await fetch("https://jaykkumar01.onrender.com/users");
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const handleSubmit = async (userName) => {
        if (!userName) return;
        setLoading(true);
        try {
            await fetch("https://jaykkumar01.onrender.com/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: userName }),
            });
            await fetchUsers();
            setName("");
        } catch (err) {
            console.error("Error creating user:", err);
        } finally {
            setLoading(false);
        }
    };

    const generateRandomName = () =>
        Array.from({ length: 6 }, () =>
            String.fromCharCode(97 + Math.floor(Math.random() * 26))
        ).join("");

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 400, margin: "auto" }}>
            <h1>Users</h1>

            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ flex: 1, padding: 5 }}
                />
                <button onClick={() => handleSubmit(name)} disabled={!name || loading}>
                    {loading ? "Creating..." : "Create"}
                </button>
            </div>

            <button
                onClick={() => handleSubmit(generateRandomName())}
                disabled={loading}
                style={{ marginBottom: 20 }}
            >
                {loading ? "Creating..." : "Add Random Name"}
            </button>

            {users.length === 0 ? (
                <p>Loading users...</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
