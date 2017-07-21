<template>
    <v-ons-page>
        <v-ons-search-input class="searchbar" placeholder="Search" v-model="searchText"></v-ons-search-input>
        <v-ons-list modifier="noborder">
            <template v-for="paper in filteredPapers">
                <v-ons-progress-bar v-show="!isLoaded" indeterminate></v-ons-progress-bar>
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
            filteredPapers: function(){
                if(!this.animationComplete)
                    return [];

                let Papers = this.$store.getters['events/selectedEventPapers'];
                if(Papers && Papers.length > 0){
                    this.$nextTick(function(){
                        this.isLoaded = true;
                    })
                }

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
            }
        },

        data(){
            return {
                searchText: "",
                animationComplete: false,
                isLoaded: false
            }
        },
        created(){
            setTimeout(()=>{
                this.animationComplete = true;
            }, 700)
        }

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