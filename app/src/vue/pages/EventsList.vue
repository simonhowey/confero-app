<template>
    <v-ons-page>
        <top-toolbar title="Confero"></top-toolbar>
        <v-ons-list modifier="noborder">
            <v-ons-progress-bar v-if="events.length == 0" indeterminate></v-ons-progress-bar>

            <v-ons-list-item v-for="event of events" :key="event.Name"
                             @click="selectEvent(event)"
                            modifier="chevron"
                             tappable>
                <div class="left">
                    <img crossorigin="anonymous" class="list-item__thumbnail" :src="REMOTE_URL + 'images/icon62/' + event.Icon">
                </div>

                <div class="center">
                    <span class="list-item__title">{{ event.Name }}</span><span class="list-item__subtitle">{{ event.Description }}</span>
                </div>

                <div class="right">

                </div>

            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>


<script>
    import { mapGetters, mapActions } from 'vuex'
    import EventPage from './EventPage.vue'

    export default {
        computed: {
            ...mapGetters({
                events: 'events/allEvents'
            }),
            REMOTE_URL: function() { return window.REMOTE_URL}
        },
        created () {
            this.$store.dispatch('events/getEvents');
        },
        methods: {
            selectEvent(event){
                this.$store.commit('events/changeSelectedEvent', event);
                this.$store.dispatch('events/getEventDetails', {event: event});
                this.$store.dispatch('events/getEventFavorites', {event: event});
                this.$store.commit('navigator/push', EventPage);
            }
        }
    }
</script>

<style scoped>

</style>