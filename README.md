# furystack-core


[![Build Status](https://travis-ci.org/FuryTechs/furystack-core.svg?branch=master)](https://travis-ci.org/FuryTechs/furystack-core)
[![codecov](https://codecov.io/gh/FuryTechs/furystack-core/branch/master/graph/badge.svg)](https://codecov.io/gh/FuryTechs/furystack-core)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/15a860bfcb6e4779880ebb46ce2aa882)](https://www.codacy.com/app/gallayl/furystack-core?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=FuryTechs/furystack-core&amp;utm_campaign=Badge_Grade)


FuryStack framework, core package.

Model declaration with _@PrimaryKey_, _@Property_ and _@ForeignKey_ decorators:
``` ts
class RefExample {
    @PrimaryKey
    public Id;

    @Property
    public Value: string;
}

class MyModel {
    @PrimaryKey
    public Id: number;

    @Property
    public MyPropertyA: string;

    @Property
    public MyPropertyB: string;

    @ForeignKey(RefExample, 'RefExample')
    public RefExampleId: number;
    public RefExample: RefExample;
}
```

Accessing model metadata via Global ModelDescriptorStore, usage:
``` ts
const descriptor = ModelDescriptorStore.GetDescriptor(MyModel);
/*

descriptor.Object = {constructor: class MyModel { … }}

descriptor.Entries = [
  PrimaryKeyDescriptorEntry {PrimaryKey: "Id"}
  ODataPropertyDesrciptorEntry {PropertyName: "MyPropertyA", EdmType: 0}
  ODataPropertyDesrciptorEntry {PropertyName: "MyPropertyB", EdmType: 0}
  ForeignKeyDescriptorEntry {ForeignKeyField: "RefExample", ReferenceName: "RefExample"}
]

descriptor..PrimaryKey = PrimaryKeyDescriptorEntry {PrimaryKey: "Id"}

descriptor.Properties = [
  ODataPropertyDesrciptorEntry {PropertyName: "MyPropertyA", EdmType: 0}
  ODataPropertyDesrciptorEntry {PropertyName: "MyPropertyB", EdmType: 0}
]

descriptor.ForeignKeys = [
  ForeignKeyDescriptorEntry {ForeignKeyField: "RefExample", ReferenceName: "RefExample"}
]

*/



```
