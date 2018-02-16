import { expect } from "chai";
import { EndpointBuilder } from "../src/endpoint";
import { ModelDescriptorStore, PrimaryKey } from "../src/index";

class TestClass {
    @PrimaryKey
    public id!: number;
    public val!: string;
}

export const endpointEntityTypeTests = describe("EndpointEntityType", () => {

    it("should be constructed", () => {
        const endPoint = new EndpointBuilder("api");
        const type = endPoint.EntityType(TestClass);
        expect(type.name).to.be.eq(ModelDescriptorStore.GetName(TestClass));
    });

});
