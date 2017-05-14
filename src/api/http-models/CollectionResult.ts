export class CollectionResult<T> {
    public '@odata.context'?: string;
    public '@odata.nextlink'?: string;
    public '@odata.count'?: number;
    constructor(public value: Array<Partial<T>>, count?: number, context?: string, nextlink?: string) {
        this['@odata.count'] = count;
        this['@odata.context'] = context;
        this['@odata.nextlink'] = nextlink;
    }
}
