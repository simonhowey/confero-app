
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import Vue from 'vue';
import 'onsenui';
import VueOnsen from 'vue-onsenui';
import Vuex from 'vuex'
import $ from "jquery";


import Mainpage from './vue/pages/Mainpage.vue';
import TopToolbar from './vue/components/TopToolbar.vue';
import FavoriteStar from './vue/components/FavoriteStar.vue';
import PapersList from './vue/components/PapersList.vue';
import PeopleList from './vue/components/PeopleList.vue';
import SessionsList from './vue/components/SessionsList.vue';
import CalendarExporter from './vue/components/CalenderExporter.vue';

import navigator from './store/navigator';
import events from './store/events';
import VueRouter from 'vue-router'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueOnsen);
Vue.component('top-toolbar', TopToolbar);
Vue.component('favorite-star', FavoriteStar);
Vue.component('papers-list', PapersList);
Vue.component('people-list', PeopleList);
Vue.component('sessions-list', SessionsList);
Vue.component('calendar-exporter', CalendarExporter);

//https://stackoverflow.com/questions/17887348/phonegap-open-link-in-browser
document.addEventListener('deviceready', onDeviceReady, false);

window.REMOTE_URL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '') +"/";
window.COUCH_URL = window.REMOTE_URL + "/couchdb/";
//bit of a hack for the phonegap serve because it uses the web stuff but fires onDeviceReady as well
//but web version just ends up getting served with phonegap
var vueStarted = false;

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
            window.open(url, '_system','location=no');
            e.preventDefault();
        });
    }
}


function startVue(){
    if(vueStarted) return;
    vueStarted = true;
    const store = new Vuex.Store({
        modules: {
            navigator: navigator,
            events: events
        }
    });
    //Loads up the main page which is just a wrapper for onsen

    new Vue({
        el: '#app',
        render: h => h(Mainpage),
        store: store
    });
}

