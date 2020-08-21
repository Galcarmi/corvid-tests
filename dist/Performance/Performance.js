import now from "performance-now";
export class TestPerformance {
    constructor() { }
    startCount() {
        this.m_StartTime = now();
    }
    endCount() {
        this.m_EndTime = now();
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
