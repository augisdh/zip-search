"use strict";

const zipApp = new Vue({
    el: "#zipcode-app",
    data: {
        startZip: null,
        startLocation: "",
        endZip: null,
        endLocation: "",
    },
    watch: {
        startZip: function(){
            this.startLocation = "";
            (this.startZip.length === 5) ? this.findStartLocation() : this.startLocation = "";
        },
        endZip: function(){
            this.endLocation = "";
            (this.endZip.length === 5) ? this.findEndLocation() : this.endLocation = "";
        }
    },
    methods: {
        findStartLocation: function() {
            setTimeout(() => {
                this.startLocation = "Searching...";

                setTimeout(() => {
                    fetch('https://zip.getziptastic.com/v2/US/' + this.startZip, {
                        method: "GET",
                    }).then(res => res.json())
                        .then(response => {
                            this.startLocation = response.city + ", " + response.state;
                        })
                        .catch(error => {
                            this.startLocation = "Invalid Zip Code";
                        })
                }, 500);
            }, 400)
        },
        findEndLocation: function() {
            setTimeout(() => {
                this.endLocation = "Searching...";

                setTimeout(() => {
                    fetch('https://zip.getziptastic.com/v2/US/' + this.endZip, {
                        method: "GET",
                    }).then(res => res.json())
                        .then(response => {
                            this.endLocation = response.city + ", " + response.state;
                        })
                        .catch(error => {
                            this.endLocation = "Invalid Zip Code";
                        })
                }, 500);
            }, 400)
        }
    }
});