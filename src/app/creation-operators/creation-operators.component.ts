import { Component, OnInit } from '@angular/core';
import { of, range, from, fromEvent, interval, timer, empty, throwError, generate } from 'rxjs';

@Component({
  selector: 'app-creation-operators',
  templateUrl: './creation-operators.component.html',
  styleUrls: ['./creation-operators.component.less']
})
export class CreationOperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.testOf();
    // this.testRange();
    // this.testInterval();
    // this.testTimer();
    // this.testGenerate();
    // this.testFrom();
  }

  ngAfterViewInit() {
    // this.testFromEvent();
  }

  testOf() {
    of('a', 'b', 'c').subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );
    //result：
    //a
    //b
    //c
    //complate

    of('abc').subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );
    //result：
    //abc
    //complate

    of(['a', 'b', 'c']).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );
    //result：
    //['a','b','c']
    //complate
  }

  testRange() {
    // Range: 根据参数指定的范围生成一个正整数序列，其中第一个参数指定序列的起始值（Default：0），第二个参数指定序列元素的数量(Default: Undefined)，每次递增1
    range(null, 3).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );

    // Result:
    // 0
    // 1
    // 2
    // complete

    range(1, 3).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );
    // Result:
    // 1
    // 2
    // 3
    // complete

    range(1).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );
    // Result:
    // complete
  }

  testInterval() {
    // Interval: 创建一个Observable对象，根据参数指定的时间间周期，从0开始生成一个整数序列，第一个元素在经过一个时间周期后输出，不会自动结束，通常结合pipeable类操作符一起使用。
    interval(1000).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );

    // Result:
    // 0 （延时1000ms后输出,每次输出间隔1000ms）
    // 1
    // 2
    // ...(不会调用Complete)
  }

  testTimer() {
    // Timer: 创建一个Observable对象，该对象在Duetime之后开始输出第一个元素，并根据指定的时间间隔依次输出。接受两个参数，第一个参数指定dueTime，第二个参数指定时间间隔。当两个参数相同时，相当于interval的作用。
    timer(1000).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );

    // Result:
    // 0 (延时1000ms后输出)
    // complete
  }

  testGenerate() {
    // generate: 循环方式创建Observable对象，可定制化程度高，类似于js中的for。
    // 如创建一个Observable对象，依次输出小于10的偶数，可以传入三个参数：初始值，判断条件,值的递增
    generate(0, x => x < 10, x => x + 2).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );

    // Result:
    // 0
    // 2
    // 4
    // 6
    // 8
    // complete

    // 如要创建一个Observable对象，在循环生成序列的基础上对序列中每个值进行处理，则可传入一个纯函数作为第四个参数
    // 如创建一个Observable对象，依次输出小于10的偶数的平方
    generate(0, x => x < 10, x => x + 2, x => x * x).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );

    // Result:
    // 0
    // 4
    // 16
    // 36
    // 64
    // complete
  }

  testFrom() {
    // From: 基于传入的参数创建一个Observable对象，可用传入数组，类似数组的对象，Promise,可迭代的对象，Obsevable对象等
    // 传入数组
    from([1, 2, 3]).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );

    // Result:
    // 1
    // 2
    // 3
    // complete

    // 传入一个可迭代的对象Set
    const iterableObj = new Set([10, 20, 30]);
    from(iterableObj).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );
    // Result:
    // 10
    // 20
    // 30
    // complete


    // 传入一个Observable对象
    from(of(100, 200, 300)).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );

    // Result:
    // 100
    // 200
    // 300
    // complete

    // 传入一个成功的Promise对象，会自动调用Commplate方法
    const promiseSuccessful = new Promise((resolve, reject) => {
      setTimeout(() => resolve('Successful'));
    });
    from(promiseSuccessful).subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );

    // Result:
    // successful
    // complete

    // 传入一个失败的Promise对象，会自动调用err方法打印错误
    const promiseError = new Promise((resolve, reject) => {
      setTimeout(() => reject('Error'));
    });
    from(promiseError).subscribe(
      v => console.log(v),
      err => console.log(`err called - ${err}`),
      () => console.log('complete')
    );

    // Result:
    // err called - Error
  }

  testFromEvent() {
    // fromEvent: 根据DOM事件创建Observable对象（也可根据Node.js的event创建Observable对象）。第一个参数为DOM element，第二个参数为监听的事件名称
    // 如监听button的点击事件
    const btnEle = document.getElementById('button1');
    fromEvent(btnEle, 'click').subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );

    // Result:
    // MouseEvent {isTrusted: true, screenX: 1770, screenY: 171, clientX: 90, clientY: 68, …}
  }
  
  estEmpty() {
    // Empty: 创建一个空的Observable对象，并立即结束，调用Complete
    empty().subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );

    // Results:
    // complete
  }

  testThrowError() {
    // 创建一个Observable对象，并立即调用错误处理方法
    throwError('Error Happened').subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('complete')
    );

    // Result:
    // Error Happened
  }


}
