
var _trials = [];

var _trialUnsubscribe = null;

Vue.component('trial-list', {

    props: ['db'],
    data:  function () {
        return {
            trials: _trials
        };
    },
    created: function() {
        _trialUnsubscribe = this.$db.collection("trials").onSnapshot(function(col) {
            _trials.length = 0;
            col.forEach(function(entry) {
                var trial = entry.data();
                trial.key = entry.id;
                trial.devices = [];
                _trials.push(trial);
            });
        });
    },
    destroyed: function () {
        _trialUnsubscribe();
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