import PouchWrapper from './pouchwrapper';
import Log from '../utils/Log'
import Vue from 'vue'

// initial state
const state = {
    Events: [],
    selectedEvent: null,
    selectedEventData: {},
    selectedSession: null,
    selectedPaper: null,
    selectedPerson: null
};

// getters
const getters = {
    allEvents: state => state.Events,
    selectedEvent: state => state.selectedEvent,
    selectedEventData: state => state.selectedEventData,
    selectedEventSessions: state => state.selectedEventData.Sessions,
    selectedEventPapers: state => state.selectedEventData.Items,
    selectedEventPeople: state => state.selectedEventData.People,
    selectedEventMetaData: state => state.selectedEventData.MetaData,
    selectedSession: state => state.selectedSession,
    selectedPaper: state => state.selectedPaper,
    selectedPerson: state => state.selectedPerson

};


// actions
const actions = {
    getEvents ({commit}) {
        let db = new PouchWrapper(COUCH_URL);
        db.getEventsIndexLocal()
            .then(index => {
                commit('updateEvents', index)
            })
            .catch(err => {
                Log.error(err);
            });

        db.getEventsIndexRemote()
            .then(index => {
                commit('updateEvents', index)
            })
            .catch(err => {
                Log.error(err);
            });
    },

    getEventDetails({commit, state}, {event}){
        let db = new PouchWrapper(COUCH_URL);
        let dbname = db.getEventDBName(event);
        let documentIDs = [db.EVENT_METADATA_ID, db.EVENT_SESSIONS_ID, db.EVENT_ITEMS_ID, db.EVENT_PEOPLE_ID];

        function updateFromLocal(){
            documentIDs.forEach(documentID => {
                db.getEventDetailsLocal(dbname, documentID)
                    .then(document => {
                        if(db.getEventDBName(state.selectedEvent) === dbname){
                            commit('updateEventDetails', {id: documentID, doc: document})
                        }
                    })
                    .catch(err => {
                        Log.warn(err)
                    })
            });
        }

        updateFromLocal();

        db.replicateRemote(dbname)
            .then(() => {
                updateFromLocal();
            })
            .catch(err => {
                Log.error(err)
            });
    }


};

// mutations
const mutations = {
    updateEvents (state, {Events}) {
        state.Events = Events;
    },
    updateEventDetails (state, {id, doc}){
        Vue.set(state.selectedEventData, id, doc[id])
    },
    changeSelectedEvent (state, Event){
        state.selectedEvent = Event;
        state.selectedEventData = {};
    },
    changeSelectedSession (state, session){
        state.selectedSession = session;
    },
    changeSelectedPaper (state, paper){
        state.selectedPaper = paper;
    },
    changeSelectedPerson (state, person){
        state.selectedPerson = person;
    }
};

const namespaced = true;

export default {
    namespaced,
    state,
    getters,
    actions,
    mutations
}