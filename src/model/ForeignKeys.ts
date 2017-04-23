import { ForeignKeyDescriptorEntry } from './ForeignKeyDescriptorEntry';
import { ModelDescriptorStore } from './ModelDescriptorStore';

export function isForeignKeyDescriptorEntry(descriptor: any): descriptor is ForeignKeyDescriptorEntry {
    return (descriptor as ForeignKeyDescriptorEntry).ForeignKeyField !== undefined
        &&
        (descriptor as ForeignKeyDescriptorEntry).ReferenceName !== undefined;
}

export function ForeignKey<T>(foreignClassType: { new (): T }, foreignKeyFieldName: string) {
    return (target: any, propertyName: string) => {
        ModelDescriptorStore.Add(target,
        new ForeignKeyDescriptorEntry(foreignKeyFieldName, foreignClassType.name));
    };
}
