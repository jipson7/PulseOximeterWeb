function createDeviceListener(trial, trialKey, db) {
    trial.devices = [];
    db.collection("trials").doc(trialKey)
        .collection("devices").onSnapshot(function(querySnapshot) {
        console.log("Devices Received: " + querySnapshot.size);
        querySnapshot.forEach(function(device) {
            console.log(this)
            trial.devices.push(device.data());
        });
    });
}

function destroyDeviceListener(trial, trialKey, db) {
    db.collection("trials").doc(trialKey)
        .collection("devices").onSnapshot(function() {});
}


Vue.component('trial-entry', {

    props: ['trial', 'trialkey'],
    methods: {
        toggleDevices: function() {
            console.log(this.trial.devices);
        }
    },
    created: function () {
        createDeviceListener(this.trial, this.trialkey, this.$db);
    },
    destroyed: function() {
        destroyDeviceListener(this.trial, this.trialkey, this.$db);
    },
    template:
        `
            <button type="button"
                    v-on:click="toggleDevices()"
                    class="list-group-item list-group-item-action">
                {{trial.date}}
            </button>
        `
});