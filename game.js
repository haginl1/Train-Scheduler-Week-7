	// Initialize Firebase
 $( document ).ready(function() {   

  var initials= $('#initials').val();
  var config = {
    apiKey: "AIzaSyBELUGkaJ9z5DHxW02PWr5ty-DGx81_t8E",
    authDomain: "clickcountdown-2be5d.firebaseapp.com",
    databaseURL: "https://clickcountdown-2be5d.firebaseio.com",
    storageBucket: "clickcountdown-2be5d.appspot.com",
    messagingSenderId: "621779805935"
  };
  
  firebase.initializeApp(config);
  console.log(firebase);

  var database= firebase.database();   //may database in a variable
  var ref=database.ref('scores');
  var data = {
      name: "LAH",
      score: 43
  }
    ref.push(data);
 


 function increaseScore(){
     score++;
 }

});//end document.ready