export abstract class ODataOperation<Field> {
    public expand?: Field[];
    public select?: Field[];
}
