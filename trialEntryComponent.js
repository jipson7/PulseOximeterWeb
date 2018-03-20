

function createDevicesListener(trial, trialKey, db) {
    trial.devices = [];
    trial._devicesListener = db.collection("trials").doc(trialKey)
        .collection("devices").onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(device) {
            trial.devices.push(device.data());
        });
    });
}

Vue.component('trial-entry', {

    props: ['trial', 'trialkey'],
    methods: {
        toggleDevices: function() {
            console.log(this.trial.devices);
        }
    },
    created: function () {
        createDevicesListener(this.trial, this.trialkey, this.$db);
    },
    destroyed: function() {
        this.trial._devicesListener.unsubscribe();
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