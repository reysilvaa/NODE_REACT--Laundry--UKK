import React from 'react';
import axios from "axios"
import { base_url } from "../config.js";
import './login.scoped.css';

class Login extends React.Component {
    constructor(){
      super();
      this.state = {
        username: "",
        password: "",
        role: "",
        message: "",
        logged: true
    };
    }
    Login = event => {
      event.preventDefault()
      let sendData = {
          username: this.state.username,
          password: this.state.password
      }

      let url = base_url + "/user/auth"
      

      axios.post(url, sendData)
      .then(response => {
          this.setState({logged: response.data.logged})
          if (this.state.logged) {
            let admin = response.data.data
            let role = response.data.data.role
            let token = response.data.token
            let username = response.data.data.username
            localStorage.setItem("admin", JSON.stringify(admin))
            localStorage.setItem("role", role)
            localStorage.setItem("username", username)
            localStorage.setItem("token", token)

            if(role === "admin"){
                window.location = "/"
            }
            else if(role === "kasir"){
                window.location = "/dashboard"
            }
            else if(role === "owner"){
                window.location = "/dasbor"
            }
        } else {
            this.setState({message: response.data.message})
            alert("Kesalahan Password atau Username !")
        }
    })
    .catch(error => console.log(error))
}

 
  render() {
   
    return (
     
       <div className="maincontainer">
        <div class="container-fluid">
            <div class="row no-gutter">
               
                <div class="col-md-6 d-none d-md-flex bg-image"></div>


                
                <div class="col-md-6 bg-light">
                    <div class="login d-flex align-items-center py-5">

                       
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-10 col-xl-7 mx-auto">
                                    <h3 class="display-4">Welcome !</h3>
                                    <p class="text-muted mb-4">Login Page </p>
                                    <form onSubmit={ev => this.Login(ev)}>
                                        <div class="form-group mb-3">
                                            <input value={this.state.username} type="text" placeholder="Username" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4"  onChange={ev => this.setState({username: ev.target.value})}/>
                                        </div>
                                        <div class="form-group mb-3">
                                            <input value={this.state.password} type="password" placeholder="Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" onChange={ev => this.setState({password: ev.target.value})} autoComplete="false"/>
                                        </div>
                                        <div class="custom-control custom-checkbox mb-3">
                                            <input id="customCheck1" type="checkbox" checked class="custom-control-input" />
                                            <label for="customCheck1" class="custom-control-label">Remember password</label>
                                        </div>
                                        <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Login</button>
                                        <div class="text-center d-flex justify-content-between mt-4"><p> <a href="" class="font-italic text-muted"> 
                                                <u></u></a></p></div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
      </div>
      
)
};
}

export default Login;
