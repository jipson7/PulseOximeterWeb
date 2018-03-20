

function createDevicesListener(trial, trialKey, db) {
    trial._devicesListener = db.collection("trials").doc(trialKey)
        .collection("devices").onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(entry) {
            var device = entry.data();
            device.key = entry.id;
            device.selected = false;
            trial.devices.push(device);
        });
    });
}

Vue.component('trial-entry', {

    props: ['trial', 'trialkey'],
    methods: {
        toggleTrial: function() {
            console.log(this.trial.devices);
        },
        toggleDevice: function() {
            console.log("device");
        },
        timeAgo: function(start) {
            return jQuery.timeago(start);
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
          <a class="list-group-item list-group-item-action flex-column align-items-start"
            v-on:click="toggleTrial()">
            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-1">{{trial.date}}</h6>
              <small>{{timeAgo(trial.start)}}</small>
            </div>
            <b>Devices</b>
            <ul class="list-group">
                <li v-for="device in trial.devices" class="list-group-item"
                    v-on:click="toggleDevice">{{device.description}}</li>
            </ul>
          </a>
        `
});

