
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBKkJ72xZVPA8CX4ETB2YVZ4gcBAfv1mIU",
    authDomain: "pulseoximeterapp.firebaseapp.com",
    databaseURL: "https://pulseoximeterapp.firebaseio.com",
    projectId: "pulseoximeterapp",
    storageBucket: "pulseoximeterapp.appspot.com",
    messagingSenderId: "299724722089"
};
firebase.initializeApp(config);

var db = firebase.firestore()

var trials = {};

var trialsCollection = db.collection("trials");

function populateTrials(trialsQuery) {
    trialsQuery.forEach(function(trial) {
        trials[trial.id] = trial.data();
        trials
    });
}

trialsCollection.get()
.then(function(querySnapshot) {
    populateTrials(querySnapshot);
    showTrialList();
}).catch(function(error) {
    console.log("Error getting documents: ", error);
});

function showTrialList() {
    return new Vue({
        el: '#trialList',
        data: {
            trials: trials
        },
        methods: {
            trialClick: function (trialID) {
                getDevicesForTrial(trialID);
            }
        }
    });
}

function getDevicesForTrial(trialID) {
    var deviceCollection = trialsCollection.doc(trialID).collection("devices");
    deviceCollection.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(device) {
                console.log(device.data());
            });
        }).catch(function(error) {
            console.log("Error getting sub-collection documents", err);
        });
}