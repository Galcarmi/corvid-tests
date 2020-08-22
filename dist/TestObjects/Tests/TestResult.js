"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResult = void 0;
class TestResult {
    constructor(i_Passed, i_TimePassed, i_Description, i_FailedString, i_StartAt, i_ErrorDetected, i_ErrorString) {
        this.m_StartAt = i_StartAt;
        this.m_Passed = i_Passed;
        this.m_TimePassed = i_TimePassed;
        this.m_Description = i_Description;
        if (i_FailedString !== null) {
            this.m_FailedString = i_FailedString;
        }
        if (i_ErrorDetected) {
            this.m_ErrorDetected = true;
            this.m_ErrorString = i_ErrorString;
        }
    }
    get FailedString() {
        return this.m_FailedString;
    }
    set FailedString(val) {
        this.m_FailedString = val;
    }
    get ErrorDetected() {
        return this.m_ErrorDetected;
    }
    set ErrorDetected(val) {
        this.m_ErrorDetected = val;
    }
    get StartAt() {
        return this.m_StartAt;
    }
    set StartAt(val) {
        this.m_StartAt = val;
    }
    get Passed() {
        return this.m_Passed;
    }
    set Passed(val) {
        this.m_Passed = val;
    }
    get TimePassed() {
        return this.m_TimePassed;
    }
    set TimePassed(val) {
        this.m_TimePassed = val;
    }
    get Description() {
        return this.m_Description;
    }
    set Description(val) {
        this.m_Description = val;
    }
    get ErrorString() {
        return this.m_ErrorString;
    }
    set ErrorString(val) {
        this.m_ErrorString = val;
    }
}
exports.TestResult = TestResult;
