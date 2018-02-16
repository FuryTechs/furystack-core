import { ModelDescriptor } from "../model/ModelDescriptor";
import { ActionOwnerAbstract } from "./";

export class EndpointEntityType extends ActionOwnerAbstract {

    constructor(public readonly name: string, public readonly modelDescriptor: ModelDescriptor) {
        super();
    }
}
