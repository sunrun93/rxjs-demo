import { Component, OnInit } from '@angular/core';
import { from, concat, of, range, empty } from 'rxjs';
import { count, min, max, reduce, every, find, findIndex, isEmpty, defaultIfEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-math-bool-operators',
  templateUrl: './math-bool-operators.component.html',
  styleUrls: ['./math-bool-operators.component.less']
})
export class MathBoolOperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.testCount();
    // this.testMin();
    // this.testReduce();
    // this.testEvery();
    // this.testFind();
    // this.testFindIndex();
    // this.testEmpty();
    this.testDefaultIfEmpty();
  }

  testCount(){
    let source1 = from([1,2,3]);
    let source2 = from(['a','b','c','d']);
    concat(source1, source2).pipe(count()).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // 7
    // complete
  }

  testMin(){
    from(['a','b','c','d']).pipe(min()).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // a
    // complete
    of(1,2,3).pipe(max()).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // 3
    // complete

    const person = of({ name: 'A', age: 10 }, { name: 'B', age: 11 }, { name: 'C', age: 12 })
    person.pipe(min((x, y) => x.age - y.age)).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // Object {name: "A", age: 10}
    // complete
    
  }

  testReduce(){
    const source = range(1, 100);
    source.pipe(reduce(
      (acc, value) => { return acc + value }, 1000)
    ).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )

    // Result:
    // 5050
    // complete
  }

  testEvery() {
    const source = of(1, 2, 3, 4, 5);
    source.pipe(every(
      x => { return x % 2 === 0 })
    ).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // false
    // complete
  }

  testFind() {
    const source = of(1, 2, 3, 4, 5);
    source.pipe(find(
      x => { return x % 2 === 0 })
    ).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // 2
    // complete
  }

  testFindIndex() {
    const source = of(1, 2, 3, 4, 5);
    source.pipe(findIndex(
      x => { return x % 2 === 0 })
    ).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // 1
    // complete
  }

  testEmpty(){
    const source = empty();
    source.pipe(isEmpty()).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // 1
    // complete

    const source2 = of(1,2);
    source2.pipe(isEmpty()).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // 1
    // complete
  }

  testDefaultIfEmpty(){
    const source = empty();
    source.pipe(defaultIfEmpty('Default Value')).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // Default Value
    // complete

    const source2 = of();
    source2.pipe(defaultIfEmpty()).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    )
    // Result:
    // null
    // complete
  }

}
