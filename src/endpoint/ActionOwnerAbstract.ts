import { CustomAction } from "../";
import { RequestMethod } from "../api/http-models/RequestMethod";

export class ActionOwnerAbstract {

    private customActions: Array<CustomAction<any, any>> = [];

    public CustomAction<TBody, TReturns>(
            name: string,
            requestType?: RequestMethod,
            bodyType?: {new(): TBody},
            returnsType?: {new(): TReturns}): CustomAction<TBody, TReturns> {

        const existing = this.customActions.find((a) => a.name === name);
        if (existing) {
            return existing as CustomAction<TBody, TReturns>;
        }

        if (!requestType || !bodyType || !returnsType) {
            throw Error("RequestType, BodyType and ReturnsType are required, when you define a custom action");
        }
        const newAction = new CustomAction(name, requestType, bodyType, returnsType);
        this.customActions.push(newAction);
        return newAction;
    }
}
