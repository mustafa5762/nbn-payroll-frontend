import "./index.css"

const Login = () => {



    return (
        <div style={{display: "block"}}>
        <hr />
        <div className="login">
           <div className="heading"><h1>Sign In</h1></div> 
            <div className="label">
                <h5>Username</h5>
                <input  />
            </div>

            <div className="label">
                <h5>Password</h5>
                <input  />
            </div>
         </div>
        </div>
    )
}

export default Login;