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
 


//connect to the submit button to push the new train up to firebase///
	$("#addTrain").on("click", function(){
		
		// Don't refresh the page!
        event.preventDefault();

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
		//send the new train to the database
		ref.push(newTrain);
		
		//clear out the text boxes and ready for a new train
		$("#nameInput").val("");
		$("#destinationInput").val("");
		$("#timeInput").val("");
		$("#frequencyInput").val("");
		$("#trainBody").empty;
	});
		//naming the database
		trainschedule= firebase.database();
		//shortening the db name and creating the trains node
		var ref = trainschedule.ref("trains")

		ref.on('value', gotData);
		function gotData(data){
			var trains = data.val();
			var keys = Object.keys(trains);
			//loop through the trains and get their values
			$("#trainBody").empty();
			for (var i=0; i < keys.length; i++){
				var k = keys[i];
				var trainName = trains[k].name;
				var destination = trains[k].destination;
				var firstTrainTime = trains[k].firstTrain;
				var frequency = trains[k].frequency;
				//calcualte the times to next train for each train
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
				
				$("#trainsList").append(
					"<tr>" +
					"<td>" + list.name  + "</td>" +
					"<td>" + list.destination + "</td>" +
					"<td>" + list.frequency + "</td>" +
					"<td>" + moment(nextTrain).format("HH:mm") + "</td>" +
					"<td>" + tMinutesTillTrain + "</td>" + "</tr>"
					);
			}
		}
	


  

});//end document.ready