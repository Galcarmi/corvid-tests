"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.busyManager = exports.BusyManager = void 0;
class BusyManager {
    constructor() {
        this.m_BusyTestSuites = [];
    }
    addLock(i_Lock) {
        this.m_BusyTestSuites.push(i_Lock);
    }
    async awaitForAllLocks() {
        for (const lock of this.m_BusyTestSuites) {
            await lock.awaitForLock();
        }
    }
}
exports.BusyManager = BusyManager;
const busyManager = new BusyManager();
exports.busyManager = busyManager;
