<template>
    <v-ons-page>
        <top-toolbar :backLabel="event.Name" title="Person"></top-toolbar>

        <v-ons-list>
            <v-ons-list-item>
                <div class="left" @click="favoritePerson(person)">
                    <v-ons-icon icon="fa-star-o" class="list-item__icon"></v-ons-icon>
                </div>
                <div class="center">
                    <span class="title">{{ person.Name }}</span>
                </div>
                <div class="right">
                </div>
            </v-ons-list-item>

            <v-ons-list-item>
                <div class="left">
                </div>
                <div class="center">
                    <span class="list-item__subtitle">{{ person.Affiliation }}</span>
                </div>
                <div class="right">
                </div>
            </v-ons-list-item>

            <!--<v-ons-list-header class="subtitle" v-if="sessions && sessions.length > 0">-->
                <!--Sessions-->
            <!--</v-ons-list-header>-->

            <!--<v-ons-list-item v-for="session in sessions" @click="selectSession(session)">-->
                <!--<div class="left">-->
                <!--</div>-->
                <!--<div class="center">-->
                    <!--<span class="list-item__title">{{ session.Title }}</span>-->
                    <!--<span class="list-item__subtitle">{{ session.Type }}</span>-->
                    <!--<span class="list-item__subtitle">{{ session.displayTime }}</span>-->
                <!--</div>-->
                <!--<div class="right">-->
                <!--</div>-->
            <!--</v-ons-list-item>-->

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

    export default {
        computed: {
            ...mapGetters({
                event: 'events/selectedEvent',
                person: 'events/selectedPerson'
            }),

            papers: function(){
                let personKey = this.$store.getters['events/selectedPerson'].Key;
                if(personKey){

                    let toReturn = [];
                    let Papers = this.$store.getters['events/selectedEventPapers'];
                    Papers.forEach((paper)=>{
                        if(paper.Authors && paper.Authors.includes(personKey))
                            toReturn.push(paper)
                    });

                    return toReturn;
                } else {
                    return null;
                }
            }


        },

        methods: {
            favoritePerson(person){
                return true;
            },
            selectSession(paper){
                return true;
            },
            selectPaper(paper){
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
