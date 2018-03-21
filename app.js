function createApp(db) {
    return new Vue({
        el: '#app'
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