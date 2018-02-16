import { ModelDescriptorStore } from "./ModelDescriptorStore";
import { PrimaryKeyDescriptorEntry } from "./PrimaryKeyDescriptorEntry";

export function isPrimaryKeyDescriptorEntry(descriptor: any): descriptor is PrimaryKeyDescriptorEntry {
    return (descriptor as PrimaryKeyDescriptorEntry).primaryKey !== undefined;
}

/**
 *
 * @param target The target obect
 * @param propertyKey The property that should be a primary key
 */
export function PrimaryKey(target: object, propertyKey: string) {
    ModelDescriptorStore.Add(target as any, new PrimaryKeyDescriptorEntry(propertyKey));
}
