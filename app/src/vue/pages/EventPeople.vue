<template>
    <v-ons-page>
        <v-ons-search-input class="searchbar" placeholder="Search" v-model="searchText"></v-ons-search-input>
        <v-ons-list modifier="noborder">
            <v-ons-progress-bar v-if="!filteredPeople" indeterminate></v-ons-progress-bar>
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
                if(this.searchText === ""){
                    return this.$store.getters['events/selectedEventPeople'];
                } else {
                    return this.$store.getters['events/selectedEventPeople']
                        .filter((person) => {
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
                searchText: ""
            }
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