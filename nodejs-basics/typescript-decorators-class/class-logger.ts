export const mapper: Record<string, string> = {}

export function classLogger(context: string) {
    return (target: Function) => {
        mapper[target.name] = context;
        console.log(`Class decorator applied with context of ${context} for ${target.name}`)
    }
}