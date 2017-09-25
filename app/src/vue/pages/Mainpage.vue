<template>
    <v-ons-navigator
            :page-stack="pageStack">
        <component :is="page" v-for="page in pageStack" :page-stack="pageStack"></component>
    </v-ons-navigator>
</template>


<script>
    import EventsList from './EventsList.vue'

    //Sets up onsen pagestack and pushes the event list onto it
    export default {
        beforeCreate() {
            this.$store.commit('navigator/push', EventsList);
        },
        computed: {
            pageStack() {
                return this.$store.state.navigator.stack;
            }
        }
    };
</script>
