export function errorTemplate(i_Expected:string,i_ActualValue:string):string{
    return `expected ${i_Expected}, but got ${i_ActualValue}`
}