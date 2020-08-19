export function errorTemplate(expected:string,actualValue:string):string{
    return `expected ${expected}, but got ${actualValue}`
}