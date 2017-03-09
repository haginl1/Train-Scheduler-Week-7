$( document ).ready(function() {   

var trainschedule;

	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDiPyIdVc-q9q3bqSvsUd1gmTJmb5NqgPw",
    authDomain: "trainschedule-2d638.firebaseapp.com",
    databaseURL: "https://trainschedule-2d638.firebaseio.com",
    storageBucket: "trainschedule-2d638.appspot.com",
    messagingSenderId: "771315111"
  };
  
  firebase.initializeApp(config);
  trainschedule= firebase.database();

  var ref = trainschedule.ref("trains")
  
  ref.on('value', gotData, errData);

  function gotData(data){
	  
	  var trains = data.val();
	  var keys = Object.keys(trains);
	  
	  var trainTable = $("#trainList").val(trains);
	  for (var i=0; i < keys.length; i++){
		  
		  var k = keys[i];
		  var trainName = trains[k].name;
		  var destination = trains[k].destination;
		  var firstTrainTime = trains[k].firstTrain;
		  var frequency = trains[k].frequency;
		   
		  console.log(trains[k]);
	  }
  }


  function errData(err) {

  }
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
		
		ref.push(newTrain);
	
		//clear out the text boxes and ready for a new train
		$("#nameInput").val("");
		$("#destinationInput").val("");
		$("#timeInput").val("");
		$("#frequencyInput").val("");

	});
		//add the new train to the list 


});//end document.ready