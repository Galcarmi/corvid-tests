export class Lock{
    m_Locked:Promise<any>;
    m_Resolver:Function;

    constructor(){
        this.m_Locked = new Promise((res,rej)=>{this.m_Resolver = res});
    }

    lock(){
        this.m_Locked = new Promise((res,rej)=>{this.m_Resolver = res});
    }

    unlock(){
        this.m_Resolver()
    }

    async awaitForLock(){
        await this.m_Locked;
    }

}


///todo every testsuite should have busy manager