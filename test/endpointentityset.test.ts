import * as chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { EndpointBuilder } from '../src/endpoint';
import { PrimaryKey } from '../src/index';

class TestClass {
    @PrimaryKey
    public id: number;
    public val: string;
}

@suite
export class EndpointEntitySetTests {
    @test('EndPoint should be constructed')
    public ConstructTest() {
        const endPoint = new EndpointBuilder('api');
        endPoint.EntityType(TestClass);

        const set = endPoint.EntitySet(TestClass, 'EntitySet');
        chai.expect(set.Name).to.be.eq('EntitySet');
    }

}
