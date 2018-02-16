import { ModelDescriptorStore } from "../model/ModelDescriptorStore";
import { ActionOwnerAbstract } from "./";
import { EndpointEntitySet } from "./EndpointEntitySet";
import { EndpointEntityType } from "./EndpointEntityType";

/**
 * The Builder class provides you an API to create OData ShcemaTypes
 */
export class EndpointBuilder extends ActionOwnerAbstract {

    private entityTypes: EndpointEntityType[] = [];

    public GetAllEntityTypes() {
        return this.entityTypes.slice();
    }

    private entitySets: EndpointEntitySet[] = [];

    public GetAllEntitySets() {
        return this.entitySets.slice();
    }

    /**
     * The Builder class provides you an API to create OData ShcemaTypes
     * @param NameSpaceRoot The root of the public Express route where the Builder will be accessible
     */
    constructor(public nameSpaceRoot: string) {
        super();
    }

    /**
     * Returns an EntityType for the model class (and registers it to the Builder is neccessary)
     * @param entityTypeClass The model class for the EntityType. @PrimaryKey is required.
     */
    public EntityType<T>(entityTypeClass: { new (): T }): EndpointEntityType {

        const entityTypeName = ModelDescriptorStore.GetName(entityTypeClass);

        const existing = this.entityTypes.find((t) => t.name === entityTypeName);
        if (existing) {
            return existing;
        }

        const descriptor = ModelDescriptorStore.GetDescriptor(entityTypeClass);
        const newEntityType = new EndpointEntityType(entityTypeName, descriptor);
        this.entityTypes.push(newEntityType);
        return newEntityType;
    }

    /**
     * Gets an EntitySet with a specified name for an EntityType. Will be registered to the builder if neccessary
     * @param entityTypeClass entityTypeClass The model class for the EntitySet.
     *  Register as an EntityType before adding an EntitySet
     * @param entitySetName The collection name (will be part of the API URL)
     */
    public EntitySet<T>(entityTypeClass: { new (): T }, entitySetName?: string): EndpointEntitySet {

        const entityTypeName = ModelDescriptorStore.GetName(entityTypeClass);

        if (!entitySetName) {
            const entitySetsWithType = this.entitySets.filter((a) =>
                a.endpointEntityType.name === entityTypeName);
            if (entitySetsWithType.length === 1) {
                return entitySetsWithType[0];
            } else {
                throw Error(`Cannot get EntitySet for type ${entityTypeName}. There are '${entitySetsWithType.length}' sets defined with the same on this endpoint`);
            }
        }

        const existing = this.entitySets.find((s) => s.name === entitySetName);

        if (existing) {
            if (existing.endpointEntityType.name !== entityTypeName) {
                throw new Error(`Mismatch on registering entitySet '${entitySetName}', with type '${entityTypeName}. Already registered to type '${existing.endpointEntityType.name}'`);
            }
            return existing;
        }
        let entityType = this.entityTypes.find((e) => e.name === entityTypeName);
        if (!entityType) {
            entityType = this.EntityType(entityTypeClass);
        }
        const newEntitySet = new EndpointEntitySet(entitySetName, entityType);
        this.entitySets.push(newEntitySet);
        return newEntitySet;
    }
}
