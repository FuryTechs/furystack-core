import { expect } from "chai";
import { CollectionResult } from "../src/index";

export const collectionResultTests = describe("Collection result", () => {
    it("should be constructed", () => {
        const cr = new CollectionResult<object>([], 0, "Context", "NextLink");
        expect(cr.value.length).to.be.eq(0);
        expect(cr["@odata.count"]).to.be.eq(0);
        expect(cr["@odata.context"]).to.be.eq("Context");
        expect(cr["@odata.nextlink"]).to.be.eq("NextLink");
    });
});
