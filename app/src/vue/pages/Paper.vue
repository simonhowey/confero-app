<template>
    <v-ons-page>
        <top-toolbar :backLabel="event.Name" :title="paper.Type ? paper.Type : 'Paper'"></top-toolbar>

        <v-ons-list>
            <v-ons-list-item>
                <div class="left">
                    <favorite-star favoriteType="Papers" :favoriteKey="paper.Key"></favorite-star>
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
                    <span class="list-item__subtitle" v-if="paper.URL"><a :href="paper.URL" target="_blank">Link</a></span>
                    <span class="list-item__subtitle" v-if="paper.URLvideo"><a :href="paper.URLvideo" target="_blank">Video</a></span>
                </div>
                <div class="right">
                </div>
            </v-ons-list-item>

            <v-ons-list-header class="subtitle" v-if="paper.Abstract">
                Abstract
            </v-ons-list-header>

            <v-ons-list-item v-if="paper.Abstract">
                {{ paper.Abstract }}
            </v-ons-list-item>

        </v-ons-list>

        <people-list :people="people"></people-list>
        <sessions-list :sessions="sessions"></sessions-list>

        <!--meta tags for google scholar-->
        <div v-if="paper.Type.toLowerCase().indexOf('paper') != -1">
            <meta name="citation_title" :content="paper.Title">
            <meta name="citation_author" v-for="person in people" :content="person.Name">
            <meta name="citation_publication_date" :content="citationYear">
        </div>


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
                        if(session.Items && session.Items.includes(paperKey))
                            toReturn.push(session)
                    });

                    return toReturn;
                } else {
                    return [];
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
                    return [];
                }
            },

            citationYear: function(){
                return this.event && this.event.StartDate.split('-')[0];
            }


        }

    }

</script>

<style scoped>
    .title {
        font-weight: bold;
    }
</style>
