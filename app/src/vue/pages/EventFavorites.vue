<template>
    <v-ons-page>
        <sessions-list :sessions="sessions"></sessions-list>
        <people-list :people="people"></people-list>
        <papers-list :papers="papers"></papers-list>
    </v-ons-page>
</template>

<script>
    import {mapGetters} from 'vuex';


    export default {
        computed: {

            papers: function () {
                return this.favoritesFinder("Papers");
            },

            sessions: function () {
                return this.favoritesFinder("Sessions");
            },

            people: function () {
                return this.favoritesFinder("People");
            }

        },
        methods: {
            //n^2ish
            //favorites could be refactored to being a object for O1
            favoritesFinder: function (favoriteType) {
                let favorites = this.$store.getters['events/selectedEventFavorites'][favoriteType];
                let list = this.$store.getters['events/selectedEvent' + favoriteType];
                if (favorites && list) {
                    return list.filter(item => favorites.includes(item.Key))
                } else {
                    return [];
                }
            }
        }

    }
</script>

<style scoped>

</style>
