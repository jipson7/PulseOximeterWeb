var _chartData = {};

var _dataListeners = {};

var _keys = {
    hr: 'hr',
    o2: 'oxygen',
    red_led: 'red_led',
    ir_led: 'ir_led'
}

function setChartData(timestamp, data, trial, device) {
    var listenerKey = "" + trial.key + device.key;
    if (!(listenerKey in _chartData)) {
        var newChart = {};
        newChart[_keys.hr] = {};
        newChart[_keys.o2] = {};
        newChart[_keys.red_led] = {};
        newChart[_keys.ir_led] = {}
        newChart['device'] = device.description;
        newChart['start'] = trial.start;
        newChart['end'] = trial.end;
        _chartData[listenerKey] = newChart;
    }
    if (_keys.hr in data) {
        _chartData[listenerKey][_keys.hr][timestamp] = data[_keys.hr];
    }
    if (_keys.o2 in data) {
        _chartData[listenerKey][_keys.o2][timestamp] = data[_keys.o2];
    }
    if (_keys.red_led in data) {
        _chartData[listenerKey][_keys.red_led][timestamp] = data[_keys.red_led];
    }
    if (_keys.ir_led in data) {
        _chartData[listenerKey][_keys.ir_led][timestamp] = data[_keys.ir_led];
    }
}

function createDataListeners(db) {
    _trials.forEach(function(trial) {
        trial.devices.forEach(function(device) {
            var listenerKey = "" + trial.key + device.key;
            if ((device.selected) && !(listenerKey in _dataListeners)) {
                var listener = db.collection("trials").doc(trial.key)
                    .collection("devices").doc(device.key).collection("data")
                    .onSnapshot(function (query) {
                        query.forEach(function(entry) {
                            var timestamp = entry.id;
                            var data = entry.data();
                            setChartData(timestamp, data, trial, device);
                        });
                    });
                _dataListeners[listenerKey] = listener;
            } else if ((listenerKey in _dataListeners) && (!device.selected)) {
                (_dataListeners[listenerKey])();
                delete _dataListeners[listenerKey];
                delete _chartData[listenerKey];
            }
        });
    });
}

Vue.component('data-view', {
    data: function () {
        return {
            chartData: _chartData
        }
    },
    methods: {
        loadData: function() {
            createDataListeners(this.$db);
        }
    },
    template:
        `
        <div>
            <button v-on:click="loadData" type="button" class="btn btn-primary btn-block">Load Datasets</button>
            <hr>
            <chart :data="chartData"></chart>
        </div>
        `
});