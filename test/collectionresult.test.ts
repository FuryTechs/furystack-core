import * as chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { CollectionResult } from '../src/index';

@suite
export class CollectionResultTests {

    @test('CollectionResult should be constructed')
    public GettingNotSpecifiedActionShouldThrowError() {
        const cr = new CollectionResult<object>([], 0, 'Context', 'NextLink');

        chai.expect(cr.value.length).to.be.eq(0);
        chai.expect(cr['@odata.count']).to.be.eq(0);
        chai.expect(cr['@odata.context']).to.be.eq('Context');
        chai.expect(cr['@odata.nextlink']).to.be.eq('NextLink');
    }
}
