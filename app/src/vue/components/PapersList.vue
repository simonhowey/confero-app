<template>
    <v-ons-list>
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
</template>

<script>
    import PaperPage from '../pages/Paper.vue'

    export default {
        props: ['papers'],
        methods: {
            selectPaper(paper){
                this.$store.commit('events/changeSelectedPaper', paper);
                this.$store.commit('navigator/replace', PaperPage);
            }
        }
    }
</script>


<style scoped>
    .subtitle{
        background-color: #d8d8d8;
    }
</style>