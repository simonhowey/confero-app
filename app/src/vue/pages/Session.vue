<template>
    <v-ons-page>
        <top-toolbar :backLabel="event.Name" title="Session"></top-toolbar>

        <v-ons-list>
            <v-ons-list-item>
                <div class="left">
                    <favorite-star favoriteType="Sessions" :favoriteKey="session.Key"></favorite-star>
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
                    <span v-if="session.Location" class="list-item__subtitle">Location: {{ session.Location }}</span>
                </div>
                <div class="right">
                </div>
            </v-ons-list-item>
        </v-ons-list>

        <papers-list :papers="papers"></papers-list>

    </v-ons-page>

</template>

<script>

    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                event: 'events/selectedEvent',
                session: 'events/selectedSession'
            }),

            papers: function () {
                let session = this.$store.getters['events/selectedSession'];
                if (session.Items) {
                    let toReturn = [];
                    let Papers = this.$store.getters['events/selectedEventPapers'];

                    session.Items.forEach((itemkey) => {
                        let matchingPaper = Papers.find((element) => {
                            return element.Key === itemkey;
                        });
                        if (typeof matchingPaper !== 'undefined')
                            toReturn.push(matchingPaper);
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
