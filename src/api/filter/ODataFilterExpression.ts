import { ODataFilterBuilder } from "./ODataFilterBuilder";
import { ODataFilterConnection } from "./ODataFilterConnection";

export class ODataFilterExpression<T> {

    private value: string = "";

    private getFilterValueSegment(value: any): string {
        const castedValue = value.toString();
        if (typeof value === "string" && !/^[0-9]*$/.test(castedValue)) {
            return `('${castedValue}')`;
        }

        return `(${castedValue})`;
    }

    constructor(public filterBuilderRef: ODataFilterBuilder<T>) { }

    private Finialize() {
        this.filterBuilderRef.filterSegments.push(this);
        return new ODataFilterConnection<T>(this.filterBuilderRef);
    }

    /**
     * Creates an instance of an Equals (~eq) filter segment
     * @param field The name of the field to check (String literal)
     * @param value The value to check
     * @returns The next ODataFilterConnection (Fluent)
     */

    public Equals<K extends keyof T>(field: K, value: any) {
        this.value = `${field} eq ${this.getFilterValueSegment(value)}`;
        return this.Finialize();
    }

    /**
     * Creates an instance of an Not Equals (~ne) filter segment
     * @param field The name of the field to check (String literal)
     * @param value The value to check
     * @returns The next ODataFilterConnection (Fluent)
     */
    public NotEquals<K extends keyof T>(field: K, value: any) {
        this.value = `${field} ne ${this.getFilterValueSegment(value)}`;
        return this.Finialize();
    }

    /**
     * Creates an instance of a Greater Than (~gt) filter segment
     * @param field The name of the field to check (String literal)
     * @param value The value to check
     * @returns The next ODataFilterConnection (Fluent)
     */
    public GreaterThan<K extends keyof T>(field: K, value: any) {
        this.value = `${field} gt ${this.getFilterValueSegment(value)}`;
        return this.Finialize();
    }

    /**
     * Creates an instance of a Greater Than or Equals (~ge) filter segment
     * @param field The name of the field to check (String literal)
     * @param value The value to check
     * @returns The next ODataFilterConnection (Fluent)
     */
    public GreaterThanOrEquals<K extends keyof T>(field: K, value: any) {
        this.value = `${field} ge ${this.getFilterValueSegment(value)}`;
        return this.Finialize();
    }

    /**
     * Creates an instance of a Lesser Than (~lt) filter segment
     * @param field The name of the field to check (String literal)
     * @param value The value to check
     * @returns The next ODataFilterConnection (Fluent)
     */
    public LessThan<K extends keyof T>(field: K, value: any) {
        this.value = `${field} lt ${this.getFilterValueSegment(value)}`;
        return this.Finialize();
    }

    /**
     * Creates an instance of a Lesser Than or equals (~le) filter segment
     * @param field The name of the field to check (String literal)
     * @param value The value to check
     * @returns The next ODataFilterConnection (Fluent)
     */
    public LessThanOrEquals<K extends keyof T>(field: K, value: any) {
        this.value = `${field} le ${this.getFilterValueSegment(value)}`;
        return this.Finialize();
    }

    /**
     * Creates an instance of a HAS (~has) filter segment
     * @param field The name of the field to check (String literal)
     * @param value The value to check
     * @returns The next ODataFilterConnection (Fluent)
     */
    public Has<K extends keyof T>(field: K, value: any) {
        this.value = `${field} has ${this.getFilterValueSegment(value)}`;
        return this.Finialize();
    }

    /**
     * Creates an instance of a nested negated (~not) FilterBuilder object
     * @param build The fluent chain for the filter expression
     * @returns The next ODataFilterConnection (Fluent)
     */
    public Not(build: (b: ODataFilterExpression<T>) => void) {
        const builder = ODataFilterBuilder.Create<T>();
        build(builder);
        this.value = `not (${builder.toString()})`;
        return this.Finialize();
    }

    /**
     * Creates an instance of a nested FilterBuilder object
     * @param build The fluent chain for the filter expression
     * @returns The next ODataFilterConnection (Fluent)
     */
    public BuildFilter(build: (b: ODataFilterExpression<T>) => void) {
        const builder = ODataFilterBuilder.Create<T>();
        build(builder);
        const filterString = builder.filterBuilderRef.filterSegments.map((a) => a.toString()).join(" ");
        this.value = `(${filterString})`;
        return this.Finialize();
    }

    /**
     * Gets the evaluated OData filter segment
     * @returns The OData filter segment
     */
    public toString(): string {
        return this.value;
    }

    /**
     * Factory method - creates an ODataFilterExpression<T> instance from a $filter string
     * Todo - implement parsing logic
     * @returns
     */
    public static FromString<T>(filterExpression: string): ODataFilterExpression<T> {
        throw new Error("Implement me pls :(");
    }

}
