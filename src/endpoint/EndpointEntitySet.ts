import { ActionOwnerAbstract } from './';
import {EndpointEntityType} from './EndpointEntityType';

export class EndpointEntitySet extends ActionOwnerAbstract {

    constructor(public readonly Name: string,
                public readonly EndpointEntityType: EndpointEntityType) {
            super();
    }
}
