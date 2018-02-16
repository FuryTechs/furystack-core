import { EdmType } from "../endpoint/EdmTypes";

export class ODataPropertyDesrciptorEntry {

    constructor(propertyName: string, edmType: EdmType) {
        this.propertyName = propertyName;
        this.edmType = edmType;
    }
    public propertyName: string;
    public edmType: EdmType;
}
