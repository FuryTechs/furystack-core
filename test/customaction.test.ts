import { expect } from "chai";
import { EndpointBuilder } from "../src/endpoint";

export const customActionTests = describe("CustomAction", () => {
    it("Trying get a non-defined action should throw an error", () => {
        const endpoint = new EndpointBuilder("root");
        const getNotExisting = () => { endpoint.CustomAction("NotExisting"); };
        expect(getNotExisting).to.throw();
    });

    it("Getting a specified Action should return a correct Action", () => {
        const endpoint = new EndpointBuilder("root");
        endpoint.CustomAction("Custom", "GET", Object, Object);
        endpoint.CustomAction("Custom2", "POST", Object, Object);

        expect(endpoint.CustomAction("Custom").requestType).to.eq("GET");
    });
});
