import {useState} from "react";

function Register(){
    const[name, setName] = useState("")
    const[surname, setSurname]= useState("")
    const[email,setEmail] = useState("")
    const[role, setRole] = useState("")

    async function handleSubmit(e){
        const user = {name,surname,email,role}
        const response = await fetch(`${import.meta.env.VITE_HOST}/v1/admin/Users`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })

        const data = await response.data
        console.log(response)
    }

    return(
        <div>
            <h2>Registration:</h2>
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
    )
}

export default Register