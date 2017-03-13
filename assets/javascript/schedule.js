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
  
  ref.on('value', gotData);

  function gotData(data){
	  
	  var trains = data.val();
	  var keys = Object.keys(trains);
	  for (var i=0; i < keys.length; i++){
		  
		var k = keys[i];
		var trainName = trains[k].name;
		var destination = trains[k].destination;
		var firstTrainTime = trains[k].firstTrain;
		console.log(firstTrainTime);
		var frequency = trains[k].frequency;
		
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
		
		var diffTime = moment().diff(moment.unix(firstTrainTime), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);
		
		var tRemainder = diffTime % frequency;
		console.log(tRemainder);

		// Minute Until Train
		var tMinutesTillTrain = frequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
		console.log(frequency);
		console.log(tRemainder);

		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
		var list = trains[k];
			console.log(list);

		//add the new train to the list
		var tableEntry = $('<tr>');
		 tableEntry.append('<td>'+ list.name +'</td>')
		  .append('<td>'+ list.destination + '</td>')
		  .append('<td>'+ list.frequency + '</td>')
		  .append('<td>'+ moment(nextTrain).format("HH:mm") + '</td>')
		  .append('<td>'+ tMinutesTillTrain +'</td>')
		  $('#trainsList').append( tableEntry );  
	  }
  }
	//connect to the submit button to push the new train up to firebase///
	$("#addTrain").on("click", function(){

		//get the user inputs from the form
		var trainName = $("#nameInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var firstTrainTime = moment($("#timeInput").val().trim(), "HH:mm").format("X");
		console.log("This is the unix time " + firstTrainTime);
		var frequency = $("#frequencyInput").val().trim();
		
		//store the new train data temporarily
		var newTrain = {
			name: trainName,
			destination: destination,
			firstTrain: firstTrainTime,
			frequency: frequency,
		};
		
		ref.push(newTrain);
		//clear out the text boxes and ready for a new train
		$("#nameInput").val("");
		$("#destinationInput").val("");
		$("#timeInput").val("");
		$("#frequencyInput").val("");

	});


  

});//end document.ready