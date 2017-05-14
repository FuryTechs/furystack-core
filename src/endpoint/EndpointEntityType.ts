import { ModelDescriptor } from '../model/ModelDescriptor';
import { ActionOwnerAbstract } from './';

export class EndpointEntityType extends ActionOwnerAbstract {

    constructor(public readonly Name: string, public readonly ModelDescriptor: ModelDescriptor) {
        super();
    }
}
