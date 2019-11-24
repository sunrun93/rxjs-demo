import { Component, OnInit } from '@angular/core';
import { combineLatest, from, timer, of, empty, throwError, concat, merge, zip, race, forkJoin } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-join-creation-operators',
  templateUrl: './join-creation-operators.component.html',
  styleUrls: ['./join-creation-operators.component.less']
})
export class JoinCreationOperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.testConcat();
    // this.testMerge();
    // this.testZip();
    // this.testCombainLatest();
    // this.testRace();
    this.testForkjoin();
  }

  testConcat(){
    const source1 = of(1,2,3);
    const source2 = of(4,5);
    concat(source1,source2).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // 1
    // 2
    // 3
    // 4
    // 5
    // complete

    const sourceA = from(['A', 'a'])
    const sourceB = from(['B', 'b'])
    const sourceC = from(['C', 'c'])
    concat(sourceA,sourceB,sourceC).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // A
    // a
    // B
    // b
    // C
    // c
    // complete
  }

  testMerge(){
    let sourceA = timer(0, 1000).pipe(map(x => x + 'A'), take(3));
    let sourceB = timer(500, 1000).pipe(map(x => x + 'B'), take(3));
    merge(sourceA, sourceB).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // 0A
    // 0B
    // 1A
    // 1B
    // 2A
    // 2B
    // complete

    let source1 = from([1,2,3]);
    let source2 = from(['a','b','c']);
    merge(source1, source2).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // 1
    // 2
    // 3
    // a
    // b
    // c
    // complete
  }

  testZip(){
    let source1 = from([1,2,3]);
    let source2 = from(['a','b','c','d']);
    zip(source1, source2).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // [1, 'a']
    // [2, 'b']
    // [3, 'c']
    // complete

    let sourceA = timer(0, 1000).pipe(map(x => x + 'A'), take(3));
    let sourceB = timer(500, 500).pipe(map(x => x + 'B'), take(3));
    zip(sourceA, sourceB).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // ["0A", "0B"]
    // ["1A", "1B"]
    // ["2A", "2B"]
    // complete
  }

  testCombainLatest(){
    let sourceA = timer(0, 1000).pipe(map(x => x + 'A'), take(3));
    let sourceB = timer(500, 1000).pipe(map(x => x + 'B'), take(3));
    combineLatest(sourceA, sourceB).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )

      // Result:
      // ["0A", "0B"]
      // ["1A", "0B"]
      // ["1A", "1B"]
      // ["2A", "1B"]
      // ["2A", "2B"]
      // complete

      let source1 = from([1, 2, 3]);
      let source2 = from(['a', 'b', 'c']);
      combineLatest(source1, source2).subscribe(
        v => console.log(v),
        err => console.log(err),
        () => console.log('complete')
      )

      // Result:
      // [3, "a"]
      // [3, "b"]
      // [3, "c"]
      // complete
  }

  testRace(){
    let sourceA = timer(0, 1000).pipe(map(x => x + 'A'), take(3));
    let sourceB = timer(500, 1000).pipe(map(x => x + 'B'), take(3));
    race(sourceA, sourceB).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // 0A
    // 1A
    // 2A
    // complete
  }

  testForkjoin(){
    let sourceA = timer(0, 1000).pipe(map(x => x + 'A'), take(3));
    let sourceB = timer(500, 1000).pipe(map(x => x + 'B'), take(3));
    let sourceC = timer(1000, 1000).pipe(map(x => x + 'C'), take(3));
    forkJoin(sourceA, sourceB,sourceC).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // ["2A", "2B", "2C"]
    // complete
  }

 

  
}
