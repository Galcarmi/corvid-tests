import now from 'performance-now'

export class TestPerformance{
    startTime:number;
    endTime:number;
    resultMS:number;
    resultSEC:number;

    constructor(){}

    startCount(){
        this.startTime = now();
    }

    endCount(){
        this.endTime = now();
        this.resultMS = this.endTime - this.startTime;
        this.resultSEC = this.resultMS /= 1000;
    }

    getCountSec(){
        return this.resultSEC;
    }

    getCountMS(){
        return this.resultMS;
    }
}