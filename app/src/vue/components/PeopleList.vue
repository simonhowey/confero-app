<template>
    <v-ons-list>
        <v-ons-list-header class="subtitle" v-if="people && people.length > 0">
            <v-ons-icon icon="fa-users" class="list-item__icon"></v-ons-icon>
            People
        </v-ons-list-header>

        <v-ons-list-item v-for="person in people" @click="selectPerson(person)">
            <div class="left">
            </div>
            <div class="center">
                <span class="list-item__title">{{ person.Name }}</span>
                <span class="list-item__subtitle">{{ person.Affiliation }}</span>
            </div>
            <div class="right">
            </div>
        </v-ons-list-item>
    </v-ons-list>
</template>

<script>
    import PersonPage from '../pages/Person.vue'

    export default {
        props: ['people'],
        methods: {
            selectPerson(person){
                this.$store.commit('events/changeSelectedPerson', person);
                this.$store.commit('navigator/replace', PersonPage);
            }
        }
    };
</script>


<style scoped>
    .subtitle{
        background-color: #d8d8d8;

    }
</style>