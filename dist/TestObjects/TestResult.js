export class TestResult {
    constructor(passed, timePassed, description, errorString, startAt) {
        this.m_StartAt = startAt;
        this.m_Passed = passed;
        this.m_TimePassed = timePassed;
        this.m_Description = description;
        if (errorString !== null) {
            this.m_ErrorString = errorString;
        }
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
