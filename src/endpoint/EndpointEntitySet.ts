import { ActionOwnerAbstract } from "./";
import {EndpointEntityType} from "./EndpointEntityType";

export class EndpointEntitySet extends ActionOwnerAbstract {

    constructor(public readonly name: string,
                public readonly endpointEntityType: EndpointEntityType) {
            super();
    }
}
