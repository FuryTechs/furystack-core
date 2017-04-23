import {EndpointEntityType} from './EndpointEntityType';

export class EndpointEntitySet {

    constructor(public readonly Name: string,
                public readonly EndpointEntityType: EndpointEntityType) {

    }
}
