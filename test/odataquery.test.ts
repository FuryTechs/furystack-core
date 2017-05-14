import * as chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { ODataQuery } from '../src';

class Test {
    public Field: string;
}

@suite
export class ODataQueryTests {

    @test('Query object should be constructed')
    public ConstructTest() {
        const query = new ODataQuery();
    }

    @test('BuildFilter should return a FilterBuilder ref')
    public BuildFilter() {
        // tslint:disable-next-line:no-object-literal-type-assertion
        const q = new ODataQuery<Test, keyof Test>();
        const f = q.BuildFilter((filter) =>
            filter.Equals('Field', 'alma'),
        );

        chai.expect(f).to.be.instanceof(ODataQuery);
    }

}
