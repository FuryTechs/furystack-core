import { EdmType } from "../endpoint/EdmTypes";
import { ModelDescriptorStore } from "./ModelDescriptorStore";
import { ODataPropertyDesrciptorEntry } from "./ODataPropertyDescriptorEntry";

export function isODataPropertyDesrciptorEntry(obj: any): obj is ODataPropertyDesrciptorEntry {
    return obj.propertyName !== undefined && obj.edmType !== undefined;
}

/**
 * Decorator for an OData property
 */
export function Property(target: object, propertyKey: string) {
    ModelDescriptorStore.Add( target as any,
    new ODataPropertyDesrciptorEntry(propertyKey, EdmType.Unknown));
}
