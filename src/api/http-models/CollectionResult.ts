export class CollectionResult<T> {
    public '@odata.context': string;
    public '@odata.nextlink': string;
    public value: T[];
}
