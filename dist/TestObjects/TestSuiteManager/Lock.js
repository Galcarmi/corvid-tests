"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lock = void 0;
class Lock {
    constructor() {
        this.m_Locked = new Promise((res, rej) => { this.m_Resolver = res; });
    }
    lock() {
        this.m_Locked = new Promise((res, rej) => { this.m_Resolver = res; });
    }
    unlock() {
        this.m_Resolver();
    }
    async awaitForLock() {
        await this.m_Locked;
    }
}
exports.Lock = Lock;
///todo every testsuite should have busy manager
