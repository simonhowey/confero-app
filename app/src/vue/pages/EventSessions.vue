<template>
    <v-ons-page>
        <v-ons-search-input class="searchbar" placeholder="Search" v-model="searchText"></v-ons-search-input>
        <v-ons-list modifier="noborder">
            <v-ons-progress-bar v-show="!isLoaded" indeterminate></v-ons-progress-bar>
            <template v-for="(session, index) in filteredSessions">
                <v-ons-list-item class="timebar" v-if="index == 0 || filteredSessions[index-1].displayTime != session.displayTime">
                    <div class="left">
                        <v-ons-icon icon="fa-clock-o" class="list-item__icon"></v-ons-icon>
                    </div>
                    <div class="center">
                            {{ session.displayTime }}
                    </div>
                    <div class="right">
                    </div>
                </v-ons-list-item>

                <v-ons-list-item
                        @click="selectSession(session)"
                        modifier="chevron" tappable>
                    <div class="left">
                    </div>
                    <div class="center">
                        <span class="list-item__title">{{ session.Title }}</span>
                        <span class="list-item__subtitle">{{ session.Type }}</span>
                        <span class="list-item__subtitle">{{ session.displayTime }}</span>
                        <span v-if="session.Location" class="list-item__subtitle">{{ session.Location }}</span>

                    </div>

                    <div v-bind:style="{background: COLOURS[session.LocationIndex]}" class="right">
                        <v-ons-icon icon="fa-chevron" class="list-item__icon chevron"></v-ons-icon>
                    </div>
                </v-ons-list-item>


            </template>

        </v-ons-list>
    </v-ons-page>
</template>

<script>
    import SessionPage from './Session.vue'

    export default {
        computed: {
            filteredSessions: function(){
                if(!this.animationComplete)
                    return [];

                let Sessions = this.$store.getters['events/selectedEventSessions'];
                if(Sessions && Sessions.length > 0){
                    this.$nextTick(function(){
                        this.isLoaded = true;
                    })
                }

                if(this.searchText === ""){
                    return Sessions;
                } else {
                    return Sessions.filter((session) => {
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
            selectSession(session){
                this.$store.commit('events/changeSelectedSession', session);
                this.$store.commit('navigator/push', SessionPage)
            }
        },
        data(){
          return {
              COLOURS: [
                  "#00A8DF",
                  "#fb7009",
                  "#60124e",
                  "#269926",
                  "#ef3125",
                  "#006666",
                  "#7B4A12",
                  "#009664",
                  "#bf7000",
                  "#422663",
                  "#DAA520",
                  "#738F9B",
                  "#78200b",
                  "#1d447c",
                  "#206900"
              ],
              searchText: "",
              isLoaded: false,
              animationComplete: false,
          }
        },
        created(){
            setTimeout(()=>{
                this.animationComplete = true;
            }, 550)
        }

    }
</script>

<style scoped>
    .chevron {
        width: 15px;
    }
    .timebar {
        background-color: #d8d8d8;
    }
    .searchbar {
        width: 100%;
    }
</style>
