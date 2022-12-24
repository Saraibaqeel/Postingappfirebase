import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getFirestore,
  collection,
    onSnapshot,
    orderBy,
    updateDoc,

} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {
  getDoc,
  addDoc,
   query, where, getDocs
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  signOut
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

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
const db = getFirestore();
let main=document.getElementById("posting1")
let text = document.getElementById("text");
let postbtn = document.getElementById("post-btn")



onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    
    
    console.log(uid)
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data())
     main.innerHTML+=`
      <div class="imag_wrapper">
     <img  src="${docSnap.data().url}" style="width:50px; height:50px; border-radius:50%; border:2px solid gray; background-size:cover;"  > ${docSnap.data().name}`
    
     document.getElementById("image").innerHTML=`<img  src="${docSnap.data().url}" style="width:50px; height:50px; border-radius:50%; border:2px solid gray; background-size:cover;"  >`
    postbtn.addEventListener("click", async () => {
      
     
      console.log(text.value)
      const docRef = await addDoc(collection(db, "Posts"), {
        name:docSnap.data().name,
        post:text.value,
        url:docSnap.data().url,
        userid:uid,
        timestamp: new Date(),
        
      });
      console.log("Document written with ID: ", docRef.id);
      
     console.log(text.value=" ")
    
    })
    const q = query(collection(db, "Posts"), orderBy("timestamp", "desc"));
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const unsubscribe = onSnapshot(q, (querySnapshot) => {

  document.getElementById("list").innerHTML=""
  const cities = [];
  querySnapshot.forEach((doc) => {
    let postTime = doc.data().timestamp.seconds.toString() + doc.data().timestamp.nanoseconds / 1000000
      postTime = Number(postTime)
      postTime = new Date(postTime)
console.log(postTime)
      cities.push(doc.data().post);
      document.getElementById("list").innerHTML+=`<div class="total-posts animate__animated animate__fadeInDown">
      <div class="posted-box">
      <img  src="${doc.data().url}" style="width:50px; height:50px; background-size:cover; border-radius:60%; border:2px solid gray;"  >
      <span class="username">${doc.data().name} <div> <sub>${postTime.getDate()} ${mS[postTime.getMonth()]} <i class="fa-solid fa-earth-europe"></i> </sub> </div>

      <hr>
      <div class="post1">
      ${doc.data().post}
      </div>
      <hr>
      </div>
      </div>
      `
      
      
  });
  
});


    

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      document.getElementById("uname").innerHTML=docSnap.data().name;
      
      let logout = document.getElementById("logout-btn")
      logout.addEventListener("click", () => {

        signOut(auth).then(() => {
          window.location.href = "signin.html"

        }).catch((error) => {
          // An error happened.
        });



      })

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    // ...
  } else {
    // User is signed out
    // ...
  }
});

let users=document.getElementById("friends")
users && users.addEventListener("click",async()=>{
  
  const q = query(collection(db, "Users"));
  
  const querySnapshot = await getDocs(q);
  document.getElementById("modal").innerHTML=` `
  querySnapshot.forEach((doc) => {
    document.getElementById("modal").innerHTML+=`<div> <img  src="${doc.data().url}" style="width:50px; height:50px; background-size:cover; border-radius:60%; border:2px solid gray;"  > ${doc.data().name}</div><br>`
    
    console.log(doc.id, " => ", doc.data());
  });

  


})