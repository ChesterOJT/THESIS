const firebaseConfig = {
  apiKey: "AIzaSyAJnBJDnb4F6yfRUAZecsX-GPiXmrO6K3o",
  authDomain: "working-ba4f3.firebaseapp.com",
  projectId: "working-ba4f3",
  storageBucket: "working-ba4f3.appspot.com",

  messagingSenderId: "170127063382",
  appId: "1:170127063382:web:d90e7415f30a11bb00bef7",
  measurementId: "G-TTHR04NDRL",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://working-ba4f3-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

async function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  try {
    const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
    listUsersResult.users.forEach((userRecord) => {
      console.log("user", userRecord.toJSON());
    });
    if (listUsersResult.pageToken) {
      // List next batch of users.
      listAllUsers(listUsersResult.pageToken);
    }
  } catch (error) {
    console.log("Error listing users:", error);
  }
}

listAllUsers();

function displayUsers(users) {
  const table = document.getElementById("userTable");
  users.forEach((user) => {
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = `<div class="imgBx"><img src="path_to_image.jpg" alt="User Image"/></div>`;
    cell2.innerHTML = `<h4>${user.displayName}<br><span>${user.email}</span></h4>`;
  });
}
