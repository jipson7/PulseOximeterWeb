var trials = {};
const TRIALS_COLLECTION = "trials";

function initializeFirebase() {
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

    return firebase.firestore()
}

function createTrialListener(db) {
    db.collection(TRIALS_COLLECTION).onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(trial) {
                console.log((trial.data()).date);
                trials[trial.id] = trial.data();
            });
            showTrialList();
        });
}

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
    console.log(trialID);
/*    var deviceCollection = db.collection(TRIALS_COLLECTION).doc(trialID).collection("devices");
    deviceCollection.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(device) {
                console.log(device.data());
            });
        }).catch(function(error) {
            console.log("Error getting sub-collection documents", err);
        });*/
}

(function() {
    var db = initializeFirebase();
    createTrialListener(db);
})();