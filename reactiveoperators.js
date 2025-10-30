// reactiveoperators.js
// Run: node reactiveoperators.js <operator>
const { of, from, interval, merge, concat, zip } = require('rxjs');
const { map, filter, mergeMap, concatMap, delay, take, reduce, scan, tap } = require('rxjs/operators');

const operator = process.argv[2];
if (!operator) {
  console.log("⚠ Please provide an operator: map, filter, mergeMap, concatMap, merge, concat, zip, reduce, scan, tap");
  process.exit(1);
}

console.log(`\n🔹 Running example for: ${operator}\n`);

const examples = {
  map: () => of(1,2,3,4,5).pipe(map(x => x*10)).subscribe(x => console.log('map ->', x)),
  filter: () => of(1,2,3,4,5).pipe(filter(x => x%2===0)).subscribe(x => console.log('filter ->', x)),
  mergeMap: () => of('A','B').pipe(
    mergeMap(x => of(x+'1', x+'2').pipe(delay(x==='A'?300:100)))
  ).subscribe(x => console.log('mergeMap ->', x)),
  concatMap: () => of('A','B').pipe(
    concatMap(x => of(x+'1', x+'2').pipe(delay(200)))
  ).subscribe(x => console.log('concatMap ->', x)),
  merge: () => merge(
    interval(200).pipe(take(3), map(i=>'A'+i)),
    interval(100).pipe(take(3), map(i=>'B'+i))
  ).subscribe(x => console.log('merge ->', x)),
  concat: () => concat(
    from([1,2,3]),
    from([4,5])
  ).subscribe(x => console.log('concat ->', x)),
  zip: () => zip(
    of('X','Y','Z'),
    of(1,2)
  ).subscribe(x => console.log('zip ->', x)),
  reduce: () => of(1,2,3,4,5).pipe(
    reduce((acc,v)=>acc+v,0)
  ).subscribe(x => console.log('reduce ->', x)),
  scan: () => of(1,2,3,4,5).pipe(
    scan((acc,v)=>acc+v,0)
  ).subscribe(x => console.log('scan ->', x)),
  tap: () => of('a','b','c').pipe(
    tap(x => console.log('tap (side effect) ->', x))
  ).subscribe()
};

if (examples[operator.toLowerCase()]) {
  examples[operator.toLowerCase()]();
} else {
  console.log("❌ Unknown operator! Try: map, filter, mergeMap, concatMap, merge, concat, zip, reduce,nodr, tap");
}
