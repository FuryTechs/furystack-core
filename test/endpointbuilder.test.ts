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

    @test('Add EntitySet')
    public AddAndGetEntitySet() {
        const endPoint = new EndpointBuilder('api');
        endPoint.EntitySet(TestClass, 'testclassentities');
        chai.expect(endPoint.GetAllEntitySets()[0].Name).to.be.eq('testclassentities');
    }

}
