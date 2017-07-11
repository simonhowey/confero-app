<template>
    <v-ons-page>
        <top-toolbar backLabel="Home" :title="event.Name"></top-toolbar>

        <v-ons-tabbar position="bottom"
                      :tabs="tabs"
                      :visible="true"
                      :index.sync="activeIndex"
        >
        </v-ons-tabbar>
    </v-ons-page>
</template>

<script>
    import EventSessions from './EventSessions.vue';
    import EventFavorites from './EventFavorites.vue';
    import EventPeople from './EventPeople.vue';
    import EventPapers from './EventPapers.vue';
    import EventInfo from './EventInfo.vue';


    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: mapGetters({
            event: 'events/selectedEvent'
        }),
        data(){
            return {
                activeIndex: 1,
                tabs: [
                    {
                        label: 'Info',
                        icon: 'fa-question-circle-o',
                        page: EventInfo
                    },
                    {
                        label: 'Sessions',
                        icon: 'fa-clock-o',
                        page: EventSessions
                    },
                    {
                        label: 'People',
                        icon: 'fa-users',
                        page: EventPeople
                    },
                    {
                        label: 'Papers',
                        icon: 'fa-clone',
                        page: EventPapers
                    },
                    {
                        label: 'Favorites',
                        icon: 'fa-star',
                        page: EventFavorites
                    }
                ]
            }
        }
    };
</script>