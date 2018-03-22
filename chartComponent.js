

Vue.component('chart', {
    props: ['data'],
    updated: function() {
        console.log(this.data);
    },
    created: function () {
        console.log(this.data);
    },
    template:
        `
        <div>
            <p>Great success</p>
        </div>
        `
});