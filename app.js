import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
 import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
 import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
 import { sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
 import { doc, setDoc,getFirestore,updateDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"; 
 import { getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL, } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
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

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const auth = getAuth();
 const db=getFirestore();
 let btn=document.getElementById("button1")
 console.log(btn)
 btn.addEventListener("click",function(){
  let email=document.getElementById("name");
  let pw=document.getElementById("password");
let fullname=document.getElementById("name1");

  var newPassword = pw.value;
  var minNumberofChars = 6;
  var maxNumberofChars = 16;
 
 
  
  if(newPassword.length < minNumberofChars || newPassword.length > maxNumberofChars){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: "Password length must be greater than 6",
      
    })
    return false;
  }
  
  

 


  createUserWithEmailAndPassword(auth,email.value, pw.value)
  .then(async(userCredential) => {

   
    console.log(userCredential)


    console.log("user")
    
    
    
    const uploadFiles = (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        let uid = auth.currentUser.uid;
       
        const storageRef = ref(storage, `Users/${uid}.png`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");

            if(progress==100){
              swal("Account Successfully Created!", "", "success");
            }
            
           
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                
             
                
                break;
            }
          
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };
    let myFile = document.getElementById("my-file");
    let file = myFile.files[0];
    
    
    let url = await uploadFiles(file);
    
    const user = userCredential.user;
    console.log(user.uid)
    await setDoc(doc(db, "Users", user.uid), {
      name:fullname.value,
      email: email.value ,
      password: pw.value,
      url:url,
    });
  
    if(swal){
      email.value=""
      pw.value=""
      fullname.value=""
      myFile.value=""
      }


    // ...
  })
  .catch((error) => {
     console.log("error")
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    
    // ..
  });

 })


 