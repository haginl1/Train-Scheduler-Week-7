$( document ).ready(function() {   
	
	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDiPyIdVc-q9q3bqSvsUd1gmTJmb5NqgPw",
    authDomain: "trainschedule-2d638.firebaseapp.com",
    databaseURL: "https://trainschedule-2d638.firebaseio.com",
    storageBucket: "trainschedule-2d638.appspot.com",
    messagingSenderId: "771315111"
  };
  firebase.initializeApp(config);

  var trainschedule = firebase.database();

	//connect to the submit button to push the new train up to firebase///
	$("#addTrain").on("click", function(){

		//get the user inputs from the form
		var trainName = $("#nameInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var firstTrainTime = $("#timeInput").val().trim();
		var frequency = $("#frequencyInput").val().trim();

		//store the new train data temporarily
		var newTrain = {
			name: trainName,
			destination: destination,
			firstTrain: firstTrainTime,
			frequency: frequency
		}
		console.log(newTrain);

		//push this temp train stuff to firebase
		// trainschedule.push(newTrain);
		trainschedule.ref().set({
        name: trainName,
		destination: destination,
		firstTrain: firstTrainTime,
		frequency: frequency
      });

		//clear out the text boxes and ready for a new train
		$("#nameInput").val("");
		$("#destinationInput").val("");
		$("#timeInput").val("");
		$("#frequencyInput").val("");
	});

});//end document.ready