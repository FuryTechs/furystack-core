import { SchemaType, TEntityKeyElement } from '../../xmlns/docs.oasis-open.org/odata/ns/edm';
import { TEntitySet, TEntityType, TNavigationProperty, TProperty } from '../../xmlns/docs.oasis-open.org/odata/ns/edm';
import { ModelDescriptorStore } from '../model/ModelDescriptorStore';

/**
 * The Builder class provides you an API to create OData ShcemaTypes
 */
export class EndpointBuilder {

    private EntityTypes: TEntityType[] = [];
    private EntitySets: TEntitySet[] = [];

    /**
     * The Builder class provides you an API to create OData ShcemaTypes
     * @param NameSpaceRoot The root of the public Express route where the Builder will be accessible
     */
    constructor(public NameSpaceRoot: string) { }

    /**
     * Gets the SchemaType based on the provided EntityTypes, EntitySets, etc...
     */
    public GetModel(): SchemaType {
        return {
            EntityContainer: [{
                EntitySet: this.EntitySets,
            }],
            EntityType: this.EntityTypes,
            Namespace: this.NameSpaceRoot,
        } as SchemaType;
    }

    /**
     * Returns an EntityType for the model class (and registers it to the Builder is neccessary)
     * @param entityTypeClass The model class for the EntityType. @PrimaryKey is required.
     */
    public EntityType<T>(entityTypeClass: { new (): T }): TEntityType {

        const entityTypeName = ModelDescriptorStore.GetName(entityTypeClass);

        const existing = this.EntityTypes.find((t) => t.Name === entityTypeName);
        if (existing) {
            return existing;
        }

        const descriptor = ModelDescriptorStore.GetDescriptor(entityTypeClass);

        const entityType = {
            Name: entityTypeName,
            NavigationProperty: [],
            Property: [],
        } as TEntityType;

        entityType.Key = [{
            PropertyRef: [
                { Name: descriptor.PrimaryKey.PrimaryKey },
            ],
        }] as TEntityKeyElement[];

        const tProperties = descriptor.Properties.map<TProperty>((prop) => ({
                Name: prop.PropertyName,
                Type: prop.EdmType.toString(),
            } as TProperty));

        entityType.Property = tProperties;

        const tNavigationProperties = descriptor.ForeignKeys.map<TNavigationProperty>((k) => ({
            Name: k.ForeignKeyField,
            Type: k.ReferenceName,
        } as TNavigationProperty));

        entityType.NavigationProperty = tNavigationProperties;

        this.EntityTypes.push(entityType);
        return entityType;
    }

    /**
     * Gets an EntitySet with a specified name for an EntityType. Will be registered to the builder if neccessary
     * @param entityTypeClass entityTypeClass The model class for the EntitySet.
     *  Register as an EntityType before adding an EntitySet
     * @param entitySetName The collection name (will be part of the API URL)
     */
    public EntitySet<T>(entityTypeClass: { new (): T }, entitySetName: string): TEntitySet {

        const existing = this.EntitySets.find((s) => s.Name === entitySetName);

        const entityTypeName = ModelDescriptorStore.GetName(entityTypeClass);

        if (existing) {
            if (existing.EntityType !== entityTypeName) {
                throw new Error(`Mismatch on registering entitySet '${entitySetName}', with type '${entityTypeName}.
                Already registered to type '${existing.EntityType}'`);
            }
            return existing;
        }

        const entityType = this.EntityTypes.find((e) => e.Name === entityTypeName);
        if (!entityType) {
            throw new Error(`Entity type not yet added for type '${entityTypeName}', please add it first.`);
        }

        const newEntitySet = {
            EntityType: entityTypeName,
            Name: entitySetName,
        } as TEntitySet;
        this.EntitySets.push(newEntitySet);
        return newEntitySet;
    }
}
