export declare class TestPerformance {
    private m_StartTime;
    private m_EndTime;
    private m_ResultMS;
    private m_ResultSEC;
    constructor();
    startCount(): void;
    endCount(): void;
    getCountSec(): number;
    getCountMS(): number;
}
