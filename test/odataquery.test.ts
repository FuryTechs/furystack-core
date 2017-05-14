import * as chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { ODataQuery } from '../src';

class Test {
    public Field: string;
    public Number: number;
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
            filter.Equals('Field', 'alma')
                .And
                .NotEquals('Field', 'Körte')
                .Or
                .LessThanOrEquals('Number', 2),
        );

        chai.expect(f).to.be.instanceof(ODataQuery);
        chai.expect(f.Filter).to.be.eq(`Field eq ('alma') and Field ne ('Körte') or Number le (2)`);
    }

    @test('BuildFilter with Equals')
    public BuildFilterEq() {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.Equals('Field', 'Alma'));

        chai.expect(f.Filter).to.be.eq(`Field eq ('Alma')`);
    }

    @test('BuildFilter with Equals')
    public BuildFilterNEq() {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.NotEquals('Field', 'Alma'));

        chai.expect(f.Filter).to.be.eq(`Field ne ('Alma')`);
    }

    @test('BuildFilter with Greater Than')
    public BuildFilterGThan() {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.GreaterThan('Field', 'Alma'));

        chai.expect(f.Filter).to.be.eq(`Field gt ('Alma')`);
    }

    @test('BuildFilter with Greater Than Or Equals')
    public BuildFilterGThanOrEq() {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.GreaterThanOrEquals('Field', 'Alma'));

        chai.expect(f.Filter).to.be.eq(`Field ge ('Alma')`);
    }

    @test('BuildFilter with Less Than')
    public BuildFilterLesshan() {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.LessThan('Field', 'Alma'));

        chai.expect(f.Filter).to.be.eq(`Field lt ('Alma')`);
    }

    @test('BuildFilter with Greater Than Or Equals')
    public BuildFilterLessThanOrEq() {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.LessThanOrEquals('Field', 'Alma'));

        chai.expect(f.Filter).to.be.eq(`Field le ('Alma')`);
    }

    @test('BuildFilter with Has')
    public BuildFilterHas() {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.Has('Field', 'Alma'));

        chai.expect(f.Filter).to.be.eq(`Field has ('Alma')`);
    }

    @test('BuildFilter with Not')
    public BuildFilterNot() {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.Not((not) => not.Equals('Field', 'Alma')));

        chai.expect(f.Filter).to.be.eq(`not (Field eq ('Alma'))`);
    }

    @test('BuildFilter with inner BuildFilter')
    public BuildFilterNested() {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.NotEquals('Field', 'Körte')
                .Or.BuildFilter((inner) =>
                    inner.Equals('Field', 'Alma')
                        .And
                        .Equals('Number', 1)));

        chai.expect(f.Filter).to.be.eq(`Field ne ('Körte') or (Field eq ('Alma') and Number eq (1))`);
    }

}
