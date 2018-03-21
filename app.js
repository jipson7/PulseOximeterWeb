function getDataConnections(trials) {
    _dataConnections.length = 0;
    trials.forEach(function(trial) {
        trial.devices.forEach(function(device) {
            if (device.selected) {
                console.log("adding connection");
                _dataConnections.push({
                    trial: trial.key,
                    device: device.key
                });
            }
        });
    });
}

function createApp(db) {
    return new Vue({
        el: '#app',
        methods: {
            analyze: function() {
                getDataConnections(_trials);
            }
        }
    });
}

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


(function() {
    Vue.prototype.$db = initializeFirebase();
    createApp();
})();