import * as chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { EndpointBuilder } from '../src/endpoint';
import {
    ForeignKey, ForeignKeyDescriptorEntry, ODataPropertyDesrciptorEntry,
    PrimaryKey, PrimaryKeyDescriptorEntry, Property,
} from '../src/model';
import { ModelDescriptor } from '../src/model/ModelDescriptor';
import { ModelDescriptorStore } from '../src/model/ModelDescriptorStore';

class A {
    @PrimaryKey
    public Id: number;
}

// tslint:disable-next-line:max-classes-per-file
class B {
    @PrimaryKey
    public Id: number;

    @Property
    public Prop: string;
}

// tslint:disable-next-line:max-classes-per-file
class C {
    @PrimaryKey
    public Id: number;

    @ForeignKey(B, 'B')
    public bId: number;
    public B: B;
}

// tslint:disable-next-line:max-classes-per-file
@suite
export class DecoratorDescriptorTest {
    @test('Get descriptor for A should return a descriptor instance')
    public GetEntriesFromDescriptorStore() {
        const aDescriptor = ModelDescriptorStore.GetDescriptor(A);
        chai.expect(aDescriptor).to.be.instanceOf(ModelDescriptor);
    }

    @test('Get descriptor for A should contain only a PrimaryKey entry')
    public GetDescriptorPrimaryKeyOnly() {
        const aDescriptor = ModelDescriptorStore.GetDescriptor(A);
        chai.expect(aDescriptor.Entries.length).to.be.equals(1);
        chai.expect(aDescriptor.PrimaryKey).to.be.instanceOf(PrimaryKeyDescriptorEntry);
        chai.expect(aDescriptor.Properties.length).to.be.equals(0);
        chai.expect(aDescriptor.ForeignKeys.length).to.be.equals(0);
    }

    @test('Get descriptor for B should contain a PrimaryKey entry and a Property entry')
    public GetDescriptorPrimaryKeyAndProperty() {
        const aDescriptor = ModelDescriptorStore.GetDescriptor(B);
        chai.expect(aDescriptor.Entries.length).to.be.equals(2);
        chai.expect(aDescriptor.PrimaryKey).to.be.instanceOf(PrimaryKeyDescriptorEntry);
        chai.expect(aDescriptor.Properties.length).to.be.equals(1);
        chai.expect(aDescriptor.Properties[0]).to.be.instanceOf(ODataPropertyDesrciptorEntry);

        chai.expect(aDescriptor.ForeignKeys.length).to.be.equals(0);
    }

    @test('Get descriptor for B should contain a PrimaryKey entry and a Property entry')
    public GetDescriptorPrimaryKeyAndForeignKey() {
        const aDescriptor = ModelDescriptorStore.GetDescriptor(C);
        chai.expect(aDescriptor.Entries.length).to.be.equals(2);
        chai.expect(aDescriptor.PrimaryKey).to.be.instanceOf(PrimaryKeyDescriptorEntry);
        chai.expect(aDescriptor.Properties.length).to.be.equals(0);
        chai.expect(aDescriptor.ForeignKeys.length).to.be.equals(1);
        chai.expect(aDescriptor.ForeignKeys[0]).to.be.instanceOf(ForeignKeyDescriptorEntry);
    }
}
