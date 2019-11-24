# Join Creation Operators 合并类操作符
之前已经了解过Rxjs中的创建类操作符，包括of,range,interval,timer等等，每个创建类操作符都能创建一个Observable对象，我们可以通过分别对每个Observable对象的订阅，得到我们需要的数据流。       
同时，Rxjs提供了提供了一些非常实用的的合并类操作符，通过这些操作符，可以对将个Observale对象的数据进行合并，组成一个新的Observable对象，达到对多个数据源同时订阅的目的。

## concat
在js中，可以通过concat连接两个数组；同样，在rxjs中，我们可以通过concat运算符将两个或多个Observable对象的数据流首尾相连。

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
弹珠图：![concat Operators](../../assets/imgs/concat.jpg)


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

## merge
与concat类似，merger操作符也可将两个或多个数据流合并到一个数据流中，但不再是以首尾相连的形式，而是在第一时间订阅所有传入的Observable的值，任意一个Observable对象中的值发生变化，则立即传给下游的Observable对象。
1. 先后创建两个数据流，并将其merge到同一个数据流中：

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
    弹珠图：![merge Operators](../../assets/imgs/merge.jpg)
2. merge只对异步数据流有意义，而对于同步数据流，通过merge合并不能体现出先后顺序，其作用相当于concat。如通过from创建两个同步数据流进行merge合并：

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

    因为source1和source2都是同步的数据流，merge在依次订阅所有Observable对象时，source1已经将数据全部推出，而source2尚未并订阅，所以我们发现最终的数据同concat效果一样。

## zip
zip作为一个名词，表示“拉链”的意思。结合拉链的实际特点，zip操作符想要表达的其实就是一对一的合并。但并不意味着zip只能处理两个数据流，也可以处理三个及三个以上的数据流。
zip与concat、merge有一个明显的不同，它会将上游Observable的数据构建成数组的形式，传递到下游；数组中数据元素的所以分别对应传入的Observable的顺序。
1. 创建同步数据流，通过zip进行合并：

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
    当source1数据流完结时，source2的数据流并没有结束，但zip在输出三组值后也调用了complete方法。因为zip一对一输出的特性，zip组成的数据流的数据个数由输入的数据流中数据个数最少的流决定。当一个数据流输出n个值完结，另一个数据流找到对应的匹配的第n个数据后，zip就会通知下游Observable完结，因此zip丢掉了source2中第四个数据‘d’。
    弹珠图：![merge Operators](../../assets/imgs/zip1.jpg)

2. 先后创建两个异步数据流，并用zip进行合并：

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
    弹珠图：![merge Operators](../../assets/imgs/zip2.jpg)


## combineLatest
## race
## forkjoin