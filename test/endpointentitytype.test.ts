import * as chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { EndpointBuilder } from '../src/endpoint';
import { EndpointEntityType, ModelDescriptor, ModelDescriptorStore, PrimaryKey } from '../src/index';

class TestClass {
    @PrimaryKey
    public id: number;
    public val: string;
}

@suite
export class EndpointEntityTypeTests {
    @test('EndPoint should be constructed')
    public ConstructTest() {
        const endPoint = new EndpointBuilder('api');
        const type = endPoint.EntityType(TestClass);

        chai.expect(type.Name).to.be.eq(ModelDescriptorStore.GetName(TestClass));
    }

}
