import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from "react";
import { userContext } from "../../App";
import { firebaseConfig } from './firebase.config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
  
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

const [loggedInUser ,  setLoggedInUser] =useContext(userContext)

 const handleSignIn = () =>{
  const provider = new firebase.auth.GoogleAuthProvider();

  // console.log("sign in ");
   firebase.auth()
   .signInWithPopup(provider)
   .then((result) => {
 
     // The signed-in user info.
     const  {photoURL, displayName,  email} = result.user;
     const signedInUser ={
       isSignedIn:true,
       name:displayName,
       email:email,
       photo:photoURL
     }
     setUser(signedInUser)
     console.log(displayName , photoURL, email);
     // ...
   })
   .catch (error =>{
     window.alert(error)
     window.alert(error.message)
   })
 }


 const handleFbSignIn = () =>{
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    const credential = result.credential;
    const user = result.user;
    const accessToken = credential.accessToken;
    console.log(user, accessToken);

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
    console.log(errorCode, errorMessage, email, credential);

    // ...
  });
 }


 const handleSignOut = ()=>{
  firebase.auth().signOut()
  .then((res) => {
    // Sign-out successful.
    const signedOutUser = {
    isSignedIn: false,
    name: "",
    photo: "",
      email : "",
    }
    setUser(signedOutUser)
  }).catch((error) => {
    // An error happened.
  });
 }


 const handelSubmit = (e) =>{
  if( newUser && user.email && user.password){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  .then((res) => {
    const newUserInfo = {...user}
    newUserInfo.error = ""
    newUserInfo.successful = true
    setUser(newUserInfo)
    setLoggedInUser(newUserInfo)
    updateUserInfo(user.name)
  })
  .catch((error) => {
    const newUserInfo = {...user}
    newUserInfo.error = error.message
    newUserInfo.successful = false
    setUser(newUserInfo)
    // ..
  });
  }

  if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then((res) => {
    const newUserInfo = {...user}
    newUserInfo.error = ""
    newUserInfo.successful = true
    setUser(newUserInfo)
    setLoggedInUser(newUserInfo)
    console.log("sign in", res.user);
    // ...
  })
  .catch((error) => {
    const newUserInfo = {...user}
    newUserInfo.error = error.message
    newUserInfo.successful = false
    setUser(newUserInfo)
  });
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


 const updateUserInfo = name =>{
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: "name",
  })
  .then(function() {
  })
  .catch(function(error) {
    console.log(error);
  });
 }


 
  return (
    <div style={{textAlign : "center"}}>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : 
        <button onClick={handleSignIn}>Sign in</button>
      }
     <button onClick={handleFbSignIn}>Sign in With Facebook</button>
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