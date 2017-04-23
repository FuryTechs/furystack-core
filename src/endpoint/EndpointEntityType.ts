import { ModelDescriptor } from '../model/ModelDescriptor';

export class EndpointEntityType {

    constructor(public readonly Name: string, public readonly ModelDescriptor: ModelDescriptor) {

    }
}
