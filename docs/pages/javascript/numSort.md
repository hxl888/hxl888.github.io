# js排序算法

### 冒泡排序

```
function bubbleSort(arr) {
    var len = arr.length, a, b;
    for (a = 0; a < len; a++) {
        for (b = 0; b < len - a - 1; b++) {
            if (arr[b] > arr[b + 1]) {
                [arr[b], arr[b + 1]] = [arr[b + 1], arr[b]];
            }
        }
    }
    return arr;
}
var a = [13,1,0,93,64,88,2,7,94,5,4];
bubbleSort(a);
```


### 选择排序

```
var selectionSort = function (arr) {
  var len = arr.length, a, b, minIndex;
  for (a = 0; a < len - 1; a++) {
   minIndex = a;
      for (b = a + 1; b < len; b++) {
          if (arr[minIndex] > arr[b]) minIndex = b;
      }
      if (minIndex !== a) [arr[minIndex], arr[a]] = [arr[a], arr[minIndex]];
    }
  return arr;
}
var a = [13,1,0,93,64,88,2,7,94,5,4];
selectionSort(a);
```

### 插入排序

```
function insertionSort(arr) {
  var i,j,len = arr.length;
  for(i = 1;i < len; i++) {
    for(j = 0; j < i; j++) {
      if(arr[j] > arr[i]) {
        arr.splice(j, 0, arr[i]);
        arr.splice(i+1,1);
      }
    }
  }
  return arr;
}
var a = [13,1,0,93,64,88,2,7,94,5,4];
insertionSort(a);
```


### 快速排序

```
unction quickSort(arr) {
  var len = arr.length;
  if(len <= 1) return arr;
  var left = [], right = [], mid = arr[0];
  for (var i = 1; i < len; i++)
    if (arr[i] < mid)
      left.push(arr[i]);
    else
      right.push(arr[i]);
  return [...quickSort(left), mid, ...quickSort(right)];
}
var a = [13,1,0,93,64,88,2,7,94,5,4];
quickSort(a);
```

### 获取最小值到最大值之前的整数随机数

```
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}
var num = GetRandomNum(1, 10);
console.log(num);
```
