<template>
    <v-ons-page>
        <top-toolbar :backLabel="event.Name" title="Paper"></top-toolbar>

        <v-ons-list>
            <v-ons-list-item>
                <div class="left" @click="favoritePaper(paper)">
                    <v-ons-icon icon="fa-star-o" class="list-item__icon"></v-ons-icon>
                </div>
                <div class="center">
                    <span class="title">{{ paper.Title }}</span>
                </div>
                <div class="right">
                </div>
            </v-ons-list-item>

            <v-ons-list-item>
                <div class="left">
                </div>
                <div class="center">
                    <span class="list-item__subtitle">{{ paper.PersonsString }}</span>
                    <span class="list-item__subtitle">{{ paper.AffiliationsString }}</span>

                </div>
                <div class="right">
                </div>
            </v-ons-list-item>

            <v-ons-list-header class="subtitle" v-if="sessions && sessions.length > 0">
                Sessions
            </v-ons-list-header>

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

            <v-ons-list-header class="subtitle" v-if="people && people.length > 0">
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
    </v-ons-page>

</template>

<script>

    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                event: 'events/selectedEvent',
                paper: 'events/selectedPaper'
            }),

            sessions: function(){
                let paperKey = this.$store.getters['events/selectedPaper'].Key;
                if(paperKey){

                    let toReturn = [];
                    let Sessions = this.$store.getters['events/selectedEventSessions'];
                    Sessions.forEach((session)=>{
                        if(session.Items.includes(paperKey))
                            toReturn.push(session)
                    });

                    return toReturn;
                } else {
                    return null;
                }
            },

            people: function(){
                let Authors = this.$store.getters['events/selectedPaper'].Authors;
                if(Authors){

                    let toReturn = [];
                    let People = this.$store.getters['events/selectedEventPeople'];
                    Authors.forEach((authorkey)=>{

                        let matchingAuthor = People.find((person) =>{
                            return person.Key === authorkey;
                        });
                        if(typeof matchingAuthor !== 'undefined')
                            toReturn.push(matchingAuthor);
                    });

                    return toReturn;
                } else {
                    return null;
                }
            }

        },

        methods: {
            favoritePaper(paper){
                return true;
            },
            selectSession(paper){
                return true;
            },
            selectPerson(person){
                return true;
            }

        }

    }

</script>

<style scoped>
    .title {
        font-weight: bold;
    }
    .subtitle{
        background-color: #d8d8d8;
    }
</style>
