import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
 import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
 import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
 import { sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
 import { doc, setDoc,getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"; 
 import { getDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyCd1cTDXw0F1s0s5YwosLqHfvUSOomgP-M",
   authDomain: "login-ea4af.firebaseapp.com",
   projectId: "login-ea4af",
   storageBucket: "login-ea4af.appspot.com",
   messagingSenderId: "93480888224",
   appId: "1:93480888224:web:1b4fc925cb1d5fdba7e6c5",
   measurementId: "G-1YCRBD0D6D"
 };

 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const auth = getAuth();
 const db=getFirestore();
 let logbutton=document.getElementById("button2")
 console.log(logbutton)
 logbutton.addEventListener("click",function(){
 let loginemail=document.getElementById("login-email")
 let loginpassword=document.getElementById("login-password")

 let show=document.getElementById("pp")

 signInWithEmailAndPassword(auth, loginemail.value, loginpassword.value)
  .then( async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    window.location.href="user.html"
    console.log("Singed In")
    
    // ...
    const docRef = doc(db, "Users", userCredential.user.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }


  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorCode,
      
    })

  });


  sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    // ...
    console.log("sent")
  });

 })
 


