import { Lock } from "./Lock";

export class BusyManager{
    m_BusyTestSuites:Lock[]

    constructor(){
        this.m_BusyTestSuites = [];
    }
    
    addLock(i_Lock:Lock){
        this.m_BusyTestSuites.push(i_Lock);
    }

    async awaitForAllLocks(){
        for(const lock of this.m_BusyTestSuites){
            await lock.awaitForLock();
        }
    }
}

const busyManager = new BusyManager();
export {busyManager}
