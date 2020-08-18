"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestPerformance = void 0;
class TestPerformance {
    constructor() { }
    startCount() {
        this.startTime = new Date();
    }
    endCount() {
        this.endTime = new Date();
        this.resultMS = this.endTime.getTime() - this.startTime.getTime();
        this.resultSEC = this.resultMS /= 1000;
    }
    getCountSec() {
        return this.resultSEC;
    }
    getCountMS() {
        return this.resultMS;
    }
}
exports.TestPerformance = TestPerformance;
