export default class Log {
    static trace(msg) {
        console.log("<T> " + new Date().toLocaleString() + ": " + msg);
    }
    static info(msg) {
        console.log("<I> " + new Date().toLocaleString() + ": " + msg);
    }
    static warn(msg) {
        console.error("<W> " + new Date().toLocaleString() + ": " + msg);
    }
    static error(msg) {
        console.error("<E> " + new Date().toLocaleString() + ": " + JSON.stringify(msg));
    }
    static test(msg) {
        console.log("<X> " + new Date().toLocaleString() + ": " + msg);
    }
}
