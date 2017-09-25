import PouchWrapper from './pouchwrapper';
import Log from '../utils/Log'
import Vue from 'vue'

// initial state
// holds all information about events including what is currently selected. All rendering is based off of this store
const state = {
    Events: [],
    selectedEvent: null,
    selectedEventData: {},
    selectedEventFavorites: {},
    selectedSession: null,
    selectedPaper: null,
    selectedPerson: null
};

// getters
const getters = {
    allEvents: state => state.Events,
    selectedEvent: state => state.selectedEvent,
    selectedEventData: state => state.selectedEventData,
    selectedEventFavorites: state => state.selectedEventFavorites,
    selectedEventSessions: state => state.selectedEventData.Sessions,
    selectedEventPapers: state => state.selectedEventData.Items,
    selectedEventPeople: state => state.selectedEventData.People,
    selectedEventMetaData: state => state.selectedEventData.MetaData,
    selectedSession: state => state.selectedSession,
    selectedPaper: state => state.selectedPaper,
    selectedPerson: state => state.selectedPerson

};


// actions that can be used by vue components for changing state
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
        let documentIDs = [db.EVENT_METADATA_ID, db.EVENT_SESSIONS_ID, db.EVENT_ITEMS_ID, db.EVENT_PEOPLE_ID];
        let dbname = db.getEventDBName(event);


        function updateFromLocal(){
            documentIDs.forEach(documentID => {
                db.getEventDetailsLocal(event, documentID)
                    .then(document => {
                        if(db.getEventDBName(state.selectedEvent) === dbname)
                            commit('updateEventDetails', {id: documentID, doc: document})
                    })
                    .catch(err => {
                        if(err.status === 404)
                            Log.info("DB: " + dbname + " not in local pouch, replicating from server.");
                        else
                            Log.warn(err);
                    })
            });
        }

        updateFromLocal();

        db.replicateRemote(event)
            .then(() => {
                updateFromLocal();
            })
            .catch(err => {
                Log.error(err)
            });
    },

    getEventFavorites({commit, state}, {event}){
        //favorites only saved locally
        let db = new PouchWrapper(null);
        let eventdbname = db.getEventDBName(event);

        db.getEventFavorites(event)
            .then(favorites => {
                if(db.getEventDBName(state.selectedEvent) === eventdbname)
                    commit('setEventFavorites', favorites);
            })
            .catch(err => {
                Log.error(err);
            });

    },

    addFavorite({commit, state}, {event, favoriteType, key}){
        let db = new PouchWrapper(null);
        let eventdbname = db.getEventDBName(event);

        db.addFavorite(event, favoriteType, key)
            .then(favorites => {
                if(db.getEventDBName(state.selectedEvent) === eventdbname)
                    commit('setEventFavorites', favorites);
            })
            .catch(err => {
                Log.error(err);
            })

    },

    removeFavorite({commit, state}, {event, favoriteType, key}){
        let db = new PouchWrapper(null);
        let eventdbname = db.getEventDBName(event);

        db.removeFavorite(event, favoriteType, key)
            .then(favorites => {
                if(db.getEventDBName(state.selectedEvent) === eventdbname)
                    commit('setEventFavorites', favorites);
            })
            .catch(err => {
                Log.error(err);
            })
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
    },
    setEventFavorites (state, favorites){
        state.selectedEventFavorites = favorites;
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