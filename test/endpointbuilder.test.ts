import { expect } from "chai";
import { EndpointBuilder } from "../src/endpoint";
import { PrimaryKey, Property } from "../src/index";

// tslint:disable:max-classes-per-file

class TestClass {
    @PrimaryKey
    public id!: number;
    @Property
    public property!: string;
}

class Test2 {
    @PrimaryKey
    public id!: number;
}

export const endpointBuilderTests = describe("EndpointBuilder", () => {

    let endPoint: EndpointBuilder;

    beforeEach(() => {
        endPoint = new EndpointBuilder("api");
    });

    it("EndPoint should be constructed", () => {
        expect(endPoint).to.be.instanceof(EndpointBuilder);
    });

    it("Add Entity Type", () => {
        endPoint.EntityType(TestClass);
        expect(endPoint.GetAllEntityTypes()[0].name).to.be.eq("TestClass");
    });

    it("Add one type twice should be distincted", () => {
        endPoint.EntityType(TestClass);
        expect(endPoint.GetAllEntityTypes().length).to.be.eq(1);
        endPoint.EntityType(TestClass);
        expect(endPoint.GetAllEntityTypes().length).to.be.eq(1);
    });

    it("Add EntitySet", () => {
        endPoint.EntitySet(TestClass, "testclassentities");
        expect(endPoint.GetAllEntitySets()[0].name).to.be.eq("testclassentities");
    });

    it("Add EntitySet twice", () => {
        endPoint.EntitySet(TestClass, "testclassentities");
        expect(endPoint.GetAllEntitySets()[0].name).to.be.eq("testclassentities");
        endPoint.EntitySet(TestClass, "testclassentities");
        expect(endPoint.GetAllEntitySets().length).to.be.eq(1);
    });

    it("Add EntitySet with the same name but different type shold throw error twice", () => {
        endPoint.EntitySet(TestClass, "testclassentities");
        expect(endPoint.GetAllEntitySets()[0].name).to.be.eq("testclassentities");

        const addFunc = () => {
            endPoint.EntitySet(Test2, "testclassentities");
        };
        expect(addFunc).to.be.throw();
    });

    it("Should be able to get EntitySet from Type if there is one defined with the specific type", () => {
        endPoint.EntitySet(TestClass, "testclassentities");
        endPoint.EntitySet(Test2, "test2EndPoint");
        expect(endPoint.GetAllEntitySets()[0].name).to.be.eq("testclassentities");

        const found = endPoint.EntitySet(TestClass);

        expect(found.name).to.be.eq("testclassentities");
    });

    it("Getting EntitySet without name should throw error, if there are no types defined", () => {
        const getFunc = () => { endPoint.EntitySet(TestClass); };
        expect(getFunc).to.throws();
    });

    it("Getting EntitySet without name should throw, if multiple endpoints defined", () => {
        endPoint.EntitySet(TestClass, "t1");
        endPoint.EntitySet(TestClass, "t2");
        const getFunc = () => { endPoint.EntitySet(TestClass); };
        expect(getFunc).to.throws();
    });
});
