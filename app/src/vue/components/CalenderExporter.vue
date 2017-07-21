<template>

    <v-ons-list-item v-if="isWeb" @click="exportToICAL()" tappable>
        <div class="left">
            <v-ons-icon icon="fa-calendar" class="list-item__icon"></v-ons-icon>

        </div>
        <div class="center">
            Export to iCalendar
        </div>
        <div class="right">
        </div>
    </v-ons-list-item>

</template>

<script>
    import {mapGetters} from 'vuex'
    import ical from 'ical-generator'
    import Log from '../../utils/Log'
    import FileSaver from 'file-saver'

    export default {
        props: ['sessions'],

        computed: {
            ...mapGetters({
                           event: 'events/selectedEvent',
            }),
            isWeb: function(){
                return WEBPACK_WEB;
            }
        },

        methods: {
            exportToICAL: function () {
                try {
                    var isFileSaverSupported = !!new Blob;
                } catch (e) {}

                let calendar = ical({domain: 'conferoapp.com', name: this.event.Name});
                this.sessions.forEach((session) => {
                    try{
                        let yearMonthDay = session.Day.split('-');
                        //javascript uses 0-11 for months
                        yearMonthDay[1] = yearMonthDay[1] -1;
                        let time = session.Time.split('-');
                        time[0] = time[0].trim();
                        time[1] = time[1].trim();
                        let startTime = time[0].split(':');
                        let endTime = time[1].split(':');

                        let start = new Date(yearMonthDay[0], yearMonthDay[1], yearMonthDay[2], startTime[0], startTime[1]);
                        let end = new Date(yearMonthDay[0], yearMonthDay[1], yearMonthDay[2], endTime[0], endTime[1]);
                        calendar.createEvent({
                            start: start,
                            end: end,
                            summary: session.Title,
                            location: session.Location
                        })
                    } catch(e){
                        Log.error(e);
                    }
                });

                let calendarString = calendar.toString();
                let calendarBlob = new Blob([calendarString], {type: "data:text/calendar;charset=utf8,"});
                FileSaver.saveAs(calendarBlob, this.event.Name + '.ics');


            }
        }
    }

</script>
