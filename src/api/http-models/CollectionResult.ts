export class CollectionResult<T> {
    public '@odata.context'?: string;
    public '@odata.nextlink'?: string;
    public '@odata.count'?: number;
    constructor(public value: T[], count?: number, context?: string, nextlink?: string) {
        this['@odata.count'] = count;
    }
}
