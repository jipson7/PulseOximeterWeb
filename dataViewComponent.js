
var _dataConnections = [];

Vue.component('data-view', {
    data:  function () {
        return {
            'dataConnections': _dataConnections
        };
    },
    beforeUpdate: function() {
        console.log("Data updating");
    },
    template:
        `
        <ul class="list-group">
            <li v-for="connection in dataConnections">{{connection}}</li>
        </ul>
        `
});