import { expect } from "chai";
import { EndpointBuilder } from "../src/endpoint";
import { PrimaryKey } from "../src/index";

class TestClass {
    @PrimaryKey
    public id!: number;
    public val!: string;
}

export const endpointEntitySetTests = describe("EndpointEntitySet", () => {
    it("EndPoint should be constructed", () => {
        const endPoint = new EndpointBuilder("api");
        endPoint.EntityType(TestClass);

        const set = endPoint.EntitySet(TestClass, "EntitySet");
        expect(set.name).to.be.eq("EntitySet");
    });
});
