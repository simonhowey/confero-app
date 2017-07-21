<template>
    <v-ons-page>
        <v-ons-search-input class="searchbar" placeholder="Search" v-model="searchText"></v-ons-search-input>
        <v-ons-list modifier="noborder">
            <v-ons-progress-bar v-show="!isLoaded" indeterminate></v-ons-progress-bar>
            <template v-for="person in filteredPeople">

                <v-ons-list-item
                        @click="selectPerson(person)"
                        modifier="chevron" tappable>
                    <div class="left">
                    </div>
                    <div class="center">
                        <span class="list-item__title">{{ person.Name }}</span>
                        <span class="list-item__subtitle" v-if="person.Affiliation">{{ person.Affiliation }}</span>
                    </div>
                    <div class="right">
                    </div>
                </v-ons-list-item>

            </template>

        </v-ons-list>
    </v-ons-page>
</template>

<script>
    import PersonPage from './Person.vue'

    export default {
        computed: {
            filteredPeople: function(){
                if(!this.animationComplete)
                    return [];

                let People = this.$store.getters['events/selectedEventPeople'];
                if(People && People.length > 0){
                    this.$nextTick(function(){
                        this.isLoaded = true;
                    })
                }

                if(this.searchText === ""){
                    return People;
                } else {
                    return People.filter((person) => {
                            let searchText = this.searchText.toLowerCase();
                            for(let prop in person){
                                if(person[prop].toString().toLowerCase().includes(searchText))
                                    return true;
                            }
                            return false;
                        })
                }
            }
        },

        methods: {
            selectPerson(person){
                this.$store.commit('events/changeSelectedPerson', person);
                this.$store.commit('navigator/push', PersonPage)
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

    .searchbar {
        width: 100%;
    }
</style>