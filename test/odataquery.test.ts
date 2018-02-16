import { expect } from "chai";
import { ODataFilterExpression, ODataQuery } from "../src";

class Test {
    public field!: string;
    public number!: number;
}

export const oDataQueryTests = describe("OData Query", () => {

    it("Query object should be constructed", () => {
        const query = new ODataQuery();
        expect(query).to.be.instanceof(ODataQuery);
    });

    it("BuildFilter should return a FilterBuilder ref", () => {
        const q = new ODataQuery<Test, keyof Test>();
        const f = q.BuildFilter((filter) =>
            filter.Equals("field", "alma")
                .And
                .NotEquals("field", "Körte")
                .Or
                .LessThanOrEquals("number", 2),
        );

        expect(f).to.be.instanceof(ODataQuery);
        expect(f.filter).to.be.eq(`field eq ('alma') and field ne ('Körte') or number le (2)`);
    });

    it("BuildFilter with Equals", () => {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.Equals("field", "Alma"));

        expect(f.filter).to.be.eq(`field eq ('Alma')`);
    });

    it("BuildFilter with Not Equals", () => {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.NotEquals("field", "Alma"));

        expect(f.filter).to.be.eq(`field ne ('Alma')`);
    });

    it("BuildFilter with Greater Than", () => {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.GreaterThan("field", "Alma"));

        expect(f.filter).to.be.eq(`field gt ('Alma')`);
    });

    it("BuildFilter with Greater Than Or Equals", () => {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.GreaterThanOrEquals("field", "Alma"));

        expect(f.filter).to.be.eq(`field ge ('Alma')`);
    });

    it("BuildFilter with Less Than", () => {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.LessThan("field", "Alma"));

        expect(f.filter).to.be.eq(`field lt ('Alma')`);
    });

    it("BuildFilter with Less Than Or Equals", () => {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.LessThanOrEquals("field", "Alma"));

        expect(f.filter).to.be.eq(`field le ('Alma')`);
    });

    it("BuildFilter with Has", () => {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.Has("field", "Alma"));

        expect(f.filter).to.be.eq(`field has ('Alma')`);
    });

    it("BuildFilter with Not", () => {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.Not((not) => not.Equals("field", "Alma")));

        expect(f.filter).to.be.eq(`not (field eq ('Alma'))`);
    });

    it("BuildFilter with inner BuildFilter", () => {
        const f = new ODataQuery<Test, keyof Test>()
            .BuildFilter((filter) => filter.NotEquals("field", "Körte")
                .Or.BuildFilter((inner) =>
                    inner.Equals("field", "Alma")
                        .And
                        .Equals("number", 1)));

        expect(f.filter).to.be.eq(`field ne ('Körte') or (field eq ('Alma') and number eq (1))`);
    });

    it("ODataFilterExpression.FromString() should throw an error until it\'s not implemented :P", () => {
        const getFromString = () => {
            return ODataFilterExpression.FromString("");
        };
        expect(getFromString).to.throw();
    });

});
