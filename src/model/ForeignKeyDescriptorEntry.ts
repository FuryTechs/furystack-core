export class ForeignKeyDescriptorEntry {
    public foreignKeyField: string;
    public referenceName: string;

    /**
     *
     */
    constructor(foreignKeyField: string, referenceName: string) {
        this.foreignKeyField = foreignKeyField;
        this.referenceName = referenceName;
    }
}
