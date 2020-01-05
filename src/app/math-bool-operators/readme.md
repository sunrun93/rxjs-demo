# Math, and Conditional boolean operators 数学、条件及布尔类操作符
Rxjs也为我们提供了一系列辅助类操作符，可能其功能不像其他的操作符那样惊艳，但某些场景下，这些辅助类的操作符可以极大的帮助我们简化代码，可以说是非常实用。

## Math operators - 数学类操作符
很明显，数学类操作符是具有数学运算功能的操作符，包括四个分别是：count,max,min和reduce。与之前提过的操作符不同的是，数学类操作符在上游数据发射完成后，才向下游传递唯一的数据。
1. count - 统计上游Observable对象输出的数据的个数：

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

2. min & max: 统计上游Observable对象输出的数据的最大值和最小值：
* 对于简单数据类型，最大值与最小值的定义清晰，则能够直接返回对应的值。

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
* 对于复杂数据类型，必须指定比较规则，min,max操作符都支持比较函数作为参数。

        const person = of({ name: 'A', age: 10 }, { name: 'B', age: 11 }, { name: 'C', age: 12 });
        person.pipe(min((x, y) => x.age - y.age)).subscribe(
            v => console.log(v),
            err => console.log(err),
            () => console.log('complete')
        )
        // Result:
        // Object {name: "A", age: 10}
        // complete

3. reduce - 同js中的reduce方法一样，rxjs中的reduce也可以看作是一种聚合运算，即通过reduce函数，依次对Observable对象输出的值进行某种运算，返回累积的结果被，并将该结果作为参数参与到下一个值的运算过程中。reduce操作符接受两个参数，规约函数和初始值（可选）。    
* 如计算1-100整数的和：

        const source = range(1, 100);
        source.pipe(reduce(
        (acc, value) => { return acc + value })
        ).subscribe(
        v => console.log(v),
        err => console.log(err),
        () => console.log('complete')
        )

        // Result:
        // 5050
        // complete

* 在上述运算的基础上，添加第二个参数为1000，相当于指定了运算的初始值为1000，结果如下：

        const source = range(1, 100);
            source.pipe(reduce(
            (acc, value) => { return acc + value }, 1000)
            ).subscribe(
            v => console.log(v),
            err => console.log(err),
            () => console.log('complete')
        )

        // Result:
        // 6050
        // complete


## Conditional and Boolean Operators 条件布尔类操作符

条件布尔类操作符也是Rxjs提供的一种辅助类操作符，该类操作符主要是根据上游observable对象，根据一个判定函数对其进行判定，并生成一个新的Observable对象。主要的条件布尔类操作符包含：every，find，findIndex，isEmpty和defaultIfEmpty。

1. every
与js中的every类似，rxjs中的every是对上游Observable对象输出的每一个值进行检查，如果输出的每个元素都符合判定条件，则返回true，否则返回false。需要注意的是，当上游的某个数据检验为false时，无需等到上游Observable对象结束，every产生的新Observable对象会立刻结束并输出false。   

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
2. find和findIndex
find和findIndex的功能都是找到上游Observable对象中满足某些条件的第一个数据，返回一个新的Observable对象。同样，find和findIndex方法都在找到第一个满足条件的数据后会立即结束。    

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
findIndex则会返回满足判定条件的数据的序号： 

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
3. isEmpty
isEmpty用于检查上游的Observable是否为空，只有当上游没有输出任何数据直接完结时，isEmpty才会返回一个新的Obsevable对象输出true。

        source.pipe(isEmpty()).subscribe(
            v => console.log(v),
            err => console.log(err),
            () => console.log('complete')
        )
        // Result:
        // true
        // complete

        const source2 = of();
        source2.pipe(isEmpty()).subscribe(
            v => console.log(v),
            err => console.log(err),
            () => console.log('complete')
        )
        // Result:
        // true
        // complete

4. defaultIfEmpty
defaultIfEmpty相当于在empty的基础添加了默认值，defaultIfEmpty接收一个参数作为默认值，当上游数据为空时，defaultIfEmpty会吐出默认值给下游。

        const source = empty();
        source.pipe(defaultIfEmpty('Default Value')).subscribe(
        v => console.log(v),
        err => console.log(err),
        () => console.log('complete')
        )
        // Result:
        // Default Value
        // complete

如果defaultIfEmpty中未定义默认值，则会吐出null：

        const source2 = of();
        source2.pipe(defaultIfEmpty()).subscribe(
        v => console.log(v),
        err => console.log(err),
        () => console.log('complete')
        )
        // Result:
        // null
        // complete

