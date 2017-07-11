import PouchDB from '../vendor/pouch'
import Log from '../utils/Log'

if(WEBPACK_WEB){
    PouchDB.plugin(require('pouchdb-adapter-memory'));
} else {
    PouchDB.plugin(require('pouchdb-adapter-cordova-sqlite'));
}

export default class PouchWrapper {

    constructor(remoteCouchURL) {
        this.EVENT_METADATA_ID = "MetaData";
        this.EVENT_SESSIONS_ID = "Sessions";
        this.EVENT_ITEMS_ID = "Items";
        this.EVENT_PEOPLE_ID = "People";
        this.remoteCouchURL = remoteCouchURL;
        if(WEBPACK_WEB){
            this.adapter = {adapter: 'memory'}
        } else {
            this.adapter = {adapter: 'cordova-sqlite', location: 'default'}
        }
    }

    getEventDBName(event){
        return "couch" + event.File.toLowerCase().split(".")[0];
    }

    getEventsIndexLocal() {
        return new Promise((fulfill, reject) => {
            let dbname = "index";
            let localdb = this.adapter ? new PouchDB(dbname, this.adapter) : new PouchDB(dbname);
            localdb.get("index")
                .then((doc) => {
                    fulfill(doc);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }



    getEventsIndexRemote() {
        return new Promise((fulfill, reject) => {
            let dbname = "index";
            let localdb = this.adapter ? new PouchDB(dbname, this.adapter) : new PouchDB(dbname);
            let remotedb = new PouchDB(this.remoteCouchURL + dbname);
            localdb.replicate.from(remotedb, {checkpoint: false})
                .on('complete', () => {
                    let localdb = this.adapter ? new PouchDB(dbname, this.adapter) : new PouchDB(dbname);
                    localdb.get("index")
                        .then((doc) => {
                            fulfill(doc);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                })
                .on('error', (err) => {
                    reject(err);
                })
        })
    }


    getEventDetailsLocal(dbname, documentID){
        return new Promise((fulfill, reject) => {
            let localdb = this.adapter ? new PouchDB(dbname, this.adapter) : new PouchDB(dbname);
            localdb.get(documentID)
                .then((doc) => {
                    fulfill(doc);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    replicateRemote(dbname){
        return new Promise((fulfill, reject) => {
            let localdb = this.adapter ? new PouchDB(dbname, this.adapter) : new PouchDB(dbname);
            let remotedb = new PouchDB(this.remoteCouchURL + dbname);

            localdb.replicate.from(remotedb, {checkpoint: false})
                .on('complete', (info) => {
                    fulfill(true)
                })
                .on('error', (err) => {
                    reject(err);
                })
        })
    }


}