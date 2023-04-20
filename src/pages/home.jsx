import {useState} from "react";
import Categories from "../../components/categories.jsx";

function Home() {
    const [isEditMode, setIsEditMode] = useState(false)
    const [name, setName] = useState("test")
    const [surname, setSurname] = useState("test")
    const [email, setEmail] = useState("test@gmail.com")
    const [role, setRole] = useState("Administrator")

    async function handleSubmit(e) {
        e.preventDefault()
        const user = {name, surname, email, role}
        const response = await fetch(`${import.meta.env.VITE_HOST}/v1/admin/Users`, {
            method: "POST",
            headers: {"Content-Type": "application/json", Authorization: localStorage.getItem("SavedToken")},
            body: JSON.stringify(user)
        })

        const data = await response.data
        console.log(response)
        setIsEditMode(false)
    }

    function showForm() {
        setIsEditMode(true)
    }

    return (
        <div>
            {isEditMode ? (
                <div>
                    <h2>Add user:</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>Surname:</label>
                        <input
                            type="text"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />

                        <label>E-Mail:</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Role:</label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}/>
                        <button type="submit">Submit Details</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h1>Dashboard</h1>
                    <button type="button" onClick={showForm}>Add user</button>
                    <Categories/>
                </div>
            )}
        </div>
    );
}

export default Home;


