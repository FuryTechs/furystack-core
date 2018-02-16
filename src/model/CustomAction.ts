import { RequestMethod } from "../api/http-models/RequestMethod";

/**
 * This class extracts a custom logics of a specific scope having their own Custom Action(s)
 */
export class CustomAction<TBody, TReturns> {
    public constructor(
                       public readonly name: string,
                       public readonly requestType: RequestMethod,
                       public readonly bodyType: {new(): TBody},
                       public readonly returnsType: {new(): TReturns}) {

                        this.bodyTypeName = this.bodyType.name;
                        this.returnTypeName = this.returnsType.name;

    }

    public readonly bodyTypeName: string;

    public readonly returnTypeName: string;
}
