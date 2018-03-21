
var _dataListeners = {};
var _chartData = {}

function dataListener(collection) {
    collection.forEach(function(entry) {
       var timestamp = entry.id;
       var data = entry.data();
       console.log(timestamp);
    });
};


function createDataListeners(db) {

    _trials.forEach(function(trial) {
        trial.devices.forEach(function(device) {
            if (device.selected) {
                var listenerKey = "" + trial.key + device.key;
                var listener = db.collection("trials").doc(trial.key)
                    .collection("devices").doc(device.key).collection("data")
                    .onSnapshot(dataListener);
                _dataListeners[listenerKey] = listener;
            }
        });
    });
}

Vue.component('data-view', {
    methods: {
        analyze: function() {
            createDataListeners(this.$db);
        }
    },
    template:
        `
        <div>
            <button v-on:click="analyze" type="button" class="btn btn-success btn-block">Analyze</button>
            <hr>
        </div>
        `
});