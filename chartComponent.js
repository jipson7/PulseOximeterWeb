
function generateTrace(device, key) {
    var trace = {
        x: [],
        y: [],
        type: 'scatter'
    };
    var initialTimestamp = null;
    for (var timestamp in device[key]) {
        if (initialTimestamp === null) {
            initialTimestamp = timestamp;
        }
        var value = device[key][timestamp];
        trace.x.push(timestamp - initialTimestamp);
        trace.y.push(value);
    }
    return trace;
}

function generateChart(data) {
    var chartHolder = document.getElementById('chartHolder');
    var traces = [];
    for (var key in data) {
        var device = data[key];
        var trace = generateTrace(device, _keys.hr);
        traces.push(trace);
    }

    var layout = {
        title: 'Heartrate',
        xaxis: {
            title: 'TimeStamp',
            showgrid: false,
            zeroline: false
        },
        yaxis: {
            title: 'Value',
            showline: false
        }
    };
    Plotly.newPlot(chartHolder, traces, layout);
}

Vue.component('chart', {
    props: {
        data: {
            type: Object
        }
    },
    methods: {
        generate:function () {
            generateChart(this.data);
        }
    },
    template:
        `
        <div>
            <button v-on:click="generate" type="button" class="btn btn-success btn-block">Generate Chart</button>
            <div id="chartHolder"></div>
        </div>
        `
});