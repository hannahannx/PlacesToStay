import React from "react";

function LoginUser() {

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loginStatus, setLoginStatus] = React.useState("");

  return (
    <div className="mainContentDiv">
      <input id="username" placeholder="Username..." onClick={updateUsername} />
      <input id="password" placeholder="Password..." onClick={updatePassword} />
      <button onClick={login}> Login </button>
      <div>
        {loginStatus}
      </div>
    </div>
  );

  function updateUsername() {
    setUsername(document.getElementById('username').value);
  }

  function updatePassword() {
    setPassword(document.getElementById('password').value);
  }

  async function login() {
    const userInfo = {
      "username": "tim",
      "password": "tim123"
    }
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
        
      });
      if (response.status == 200) {
        alert(`Successfully logged in as...${updateUsername} `)
      } else if (response.status == 400) {
        alert("You have blank fields in at least one input");
      } else {
        alert(`Unknown error: code ${response.status}`);
      }
    } catch (error) {
      res.status(404).json({ error: "Sorry we couldnt access this login" });
    }
  }
}


//exporting the function
export default LoginUser