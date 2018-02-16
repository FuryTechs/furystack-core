import { ODataFilterBuilder } from "../filter/ODataFilterBuilder";
import { ODataFilterExpression } from "../filter/ODataFilterExpression";
import { ODataOperation } from "./ODataOperation";

export class ODataQuery<EntityType, FieldType> extends ODataOperation<FieldType> {

    /**
     * Sets the '$filter=' variable in the OData Query URL.
     */
    public filter!: string;

    /**
     * Builds a query expression for the OData Query
     * @param build The builder expression
     * @returns The ODataQuery instance (Fluent)
     */
    public BuildFilter(build: (b: ODataFilterExpression<EntityType>) => void): ODataQuery<EntityType, FieldType> {
        const builder = ODataFilterBuilder.Create<EntityType>();
        build(builder);
        this.filter = builder.filterBuilderRef.toString();
        return this;
    }

    /**
     * Sets the OData $top= query attribute
     */
    public top?: number;

    /**
     * Sets the OData $skip= query attribute
     */
    public skip?: number;

    /**
     * Sets the OData $orderby= query attribute
     */
    public orderBy?: FieldType[];

}
