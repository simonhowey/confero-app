<template>
    <v-ons-page :infinite-scroll="loadMore">
        <v-ons-search-input class="searchbar" placeholder="Search" v-model="searchText"></v-ons-search-input>

        <v-ons-list modifier="noborder">
            <template v-for="person in viewablePeople">
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
    import Vue from 'vue';

    export default {
        computed: {
            //handles search
            filteredPeople: function () {
                let People = this.$store.getters['events/selectedEventPeople'];
                if (this.searchText === "") {
                    return People;
                } else {
                    return People.filter((person) => {
                        let searchText = this.searchText.toLowerCase();
                        for (let prop in person) {
                            if (person[prop].toString().toLowerCase().includes(searchText))
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
            },
            loadMore(done) {
                let alreadyLoaded = this.viewablePeople.length;

                for (let i = alreadyLoaded, k = 0; i < this.filteredPeople.length && k < 20; k++, i++) {
                    this.viewablePeople.push(this.filteredPeople[i]);
                }
                //because it gets called before onsen injects it... prevents errors not actually needed
                if(done) done();
            }
        },

        watch: {
            filteredPeople: function(){
                this.viewablePeople = [];
                this.loadMore();
            }
        },

        data(){
            return {
                searchText: "",
                viewablePeople: []
            }
        }

    }
</script>

<style scoped>

    .searchbar {
        width: 100%;
    }
</style>