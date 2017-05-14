import * as chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { EndpointBuilder } from '../src/endpoint';
import { PrimaryKey, Property } from '../src/index';

class TestClass {
    @PrimaryKey
    public Id: number;
    @Property
    public Property: string;
}

class Test2 {
    @PrimaryKey
    public Id: number;
}

@suite
export class EndpointBuilderTests {
    @test('EndPoint should be constructed')
    public ConstructTest() {
        const endPoint = new EndpointBuilder('api');
    }

    @test('Add Entity Type')
    public AddAndGetEntityType() {
        const endPoint = new EndpointBuilder('api');
        endPoint.EntityType(TestClass);
        chai.expect(endPoint.GetAllEntityTypes()[0].Name).to.be.eq('TestClass');
    }

    @test('Add one type twice should be distincted')
    public AddEntityTypeTwice() {
        const endPoint = new EndpointBuilder('api');
        endPoint.EntityType(TestClass);
        chai.expect(endPoint.GetAllEntityTypes().length).to.be.eq(1);
        endPoint.EntityType(TestClass);
        chai.expect(endPoint.GetAllEntityTypes().length).to.be.eq(1);
    }

    @test('Add EntitySet')
    public AddAndGetEntitySet() {
        const endPoint = new EndpointBuilder('api');
        endPoint.EntitySet(TestClass, 'testclassentities');
        chai.expect(endPoint.GetAllEntitySets()[0].Name).to.be.eq('testclassentities');
    }

    @test('Add EntitySet twice')
    public AddAndGetEntitySetTwice() {
        const endPoint = new EndpointBuilder('api');
        endPoint.EntitySet(TestClass, 'testclassentities');
        chai.expect(endPoint.GetAllEntitySets()[0].Name).to.be.eq('testclassentities');
        endPoint.EntitySet(TestClass, 'testclassentities');
        chai.expect(endPoint.GetAllEntitySets().length).to.be.eq(1);
    }

    @test('Add EntitySet with the same name but different type shold throw error twice')
    public AddAndGetEntitySetTwiceWithDifferentType() {
        const endPoint = new EndpointBuilder('api');
        endPoint.EntitySet(TestClass, 'testclassentities');
        chai.expect(endPoint.GetAllEntitySets()[0].Name).to.be.eq('testclassentities');

        const addFunc = () => {endPoint.EntitySet(Object, 'testclassentities'); };
        chai.expect(addFunc).to.be.throw();
    }

    @test('Should be able to get EntitySet from Type if there is one defined with the specific type')
    public TryGetWithoutNameSuccess() {
        const endPoint = new EndpointBuilder('api');
        endPoint.EntitySet(TestClass, 'testclassentities');
        endPoint.EntitySet(Test2, 'test2EndPoint');
        chai.expect(endPoint.GetAllEntitySets()[0].Name).to.be.eq('testclassentities');

        const found = endPoint.EntitySet(TestClass);

        chai.expect(found.Name).to.be.eq('testclassentities');
    }

    @test('Getting EntitySet without name should throw error, if there are no types defined')
    public TryGetWithoutNameNotDefined() {
        const endPoint = new EndpointBuilder('api');
        const getFunc = () => { endPoint.EntitySet(TestClass); };
        chai.expect(getFunc).to.throws();
    }

    @test('Getting EntitySet without name should throw, if multiple endpoints defined')
    public TryGetWithoutNameShouldThrowIfMultiple() {
       const endPoint = new EndpointBuilder('api');
       endPoint.EntitySet(TestClass, 't1');
       endPoint.EntitySet(TestClass, 't2');
       const getFunc = () => { endPoint.EntitySet(TestClass); };
       chai.expect(getFunc).to.throws();

    }

}
