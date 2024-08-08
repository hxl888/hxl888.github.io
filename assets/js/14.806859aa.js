(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{158:function(a,r,n){"use strict";n.r(r);var t=n(0),e=Object(t.a)({},(function(){this._self._c;return this._m(0)}),[function(){var a=this,r=a._self._c;return r("div",{staticClass:"content"},[r("h1",{attrs:{id:"js排序算法"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#js排序算法"}},[a._v("#")]),a._v(" js排序算法")]),r("h3",{attrs:{id:"冒泡排序"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#冒泡排序"}},[a._v("#")]),a._v(" 冒泡排序")]),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("function bubbleSort(arr) {\n    var len = arr.length, a, b;\n    for (a = 0; a < len; a++) {\n        for (b = 0; b < len - a - 1; b++) {\n            if (arr[b] > arr[b + 1]) {\n                [arr[b], arr[b + 1]] = [arr[b + 1], arr[b]];\n            }\n        }\n    }\n    return arr;\n}\nvar a = [13,1,0,93,64,88,2,7,94,5,4];\nbubbleSort(a);\n")])])]),r("h3",{attrs:{id:"选择排序"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#选择排序"}},[a._v("#")]),a._v(" 选择排序")]),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("var selectionSort = function (arr) {\n  var len = arr.length, a, b, minIndex;\n  for (a = 0; a < len - 1; a++) {\n   minIndex = a;\n      for (b = a + 1; b < len; b++) {\n          if (arr[minIndex] > arr[b]) minIndex = b;\n      }\n      if (minIndex !== a) [arr[minIndex], arr[a]] = [arr[a], arr[minIndex]];\n    }\n  return arr;\n}\nvar a = [13,1,0,93,64,88,2,7,94,5,4];\nselectionSort(a);\n")])])]),r("h3",{attrs:{id:"插入排序"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#插入排序"}},[a._v("#")]),a._v(" 插入排序")]),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("function insertionSort(arr) {\n  var i,j,len = arr.length;\n  for(i = 1;i < len; i++) {\n    for(j = 0; j < i; j++) {\n      if(arr[j] > arr[i]) {\n        arr.splice(j, 0, arr[i]);\n        arr.splice(i+1,1);\n      }\n    }\n  }\n  return arr;\n}\nvar a = [13,1,0,93,64,88,2,7,94,5,4];\ninsertionSort(a);\n")])])]),r("h3",{attrs:{id:"快速排序"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#快速排序"}},[a._v("#")]),a._v(" 快速排序")]),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("unction quickSort(arr) {\n  var len = arr.length;\n  if(len <= 1) return arr;\n  var left = [], right = [], mid = arr[0];\n  for (var i = 1; i < len; i++)\n    if (arr[i] < mid)\n      left.push(arr[i]);\n    else\n      right.push(arr[i]);\n  return [...quickSort(left), mid, ...quickSort(right)];\n}\nvar a = [13,1,0,93,64,88,2,7,94,5,4];\nquickSort(a);\n")])])]),r("h3",{attrs:{id:"获取最小值到最大值之前的整数随机数"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#获取最小值到最大值之前的整数随机数"}},[a._v("#")]),a._v(" 获取最小值到最大值之前的整数随机数")]),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[a._v("function GetRandomNum(Min, Max) {\n    var Range = Max - Min;\n    var Rand = Math.random();\n    return(Min + Math.round(Rand * Range));\n}\nvar num = GetRandomNum(1, 10);\nconsole.log(num);\n")])])])])}],!1,null,null,null);r.default=e.exports}}]);