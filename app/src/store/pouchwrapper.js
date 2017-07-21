import PouchDB from '../vendor/pouch'
import Log from '../utils/Log'

if (!WEBPACK_WEB) {
    PouchDB.plugin(require('pouchdb-adapter-cordova-sqlite'));
}

export default class PouchWrapper {

    constructor(remoteCouchURL) {
        this.EVENT_METADATA_ID = "MetaData";
        this.EVENT_SESSIONS_ID = "Sessions";
        this.EVENT_ITEMS_ID = "Items";
        this.EVENT_PEOPLE_ID = "People";
        this.remoteCouchURL = remoteCouchURL;
        if (!WEBPACK_WEB) {
            this.adapter = {adapter: 'cordova-sqlite', location: 'default'}
        }
    }

    getEventDBName(event) {
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


    getEventDetailsLocal(event, documentID) {
        let dbname = this.getEventDBName(event);

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

    replicateRemote(event) {
        let dbname = this.getEventDBName(event);
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

    getEventFavorites(event) {
        let dbname = this.getEventDBName(event) + "favorites";

        return new Promise((fulfill, reject) => {
            let localdb = this.adapter ? new PouchDB(dbname, this.adapter) : new PouchDB(dbname);
            localdb.get("Favorites")
                .then((doc) => {
                    fulfill(doc);
                })
                .catch((err) => {
                    if (err.status === 404)
                        return localdb.put({_id: "Favorites", People: [], Papers: [], Sessions: []});
                    else
                        reject(err);
                })
                .then(() => {
                    return localdb.get("Favorites");
                })
                .then((doc) => {
                    fulfill(doc);
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    addFavorite(event, favoriteType, key) {
        let dbname = this.getEventDBName(event) + "favorites";

        return new Promise((fulfill, reject) => {
            let localdb = this.adapter ? new PouchDB(dbname, this.adapter) : new PouchDB(dbname);
            localdb.get("Favorites")
                .then((doc) => {
                    if(!doc[favoriteType].includes(key))
                        doc[favoriteType].push(key);
                    return localdb.put(doc);
                })
                .then(() => {
                    return localdb.get("Favorites");
                }).then( (doc) => {
                    fulfill(doc);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    removeFavorite(event, favoriteType, key) {
        let dbname = this.getEventDBName(event) + "favorites";

        return new Promise((fulfill, reject) => {
            let localdb = this.adapter ? new PouchDB(dbname, this.adapter) : new PouchDB(dbname);
            localdb.get("Favorites")
                .then( (doc) => {
                    let index = doc[favoriteType].indexOf(key);
                    if(index !== -1)
                        doc[favoriteType].splice(index, 1);

                    return localdb.put(doc);
                }).then( () => {
                    return localdb.get("Favorites");
                }).then( (doc) => {
                    fulfill(doc);
                })
                .catch( (err) => {
                    reject(err);
                });
        });
    }


}