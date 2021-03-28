import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';


export const initializeLogInFramework = () =>{
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      } else {
        firebase.app(); // if already initialized, use that one
      }
}



export const handleGoogleSignIn = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
  
    // console.log("sign in ");
    return  firebase.auth()
     .signInWithPopup(provider)
     .then((result) => {
   
       // The signed-in user info.
       const  {photoURL, displayName,  email} = result.user;
       const signedInUser ={
         isSignedIn:true,
         name:displayName,
         email:email,
         photo:photoURL,
         successful:true
       }
       return signedInUser
       //console.log(displayName , photoURL, email);
       // ...
     })
     .catch (error =>{
       window.alert(error)
       window.alert(error.message)
     })
   }

   export const handleFbSignIn = () =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
   return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      const user = result.user;
      user.successful = true;
      return user;
    //   const accessToken = credential.accessToken;
    //   console.log(user, accessToken);
  
      // ...
    })
    .catch((error) => {
        window.alert(error)
        window.alert(error.message)
  
      // ...
    });
   }

   export const handleSignOut = ()=>{
    return  firebase.auth().signOut()
    .then((res) => {
      // Sign-out successful.
      const signedOutUser = {
      isSignedIn: false,
      name: "",
      photo: "",
        email : "",
        successful: false
      }
      return signedOutUser 
    }).catch((error) => {
      // An error happened.
    });
   }

   export const createUserWithEmailAndPassword = (name, email, password) =>{
    
   return  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user
      newUserInfo.error = ""
      newUserInfo.successful = true
      updateUserInfo(name)
      return newUserInfo
    })
    .catch((error) => {
      const newUserInfo = {}
      newUserInfo.error = error.message
      newUserInfo.successful = false;
      return newUserInfo
      // ..
    });
   }

   export const signInWithEmailAndPassword = (email, password) =>{
   return  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user
      newUserInfo.error = ""
      newUserInfo.successful = true
      return newUserInfo
      // ...
    })
    .catch((error) => {
      const newUserInfo = {}
      newUserInfo.error = error.message
      newUserInfo.successful = false
      return newUserInfo
    });
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


