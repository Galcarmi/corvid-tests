export class TestPerformance{
    startTime:Date;
    endTime:Date;
    resultMS:number;
    resultSEC:number;

    constructor(){}

    startCount(){
        this.startTime = new Date();
    }

    endCount(){
        this.endTime = new Date();
        this.resultMS = this.endTime.getTime() - this.startTime.getTime();
        this.resultSEC = this.resultMS /= 1000;
    }

    getCountSec(){
        return this.resultSEC;
    }

    getCountMS(){
        return this.resultMS;
    }
}