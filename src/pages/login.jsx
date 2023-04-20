
import {useState} from "react";

function Login(){
    const [password, setPassword] = useState("")
    const [loginDetails, setLoginDetails] = useState("")

    const adminLogin = "admin@codehesion.co.za"
    const pwd = "P@ssword1"

    let details = {
        'grant_type': 'password',
        "client_id": "web-dashboard",
        "client_secret": "SuperSecretPassword",
        "scope": "openid profile role email offline_access adminApi mobileApi",
    };

    async function handleSubmit(e){
        e.preventDefault()
        const user = {
            "password": password,
            "username": loginDetails,
            'grant_type': 'password',
            "client_id": "web-dashboard",
            "client_secret": "SuperSecretPassword",
            "scope": "openid profile role email offline_access adminApi mobileApi",
        };

        var formBody = [];
        for (var property in user){
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log(formBody)

       const response = await fetch('https://edeaf-api-staging.azurewebsites.net/connect/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(user)
        })

        const data = await response.json()
        const accessToken = data.access_token
        console.log(accessToken)
        localStorage.setItem("SavedToken", 'Bearer ' + accessToken)

        if( password=== pwd && loginDetails === adminLogin){
            alert("You have successfully Logged in, Please press ok to proceed")
            window.location.href= '/home'
        } else{
            alert("Log in failed, please re-check your credentials")
        }

    }

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Login Username:</label>
                <input
                type="email"
                value={loginDetails}
                onChange={(e) => setLoginDetails(e.target.value)}
                />

                <label>Password:</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login