import * as chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { EndpointBuilder } from '../src/endpoint';

@suite
export class EndpointBuilderTests {
    @test('EndPoint should be constructed')
    public ConstructTest() {
        const endPoint = new EndpointBuilder('api');
    }

}
