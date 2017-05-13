import * as chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { EndpointBuilder } from '../src/endpoint';

@suite
export class CustomActionsTests {

    @test('Trying get a non-defined action should throw an error')
    public GettingNotSpecifiedActionShouldThrowError() {
        const endpoint = new EndpointBuilder('root');
        const getNotExisting = () => {endpoint.CustomAction('NotExisting'); };
        chai.expect(getNotExisting).to.throw();
    }

    @test('Getting a specified Action should return a correct Action')
    public GetSpecifiedShouldReturnAction() {
        const endpoint = new EndpointBuilder('root');
        endpoint.CustomAction('Custom', 'GET', Object, Object);
        endpoint.CustomAction('Custom2', 'POST', Object, Object);

        chai.expect(endpoint.CustomAction('Custom').RequestType).to.eq('GET');
    }
}
