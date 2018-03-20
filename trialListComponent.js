
var _trials = [];

function createTrialListener(db) {
    db.collection("trials").onSnapshot(function(col) {
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
    db.collection("trials").onSnapshot(function() {});
}

Vue.component('trial-list', {

    props: ['db'],
    data:  function () {
        return {
            trials: _trials
        };
    },
    created: function() {
        createTrialListener(this.$db);
    },
    destroyed: function () {
        destroyTrialListener(this.$db);
    },
    template:
        `
        <div id="trialList" class="list-group">
            <trial-entry :trial="trial" :trialkey="trial.key" 
            v-for="(trial, index) in trials"
            :key="trial.start"></trial-entry>
        </div>
        `
});