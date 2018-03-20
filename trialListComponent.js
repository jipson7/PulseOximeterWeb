
const TRIALS_COLLECTION = "trials";
var _trials = [];

function createTrialListener(db) {
    db.collection(TRIALS_COLLECTION).onSnapshot(function(col) {
        console.log("Updates Received: " + col.size);
        console.log("Clearing Trials...");
        _trials.length = 0;
        col.forEach(function(trial) {
            var entry = trial.data();
            entry.key = trial.id;
            _trials.push(entry);
        });
    });
}

function destroyTrialListener(db) {
    db.collection(TRIALS_COLLECTION).onSnapshot(function() {});
}

Vue.component('trial-list', {

    props: ['db'],
    data:  function () {
        return {
            trials: _trials
        };
    },
    methods: {
        getDevices: function(trialKey) {
            console.log(trialKey);
        }
    },
    created: function() {
        createTrialListener(this.db);
    },
    destroyed: function () {
        destroyTrialListener(this.db);
    },
    template:
        `
        <div id="trialList" class="list-group">
            <button v-for="(trial, index) in trials"
                    type="button"
                    v-on:click="getDevices(trial.key)"
                    class="list-group-item list-group-item-action">
                {{trial.date}}
            </button>
        </div>
        `
});

// function getDevicesForTrial(trialKey) {
//     console.log(trialKey);
//         var deviceCollection = db.collection(TRIALS_COLLECTION).doc(trialID).collection("devices");
//         deviceCollection.get()
//             .then(function(querySnapshot) {
//                 querySnapshot.forEach(function(device) {
//                     console.log(device.data());
//                 });
//             }).catch(function(error) {
//                 console.log("Error getting sub-collection documents", err);
//             });
// }