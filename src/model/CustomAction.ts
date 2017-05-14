import { RequestMethod } from '../api/http-models/RequestMethod';

/**
 * This class extracts a custom logics of a specific scope having their own Custom Action(s)
 */
export class CustomAction<TBody, TReturns> {
    public constructor(
                       public readonly Name: string,
                       public readonly RequestType: RequestMethod,
                       public readonly BodyType: {new(): TBody},
                       public readonly ReturnsType: {new(): TReturns}) {

                        this.BodyTypeName = this.BodyType.name;
                        this.ReturnTypeName = this.ReturnsType.name;

    }

    public readonly BodyTypeName: string;

    public readonly ReturnTypeName: string;
}
