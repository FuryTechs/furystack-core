import { expect } from "chai";
import {
    ForeignKey, ForeignKeyDescriptorEntry, ODataPropertyDesrciptorEntry,
    PrimaryKey, PrimaryKeyDescriptorEntry, Property,
} from "../src/model";
import { ModelDescriptor } from "../src/model/ModelDescriptor";
import { ModelDescriptorStore } from "../src/model/ModelDescriptorStore";

// tslint:disable:max-classes-per-file

class A {
    @PrimaryKey
    public id!: number;
}

class B {
    @PrimaryKey
    public id!: number;

    @Property
    public prop!: string;
}

class C {
    @PrimaryKey
    public id!: number;

    @ForeignKey(B, "b")
    public bId!: number;
    public b!: B;
}

export const decoratorDescriptorTests = describe("DecoratorDescriptor", () => {
    it("Get descriptor for A should return a descriptor instance", () => {
        const aDescriptor = ModelDescriptorStore.GetDescriptor(A);
        expect(aDescriptor).to.be.instanceOf(ModelDescriptor);
    });

    it("Get descriptor for A should contain only a PrimaryKey entry", () => {
        const aDescriptor = ModelDescriptorStore.GetDescriptor(A);
        expect(aDescriptor.entries.length).to.be.equals(1);
        expect(aDescriptor.PrimaryKey).to.be.instanceOf(PrimaryKeyDescriptorEntry);
        expect(aDescriptor.Properties.length).to.be.equals(0);
        expect(aDescriptor.ForeignKeys.length).to.be.equals(0);
    });

    it("Get descriptor for B should contain a PrimaryKey entry and a Property entry", () => {
        const aDescriptor = ModelDescriptorStore.GetDescriptor(B);
        expect(aDescriptor.entries.length).to.be.equals(2);
        expect(aDescriptor.PrimaryKey).to.be.instanceOf(PrimaryKeyDescriptorEntry);
        expect(aDescriptor.Properties.length).to.be.equals(1);
        expect(aDescriptor.Properties[0]).to.be.instanceOf(ODataPropertyDesrciptorEntry);

        expect(aDescriptor.ForeignKeys.length).to.be.equals(0);
    });

    it("Get descriptor for C should contain a PrimaryKey entry and a Property entry", () => {
        const aDescriptor = ModelDescriptorStore.GetDescriptor(C);
        expect(aDescriptor.entries.length).to.be.equals(2);
        expect(aDescriptor.PrimaryKey).to.be.instanceOf(PrimaryKeyDescriptorEntry);
        expect(aDescriptor.Properties.length).to.be.equals(0);
        expect(aDescriptor.ForeignKeys.length).to.be.equals(1);
        expect(aDescriptor.ForeignKeys[0]).to.be.instanceOf(ForeignKeyDescriptorEntry);
    });

    it("Get descriptor type name for A should return A", () => {
        const aName = ModelDescriptorStore.GetName(A);
        expect(aName).to.be.eq("A");
    });
});
