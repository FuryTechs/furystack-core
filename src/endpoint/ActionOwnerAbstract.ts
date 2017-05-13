import { CustomAction } from '../';
import { RequestMethod } from '../api/http-models/RequestMethod';

export class ActionOwnerAbstract {

    private CustomActions: Array<CustomAction<any, any>> = [];

    public CustomAction<TBody, TReturns>(
            name: string,
            RequestType?: RequestMethod,
            bodyType?: {new(): TBody},
            returnsType?: {new(): TReturns}): CustomAction<TBody, TReturns> {

        const existing = this.CustomActions[name as any];
        if (existing) {
            return existing as CustomAction<TBody, TReturns>;
        }

        if (!RequestType || !bodyType || !returnsType) {
            throw Error('RequestType, BodyType and ReturnsType are required, when you define a custom action');
        }
        const newAction = new CustomAction(name, RequestType, bodyType, returnsType);
        this.CustomActions[name as any] = newAction;
        return newAction;
    }
}
