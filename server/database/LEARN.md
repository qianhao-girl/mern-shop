# Query Array Field
## '$'
**https://docs.mongodb.com/manual/reference/operator/projection/positional/#proj._S_**
usage: 
```
db.collection.find( { <array>: <value> ... },
                    { "<array>.$": 1 } )
db.collection.find( { <array.field>: <value> ...},
                    { "<array>.$": 1 } )
```
> Note: the <array> field being limited must appear in the query document, and the <value> can be documents that contain query operator expressions.
## $elemMatch 
**https://docs.mongodb.com/manual/reference/operator/query/elemMatch/**
- The $elemMatch operator matches documents that contain an array field with at least one element that matches all the specified query criteria.