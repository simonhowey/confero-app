import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import Vue from 'vue';
import 'onsenui';
import VueOnsen from 'vue-onsenui';
import Vuex from 'vuex'
import $ from "jquery";

//so it's done at compile time


Vue.use(Vuex);
Vue.use(VueOnsen);

import Mainpage from './vue/pages/Mainpage.vue';
import TopToolbar from './vue/components/TopToolbar.vue';

import navigator from './store/navigator';
import events from './store/events';

//https://stackoverflow.com/questions/17887348/phonegap-open-link-in-browser
document.addEventListener('deviceready', onDeviceReady, false);

window.COUCH_URL = WEBPACK_REMOTE_URL + "couchdb/";
window.REMOTE_URL = WEBPACK_REMOTE_URL;

if(WEBPACK_WEB){
    startVue();
}

function onDeviceReady() {
    // Mock device.platform property if not available
    if (!window.device) {
        window.device = { platform: 'Browser' };
    }
    handleExternalURLs();
    startVue();

}

function handleExternalURLs() {
    // Handle click events for all external URLs
    if (device.platform.toUpperCase() === 'IOS' || device.platform.toUpperCase() === 'ANDROID') {
        $(document).on('click', 'a[href^="http"]', function (e) {
            let url = $(this).attr('href');
            window.open(url, '_system');
            e.preventDefault();
        });
    }
}
function startVue(){
    const store = new Vuex.Store({
        modules: {
            navigator: navigator,
            events: events
        }
    });

    Vue.component('top-toolbar', TopToolbar);
    new Vue({
        el: '#app',
        render: h => h(Mainpage),
        store: store
    });
}

