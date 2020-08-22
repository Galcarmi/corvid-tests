"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestPerformance = void 0;
class TestPerformance {
    constructor() { }
    startCount() {
        this.m_StartTime = performance.now();
    }
    endCount() {
        this.m_EndTime = performance.now();
        this.m_ResultSEC = this.m_EndTime - this.m_StartTime;
        this.m_ResultMS = this.m_ResultSEC * 1000;
    }
    getCountSec() {
        return this.m_ResultSEC;
    }
    getCountMS() {
        return this.m_ResultMS;
    }
}
exports.TestPerformance = TestPerformance;
