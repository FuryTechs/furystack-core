import { ModelDescriptorStore } from '../model/ModelDescriptorStore';
import { ActionOwnerAbstract } from './';
import { EndpointEntitySet } from './EndpointEntitySet';
import { EndpointEntityType } from './EndpointEntityType';

/**
 * The Builder class provides you an API to create OData ShcemaTypes
 */
export class EndpointBuilder extends ActionOwnerAbstract {

    private EntityTypes: EndpointEntityType[] = [];

    public GetAllEntityTypes() {
        return this.EntityTypes.slice();
    }

    private EntitySets: EndpointEntitySet[] = [];

    public GetAllEntitySets() {
        return this.EntitySets.slice();
    }

    /**
     * The Builder class provides you an API to create OData ShcemaTypes
     * @param NameSpaceRoot The root of the public Express route where the Builder will be accessible
     */
    constructor(public NameSpaceRoot: string) {
        super();
    }

    /**
     * Returns an EntityType for the model class (and registers it to the Builder is neccessary)
     * @param entityTypeClass The model class for the EntityType. @PrimaryKey is required.
     */
    public EntityType<T>(entityTypeClass: { new (): T }): EndpointEntityType {

        const entityTypeName = ModelDescriptorStore.GetName(entityTypeClass);

        const existing = this.EntityTypes.find((t) => t.Name === entityTypeName);
        if (existing) {
            return existing;
        }

        const descriptor = ModelDescriptorStore.GetDescriptor(entityTypeClass);
        const newEntityType = new EndpointEntityType(entityTypeName, descriptor);
        this.EntityTypes.push(newEntityType);
        return newEntityType;
    }

    /**
     * Gets an EntitySet with a specified name for an EntityType. Will be registered to the builder if neccessary
     * @param entityTypeClass entityTypeClass The model class for the EntitySet.
     *  Register as an EntityType before adding an EntitySet
     * @param entitySetName The collection name (will be part of the API URL)
     */
    public EntitySet<T>(entityTypeClass: { new (): T }, entitySetName: string): EndpointEntitySet {

        const existing = this.EntitySets.find((s) => s.Name === entitySetName);

        const entityTypeName = ModelDescriptorStore.GetName(entityTypeClass);

        if (existing) {
            if (existing.EndpointEntityType.Name !== entityTypeName) {
                throw new Error(`Mismatch on registering entitySet '${entitySetName}', with type '${entityTypeName}.
                Already registered to type '${existing.EndpointEntityType.Name}'`);
            }
            return existing;
        }
        let entityType = this.EntityTypes.find((e) => e.Name === entityTypeName);
        if (!entityType) {
            entityType = this.EntityType(entityTypeClass);
        }
        const newEntitySet = new EndpointEntitySet(entitySetName, entityType);
        this.EntitySets.push(newEntitySet);
        return newEntitySet;
    }
}
