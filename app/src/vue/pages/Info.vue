<template>
    <v-ons-page>
        <top-toolbar :backLabel="accessedFromHome ? 'Home' : event.Name" title="Info"></top-toolbar>

        <div v-if="!accessedFromHome">
            <div class="title">{{ event.Description }}</div>

            <v-ons-list modifier="noborder">
                <v-ons-list-item modifier="nodivider" v-if="metaData && metaData.URL">
                    <v-ons-list class="infolist" modifier="inset">
                        <v-ons-list-header>Website</v-ons-list-header>
                        <v-ons-list-item><a :href="metaData.URL" target="_blank"> {{ metaData.URL}} </a>
                        </v-ons-list-item>
                    </v-ons-list>
                </v-ons-list-item>

                <v-ons-list-item v-if="metaData && metaData.Location" modifier="nodivider">
                    <v-ons-list class="infolist" modifier="inset">
                        <v-ons-list-header>Location</v-ons-list-header>
                        <v-ons-list-item> {{ metaData.Location}} </v-ons-list-item>
                    </v-ons-list>
                </v-ons-list-item>

                <v-ons-list-item v-if="metaData && metaData.Description" modifier="nodivider">
                    <v-ons-list class="infolist" modifier="inset">
                        <v-ons-list-header>Event Description</v-ons-list-header>
                        <v-ons-list-item>{{ metaData.Description}} </v-ons-list-item>
                    </v-ons-list>
                </v-ons-list-item>

                <v-ons-list-item v-if="metaData && metaData.Sponsors" modifier="nodivider">
                    <v-ons-list class="infolist" modifier="inset">
                        <v-ons-list-header>Sponsors</v-ons-list-header>
                        <v-ons-list-item>{{ metaData.Sponsors }}</v-ons-list-item>
                    </v-ons-list>
                </v-ons-list-item>
            </v-ons-list>

        </div>

        <div>
            <v-ons-list modifier="noborder">
                <v-ons-list-item modifier="nodivider">
                    <v-ons-list class="infolist" modifier="inset">
                        <v-ons-list-header>About</v-ons-list-header>
                        <v-ons-list-item>
                            <p>
                                Confero App was developed by <a href='https://github.com/Simonah88' target='_blank'>Simon Howey</a>
                                based on previous app developed by
                                <a href='https://www.cs.ubc.ca/~rtholmes/' target='_blank'>Reid Holmes</a>
                                and <a href='http://rylan.icottrell.com/Home.html' target='_blank'>Rylan Cottrell</a>
                            </p>
                            <p>
                                If you have any suggestions or encounter any problems, please file an issue on
                                <a href="https://github.com/Simonah88/confero-app" target="_blank">Github</a>
                            </p>
                        </v-ons-list-item>
                    </v-ons-list>


                </v-ons-list-item>

            </v-ons-list>
        </div>


    </v-ons-page>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                metaData: 'events/selectedEventMetaData',
                event: 'events/selectedEvent',
            }),
            accessedFromHome: function () {
                return this.$store.state.navigator.stack.length === 2;
            }
        }

    }
</script>

<style scoped>
    .title {
        text-align: center;
        font-size: 16px;
        margin-bottom: 10px;
        font-weight: bold;
        margin-top: 10px;
    }

    .infolist {
        width: 100%;
    }
</style>
