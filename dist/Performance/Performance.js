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
        this.m_StartTime = performance_now_1.default();
    }
    endCount() {
        this.m_EndTime = performance_now_1.default();
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
