"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestPerformance = void 0;
const performance_now_1 = __importDefault(require("performance-now"));
class TestPerformance {
    constructor() { }
    startCount() {
        this.startTime = performance_now_1.default();
    }
    endCount() {
        this.endTime = performance_now_1.default();
        this.resultMS = this.endTime - this.startTime;
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
