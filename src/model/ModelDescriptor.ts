
import { DescriptorEntryType } from './DescriptorEntryType';
import { ForeignKeyDescriptorEntry } from './ForeignKeyDescriptorEntry';
import { isForeignKeyDescriptorEntry } from './ForeignKeys';
import { isODataPropertyDesrciptorEntry } from './ODataProperty';
import { ODataPropertyDesrciptorEntry } from './ODataPropertyDescriptorEntry';
import { isPrimaryKeyDescriptorEntry } from './PrimaryKey';
import { PrimaryKeyDescriptorEntry } from './PrimaryKeyDescriptorEntry';

export class ModelDescriptor {
    public Object: any = Object;
    public Entries: DescriptorEntryType[];

    constructor(object: any, entries: DescriptorEntryType[]) {
        this.Object = object;
        this.Entries = entries;
    }

    public get PrimaryKey(): PrimaryKeyDescriptorEntry{
        return this.Entries.filter((entry) => isPrimaryKeyDescriptorEntry(entry))
            .map((entry) => entry as PrimaryKeyDescriptorEntry)[0];
    }

    public get Properties(): ODataPropertyDesrciptorEntry[]{
        return this.Entries.filter((entry) => isODataPropertyDesrciptorEntry(entry))
            .map((entry) => entry as ODataPropertyDesrciptorEntry);
    }

    public get ForeignKeys(): ForeignKeyDescriptorEntry[]{
        return this.Entries.filter((entry) => isForeignKeyDescriptorEntry(entry))
            .map((entry) => entry as ForeignKeyDescriptorEntry);
    }
}
