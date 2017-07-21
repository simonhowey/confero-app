<template>
    <v-ons-page>
        <top-toolbar :backLabel="event.Name" title="Person"></top-toolbar>

        <v-ons-list>
            <v-ons-list-item>
                <div class="left">
                    <favorite-star favoriteType="People" :favoriteKey="person.Key"></favorite-star>
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
                    <span class="list-item__subtitle" v-if="person.URLhp"><a :href="person.URLhp" target="_blank">Homepage</a></span>
                    <span class="list-item__subtitle" v-if="person.URL && !person.URLhp"><a :href="person.URL" target="_blank">Homepage</a></span>
                    <span class="list-item__subtitle" v-if="person.URLgs"><a :href="person.URLgs" target="_blank">Google Scholar</a></span>

                </div>
                <div class="right">
                </div>
            </v-ons-list-item>
        </v-ons-list>

        <papers-list :papers="papers"></papers-list>

    </v-ons-page>
</template>

<script>

    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                event: 'events/selectedEvent',
                person: 'events/selectedPerson'
            }),

            papers: function () {
                let personKey = this.$store.getters['events/selectedPerson'].Key;
                if (personKey) {
                    let toReturn = [];
                    let Papers = this.$store.getters['events/selectedEventPapers'];

                    Papers.forEach((paper) => {
                        if (paper.Authors && paper.Authors.includes(personKey))
                            toReturn.push(paper)
                    });

                    return toReturn;
                } else {
                    return [];
                }
            }

        },

    }

</script>

<style scoped>
    .title {
        font-weight: bold;
    }
</style>
