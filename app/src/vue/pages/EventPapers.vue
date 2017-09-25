<template>
    <v-ons-page :infinite-scroll="loadMore">
        <v-ons-search-input class="searchbar" placeholder="Search" v-model="searchText"></v-ons-search-input>
        <v-ons-list modifier="noborder">
            <template v-for="paper in viewablePapers">
                <v-ons-list-item
                        @click="selectPaper(paper)"
                        modifier="chevron" tappable>
                    <div class="left">
                        <v-ons-icon v-if="paper.Award" icon="fa-trophy" size="30px" class="list-item__icon"></v-ons-icon>
                    </div>
                    <div class="center">
                        <span class="list-item__title">{{ paper.Title }}</span>
                        <span class="list-item__subtitle">{{ paper.PersonsString }}</span>
                        <span v-if="paper.Award" class="list-item__subtitle awardtext">{{ paper.Award }}</span>
                    </div>
                    <div class="right">
                        <v-ons-icon icon="fa-chevron" class="list-item__icon chevron"></v-ons-icon>
                    </div>
                </v-ons-list-item>
            </template>

        </v-ons-list>
    </v-ons-page>
</template>

<script>
    import PaperPage from './Paper.vue'

    export default {
        computed: {
            //handles search
            filteredPapers: function(){
                let Papers = this.$store.getters['events/selectedEventPapers'];

                if(this.searchText === ""){
                    return Papers;
                } else {
                    return Papers.filter((session) => {
                            let searchText = this.searchText.toLowerCase();
                            for(let prop in session){
                                if(session[prop].toString().toLowerCase().includes(searchText))
                                    return true;
                            }
                            return false;
                        })
                }
            }
        },

        methods: {
            selectPaper(paper){
                this.$store.commit('events/changeSelectedPaper', paper);
                this.$store.commit('navigator/push', PaperPage)
            },
            loadMore(done) {
                let alreadyLoaded = this.viewablePapers.length;

                for (let i = alreadyLoaded, k = 0; i < this.filteredPapers.length, k < 20; k++, i++) {
                    this.viewablePapers.push(this.filteredPapers[i]);
                }
                //because it gets called before onsen injects it... prevents errors not actually needed
                if(done) done();
            }
        },

        watch: {
            filteredPapers: function(){
                this.viewablePapers = [];
                this.loadMore();
            }
        },

        data(){
            return {
                searchText: "",
                viewablePapers: []
            }
        },

    }
</script>

<style scoped>
    .chevron {
        width: 15px;
    }
    .awardtext {
        font-weight: bold;
    }
    .searchbar {
        width: 100%;
    }
</style>