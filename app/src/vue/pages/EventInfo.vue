<template>
    <v-ons-page>
        <div class="title">{{ event.Description }}</div>
        <v-ons-progress-bar v-show="!metaData" indeterminate></v-ons-progress-bar>

        <v-ons-list  modifier="noborder">

            <v-ons-list-item modifier="nodivider" v-if="metaData && metaData.URL">
                <v-ons-list class="infolist" modifier="inset" >
                    <v-ons-list-header>Website</v-ons-list-header>
                    <v-ons-list-item ><a :href="metaData.URL" target="_blank"> {{ metaData.URL}} </a></v-ons-list-item>
                </v-ons-list>
            </v-ons-list-item>

            <v-ons-list-item v-if="metaData && metaData.Location" modifier="nodivider">
                <v-ons-list class="infolist" modifier="inset" >
                    <v-ons-list-header>Location</v-ons-list-header>
                    <v-ons-list-item > {{ metaData.Location}} </v-ons-list-item>
                </v-ons-list>
            </v-ons-list-item>

            <v-ons-list-item v-if="metaData && metaData.Description" modifier="nodivider">
                <v-ons-list class="infolist" modifier="inset" >
                    <v-ons-list-header>Event Description</v-ons-list-header>
                    <v-ons-list-item >{{ metaData.Description}} </v-ons-list-item>
                </v-ons-list>
            </v-ons-list-item>

            <v-ons-list-item v-if="metaData && metaData.Sponsors" modifier="nodivider">
                <v-ons-list class="infolist" modifier="inset" >
                    <v-ons-list-header>Sponsors</v-ons-list-header>
                    <v-ons-list-item >{{ metaData.Sponsors }}</v-ons-list-item>
                </v-ons-list>
            </v-ons-list-item>

        </v-ons-list>


    </v-ons-page>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: mapGetters({
            metaData: 'events/selectedEventMetaData',
            event: 'events/selectedEvent'
        }),

    }
</script>

<style scoped>
    .title{
        text-align: center;
        font-size: 16px;
        margin-bottom:10px;
        font-weight: bold;
        margin-top: 10px;
    }
    .infolist{
        width: 100%;
    }
</style>
