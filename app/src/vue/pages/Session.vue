<template>
    <v-ons-page>
        <top-toolbar :backLabel="event.Name" title="Session"></top-toolbar>

        <v-ons-list>
            <v-ons-list-item>
                <div class="left" @click="favoriteSession(session)">
                    <v-ons-icon icon="fa-star-o" class="list-item__icon"></v-ons-icon>
                </div>
                <div class="center">
                    <span class="title">{{ session.Title }}</span>
                </div>
                <div class="right">
                </div>
            </v-ons-list-item>

            <v-ons-list-item>
                <div class="left">
                </div>
                <div class="center">
                    <span class="list-item__subtitle">{{ session.Type }}</span>
                    <span class="list-item__subtitle">{{ session.displayTime }}</span>
                    <span v-if="session.Location" class="list-item__subtitle">{{ session.Location }}</span>
                </div>
                <div class="right">
                </div>
            </v-ons-list-item>

            <v-ons-list-header class="subtitle" v-if="papers && papers.length > 0">
                <v-ons-icon icon="fa-clone" class="list-item__icon"></v-ons-icon>
                Papers
            </v-ons-list-header>

            <v-ons-list-item v-for="paper in papers" @click="selectPaper(paper)">
                <div class="left">
                </div>
                <div class="center">
                    <span class="list-item__title">{{ paper.Title }}</span>
                    <span class="list-item__subtitle">{{ paper.PersonsString }}</span>
                    <span class="list-item__subtitle">{{ paper.AffiliationsString }}</span>
                </div>
                <div class="right">
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>

</template>

<script>

    import { mapGetters } from 'vuex'
    import PaperPage from './Paper.vue'

    export default {
        computed: {
            ...mapGetters({
                event: 'events/selectedEvent',
                session: 'events/selectedSession'
            }),

            papers: function(){
                let session = this.$store.getters['events/selectedSession'];
                if(session.Items){

                    let toReturn = [];
                    let Papers = this.$store.getters['events/selectedEventPapers'];
                    session.Items.forEach((itemkey)=>{

                        let matchingPaper = Papers.find((element) =>{
                            return element.Key === itemkey;
                        });
                        if(typeof matchingPaper !== 'undefined')
                            toReturn.push(matchingPaper);

                    });

                    return toReturn;
                } else {
                    return null;
                }
            }

        },

        methods: {
            favoriteSession(session){
                return true;
            },
            selectPaper(paper){
                this.$store.commit('events/changeSelectedPaper', paper);
                this.$store.commit('navigator/replace', PaperPage);
            }

        }

    }

</script>

<style scoped>
    .title{
        font-weight: bold;
    }
    .subtitle{
        background-color: #d8d8d8;
    }
</style>
