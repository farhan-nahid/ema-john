import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../App";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLogInFramework, signInWithEmailAndPassword } from './LoginManager';



  
function Login() {
  const [newUser, setNewUser] = useState(false)
const [user, setUser] = useState({
  isSignedIn : false,
  name : "",
  email: "",
  photo: "",
  password: "",
  error: "",
  successful: false,
})

initializeLogInFramework()



const [loggedInUser ,  setLoggedInUser] =useContext(userContext)
const history = useHistory()
const location = useLocation()
let { from } = location.state || { from: { pathname: "/" } };

const googleSignIn = ()=> {
  handleGoogleSignIn()
    .then ((res) => {
      handleResponse(res, true)
    })
}

const facebookSignIn = () => {
  handleFbSignIn()
  .then ((res) => {
    handleResponse(res, true)
  })
}



const signOut = () => {
  handleSignOut()
  .then ((res) => {
    handleResponse(res, false)
  })
}
 


 const handelSubmit = (e) =>{
  if( newUser && user.email && user.password){
    createUserWithEmailAndPassword(user.name,user.email, user.password)
      .then ((res) => {
        handleResponse(res, true)

      })
  }

  if(!newUser && user.email && user.password){
    signInWithEmailAndPassword(user.email, user.password)
     .then ((res) => {
      handleResponse(res, true)
    })
  }
  e.preventDefault()
 }


 const handelBlur = (e) =>{
   let isFieldValid = true;        
  if(e.target.name === "email"){
    isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
  } if(e.target.name === "password"){
    const isPasswordValid = e.target.value.length > 6;
    const passwordHasNumber =  /\d{1}/.test(e.target.value)
    isFieldValid = isPasswordValid && passwordHasNumber
  }
  if(isFieldValid){
    const newUserInfo = {...user}
    newUserInfo[e.target.name] = e.target.value
    setUser(newUserInfo)
  }
 }

 const handleResponse= (res, redirect)=> {
  setUser(res)
  setLoggedInUser(res)
  if(redirect){
    history.replace(from);
  }
 }
 
  return (
    <div style={{textAlign : "center"}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : 
        <button onClick={googleSignIn}>Sign in With Google</button>
      }
     <button onClick={facebookSignIn}>Sign in With Facebook</button>
     {
       user.isSignedIn && <>
       <h4>WellCome {user.name}</h4>
       <h6>{user.email}</h6>
       <img src={user.photo} alt=""/>
       </>
     }

     <h1>Our own Authentication</h1>
     
     <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
     <label htmlFor="newUser"> New User Sign Up</label>
     <form action="" onSubmit={handelSubmit}>
       {newUser && <input type="text" onBlur={handelBlur} name="name" placeholder="Your Name"/>}
       <br/>
       <input type="email" onBlur={handelBlur} name="email" placeholder="Your Email Address" required/>
       <br/>
       <input type="password" onBlur={handelBlur} name="password" placeholder="Your Password" required/>
       <br/>
       <input type="submit" value={newUser ? "Sign Up" : "Sign In"}/>
     </form>
     {user.successful && <p style={{color: 'green'}}>User {newUser ?  "Created" : "LogIn"} Successfully</p>}
     <p style={{color: 'red'}}>{user.error}</p>
     
    </div>
  );
}

export default Login;