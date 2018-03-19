
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

var trials = [];

db.collection("trials").get()
.then(function(querySnapshot) {
    querySnapshot.forEach(function(trial) {
        trials.push(trial.data());
    });
    var trialList = showTrialList();
}).catch(function(error) {
    console.log("Error getting documents: ", error);
});

function showTrialList() {
    return new Vue({
        el: '#trialList',
        data: {
            trials: trials
        },
        created: function() {
            console.log(this.trials);
        },
        methods: {
            trialClick: function (trial) {
                console.log(trial.date);
            }
        }
    });
}