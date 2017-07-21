<template>
    <v-ons-list v-if="sessions && sessions.length > 0">
        <v-ons-list-header class="subtitle" >
            <v-ons-icon icon="fa-clock-o" class="list-item__icon"></v-ons-icon>
            Sessions
        </v-ons-list-header>

        <calendar-exporter :sessions="sessions"> </calendar-exporter>

        <v-ons-list-item v-for="session in sessions" @click="selectSession(session)">
            <div class="left">
            </div>
            <div class="center">
                <span class="list-item__title">{{ session.Title }}</span>
                <span class="list-item__subtitle">{{ session.Type }}</span>
                <span class="list-item__subtitle">{{ session.displayTime }}</span>
            </div>
            <div class="right">
            </div>
        </v-ons-list-item>
    </v-ons-list>
</template>

<script>
    import SessionPage from '../pages/Session.vue'

    export default {
        props: ['sessions'],
        methods: {
            selectSession(session){
                this.$store.commit('events/changeSelectedSession', session);
                this.$store.commit('navigator/replace', SessionPage);
            }
        }
    }
</script>


<style scoped>
    .subtitle{
        background-color: #d8d8d8;
    }
</style>