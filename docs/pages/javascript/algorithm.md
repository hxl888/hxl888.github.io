# js 算法

// 股票买卖1-买卖一次
```
const maxProFit = (prices) => {
  const len = prices.length;
  const dp = new Array(len).fill([0, 0]);
  dp[0] = [-prices[0], 0];
  for (let i = 1; i < len; i++) {
    dp[i] = [
      Math.max(dp[i - 1][0], -prices[i]),
      Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]),
    ];
  }
  return dp[len - 1][1];
};
const max = maxProFit([1, 2, 8, 2, 6]);
console.log("max: ", max);

var maxProFit2 = (prices) => {
  let lowerPrice = prices[0];
  let profit = 0;
  for (let i = 0; i < prices.length; i++) {
    lowerPrice = Math.min(lowerPrice, prices[i]);
    profit = Math.max(profit, prices[i] - lowerPrice);
  }
  return profit;
};
```

// 股票2-可以多次买卖
```
var maxProFit3 = (prices) => {
  let len = prices.length;
  if (!prices.length || prices.length < 2) return 0;
  // let dp = new Array(len).fill([0,0])
  let dp = Array.from(Array(len), () => Array(2).fill(0));
  dp[0][0] = -prices[0];
  dp[0][1] = 0;
  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]);
  }
  return dp[len - 1][1];
};
const max3 = maxProFit3([1, 2, 8, 2, 6, 3, 9]);
console.log("max3: ", max3);

var maxProFit3_2 = (prices) => {
  let len = prices.length,
    have = -prices[0],
    notHave = 0;
  for (let i = 1; i < len; i++) {
    have = Math.max(have, notHave - prices[i]);
    notHave = Math.max(notHave, have + prices[i]);
  }
  return notHave;
};
const max3_2 = maxProFit3_2([1, 2, 8, 2, 6]);
console.log("max3_2: ", max3_2);
```

// 股票3 ---最多买卖两次
```
var maxProFit4 = (prices) => {
  let len = prices.length,
    dp = new Array(len).fill().map((x) => Array(5).fill(0));
  dp[0][0] = 0;
  dp[0][1] = -prices[0];
  dp[0][3] = -prices[0];
  for (let i = 1; i < len; i++) {
    dp[i][0] = dp[i - 1][0];
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + prices[i]);
    dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] - prices[i]);
    dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + prices[i]);
  }
  return dp[len - 1][4];
};
const max4 = maxProFit4([1, 2, 8, 2, 6, 1, 5, 8, 3, 11, 5, 8, 3, 11]);
console.log("max4: ", max4);

const maxProfit4_2 = (prices) => {
  const len = prices.length;
  const dp = new Array(len).fill(0);
  dp[1] = -prices[0];
  dp[3] = -prices[0];
  for (let i = 1; i < len; i++) {
    dp[1] = Math.max(dp[1], dp[0] - prices[i]);
    dp[2] = Math.max(dp[2], dp[1] + prices[i]);
    dp[3] = Math.max(dp[3], dp[2] - prices[i]);
    dp[4] = Math.max(dp[4], dp[3] + prices[i]);
  }
  return dp[4];
};

const max4_2 = maxProfit4_2([1, 2, 8, 2, 6, 1, 5, 8, 3, 11, 5, 8, 3, 11]);
console.log("max4_2: ", max4_2);
```

// 股票--含有冷冻期
```
const maxProfit5 = (prices) => {
  const len = prices.length;
  if (len < 2) {
    return 0;
  } else if (len < 3) {
    return Math.max(0, prices[1] - prices[0]);
  }
  const dp = Array.from(Array(len), () => Array(4).fill(0));
  dp[0][0] = 0 - prices[0];
  // 0:持有股票状态（今天买入股票，或者是之前就买入了股票然后没有操作，一直持有）
  // 1:不持有股票状态(-保持卖出的状态)-两天前就卖出了股票，度过一天冷冻期。或者是前一天就是卖出股票状态，一直没操作）
  // 2:今天卖出股票
  // 3:冷冻期-今天为冷冻期状态，但冷冻期状态不可持续，只有一天！
  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(
      dp[i - 1][0],
      Math.max(dp[i - 1][1], dp[i - 1][3]) - prices[i]
    );
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][3]);
    dp[i][2] = dp[i - 1][0] + prices[i];
    dp[i][3] = dp[i - 1][2];
  }
  return Math.max(dp[len - 1][1], dp[len - 1][2], dp[len - 1][3]);
};

const max5 = maxProfit5([1, 2, 8, 2, 6, 1, 5, 8, 3, 11, 5, 8, 3, 11], 3);
console.log("max5: ", max5);
```

// 股票--含有冷冻期_2
```
const maxProfit5_2 = (prices) => {
  // 0:持有股票状态（今天买入股票，或者是之前就买入了股票然后没有操作，一直持有）
  // 1:不持有股票状态(-保持卖出的状态)-两天前就卖出了股票，度过一天冷冻期。或者是前一天就是卖出股票状态，一直没操作）
  // 2:今天卖出股票
  // 3:冷冻期-今天为冷冻期状态，但冷冻期状态不可持续，只有一天！
  const len = prices.length;
  const dp = new Array(len).fill(0);
  for (let i = 1; i < len; i++) {
    const temp1 = dp[0];
    const temp2 = dp[2];
    dp[0] = Math.max(dp[0], Math.max(dp[1], dp[3]) - prices[i]);
    dp[1] = Math.max(dp[1], dp[3]);
    dp[2] = temp1 + prices[i];
    dp[3] = temp2;
  }
  return Math.max(...dp);
};

const max5_2 = maxProfit5_2([1, 2, 8, 2, 6, 1, 5, 8, 3, 11, 5, 8, 3, 11], 3);
console.log("max5_2: ", max5_2);
```
/**
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其总和大于等于 target 的长度最小的 连续
子数组
子数组
子数组 是数组中连续的 非空 元素序列。

[numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 
 */
//  长度最小的子数组
```
var minSubArrayLen = function (target, nums) {
  let left = (right = 0),
    len = nums.length,
    sum = 0,
    res = len + 1;
  while (right < len) {
    sum += nums[right];
    while (sum >= target) {
      res = Math.min(res, right - left + 1);
      sum -= nums[left++];
    }
    right++;
  }
  return res > len ? 0 : res;
};
```

/**
 * 59. 螺旋矩阵 II (https://leetcode.cn/problems/spiral-matrix-ii/description/)
 * 给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
 *
 */

```
var generateMatrix = function (n) {
  let starX = (startY = 0),
    offset = 1,
    loop = Math.floor(n / 2),
    mid = Math.floor(n / 2),
    count = 1;
  let res = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  while (loop--) {
    let row = starX,
      col = startY;
    // 上行从左到右
    for (; col < n - offset; col++) {
      res[row][col] = count++;
    }
    // 右列从上到下
    for (; row < n - offset; row++) {
      res[row][col] = count++;
    }
    // 下行从右到左
    for (; col > startY; col--) {
      res[row][col] = count++;
    }
    // 左列从下到上
    for (; row > starX; row--) {
      res[row][col] = count++;
    }
    starX++;
    startY++;
    offset++;
  }
  if (n % 2 === 1) {
    res[mid][mid] = count;
  }
  return res;
};
```

// 链表
```
class ListNode {
  constructor(value, next) {
    this.val = value;
    this.next = next;
  }
}
```

// 删除列表
```
var removeElements = function (head, val) {
  const dummyHead = new ListNode(0, head);
  let cur = dummyHead;
  while (cur.next) {
    if (cur.next.val === val) {
      cur.next = cur.next.next;
      continue;
    }
    cur = cur.next;
  }
  return dummyHead.next;
};
```
// 设计链表
```
var ListNode = function (val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
};

var MyLinkedList = function () {
  this.size = 0;
  this.head = new ListNode(0);
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.getNode = function (index) {
  if (index < 0 || index >= this.size) return -1;
  let cur = this.head;
  while (index-- >= 0) {
    cur = cur.next;
  }
  return cur.val;
};

MyLinkedList.prototype.get = function (index) {
  return this.getNode(index);
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  this.addAtIndex(0, val);
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  this.addAtIndex(this.size, val);
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index > this.size) return;
  index = Math.max(0, index);
  this.size++;
  let cur = this.head;
  while (index--) {
    cur = cur.next;
  }
  let toAdd = new ListNode(val);
  toAdd.next = cur.next;
  cur.next = toAdd;
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || index >= this.size) return;
  this.size--;
  let cur = this.head;
  while (index--) {
    cur = cur.next;
  }
  cur.next = cur.next.next;
};

```
/**
 * 翻转链表
 * @param {*} head
 * @returns
 */
//
// 双指针

```
var reverseList = function (head) {
  if (!head || !head.next) return head;
  let pre = null,
    cur = head,
    temp = null;
  while (cur) {
    temp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = temp;
  }
  return pre;
};
```

// 翻转链表-递归1
```
var reverse = function (pre, head) {
  if (!head) return pre;
  let temp = head.next;
  head.next = pre;
  pre = head;
  reverse(pre, temp);
};
var reverseList = function (head) {
  reverse(null, head);
};
```

// 24. 两两交换链表中的节点
```
var swapPairs = function (head) {
  let ret = new ListNode(0, head),
    temp = ret;
  while (temp.next && temp.next.next) {
    let cur = temp.next.next,
      pre = temp.next;
    pre.next = cur.next;
    cur.next = pre;
    temp.next = cur;
    temp = pre;
  }
  return ret.next;
};
```

// 19. 删除链表的倒数第 N 个结点
```
var removeNthFromEnd = function (head, n) {
  let ret = new ListNode(0, head),
    slow = (fast = ret);
  while (n--) {
    fast = fast.next;
  }
  while (fast.next !== null) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return ret.next;
};
```


// 142. 环形链表 II (给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。)
```
var detectCycle = function (head) {
  if (!head || !head.next) return null;
  let slow = (fast = head);
  while (fast && fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (fast === slow) {
      slow = head;
      while (fast !== slow) {
        fast = fast.next;
        slow = slow.next;
      }
      return slow;
    }
  }
  return null;
};
```


// 02.07. 链表相交 1
```
var getIntersectionNode1 = function (headA, headB) {
  if (!headA || !headB) return null;
  let curA = headA,
    curB = headB;
  while (curA !== curB) {
    curA = curA ? curA.next : headB;
    curB = curB ? curB.next : headA;
  }
  return curA;
};
```


// 02.07. 链表相交 2
```
var getIntersectionNode2 = function (headA, headB) {
  if (!headA || !headB) return null;
  const visited = new Set();
  let temp = headA;
  while (temp) {
    visited.add(temp);
    temp = temp.next;
  }
  temp = headB;
  while (temp) {
    if (visited.has(temp)) return temp;
    temp = temp.next;
  }
  return null;
};
```


// 242. 有效的字母异位词 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
// 注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
```
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  let ret = new Array(26).fill(0),
    base = "a".charCodeAt();
  for (const i of s) {
    ret[i.charCodeAt() - base]++;
  }
  for (const i of t) {
    if (!ret[i.charCodeAt() - base]) return false;
    ret[i.charCodeAt() - base]--;
  }
  return true;
};
var isAnagram2 = function (s, t) {
  if (s.length !== t.length) return false;
  let ret = new Map();
  for (const i of s) {
    ret.set(i, (ret.get(i) || 0) + 1);
  }
  for (const i of t) {
    if (!ret.get(i)) return false;
    ret.set(i, ret.get(i) - 1);
  }
  return true;
};
```

// 349. 两个数组的交集 给定两个数组 nums1 和 nums2 ，返回 它们的 交集。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。
// https://leetcode.cn/problems/intersection-of-two-arrays/
```
var intersection = function (nums1, nums2) {
  if (nums1.length < nums2.length) {
    [nums2, nums1] = [nums1, nums2];
  }
  let ret1 = new Set(nums1),
    ret2 = new Set();
  for (let i = 0; i < nums2.length; i++) {
    ret1.has(nums2[i]) && ret2.add(nums2[i]);
  }
  return Array.from(ret2);
};
```

// 202. 快乐数
//「快乐数」 定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
// 然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
// 如果这个过程 结果为 1，那么这个数就是快乐数。
// 如果 n 是 快乐数 就返回 true ；不是，则返回 false 。
```
var isHappy = function (n) {
  let m = new Set();
  let getSum = (num) => {
    let sum = 0;
    while (num) {
      sum += (num % 10) ** 2;
      num = Math.floor(num / 10);
    }
  };
  // 1
  // while(true) {
  //   if (m.has(n)) return false
  //   if (n === 1) return true
  //   n = getSum(n)
  //   m.add(n)
  // }
  // 2
  while (n !== 1 && !m.has(n)) {
    m.add(n);
    n = getSum(n);
  }
  return n === 1;
};
isHappy(19);
```

// 1. 两数之和
```
var twoSum = function (nums, target) {
  let has = {};
  for (let i = 0; i < nums.length; i++) {
    if (has[target - nums[i]] !== undefined) {
      return [i, has[target - nums[i]]];
    }
    has[nums[i]] = i;
  }
  return [];
};
```

// 给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足：
```
var fourSumCount = function (nums1, nums2, nums3, nums4) {
  let map = new Map();
  nums1.forEach((n1) =>
    nums2.forEach((n2) => map.set(n1 + n2, (map.get(n1 + n2) || 0) + 1))
  );
  let count = 0;
  for (let n3 of nums3) {
    for (let n4 of nums4) {
      if (map.has(-(n3 + n4))) {
        count += map.get(-(n3 + n4));
      }
    }
  }
  return count;
};
```

// 383. 赎金信 给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成。
```
var canConstruct = function (ransomNote, magazine) {
  let strArr = Array(26).fill(0),
    base = "a".charCodeAt();
  for (let i of magazine) {
    strArr[i.charCodeAt() - base]++;
  }
  for (let u of ransomNote) {
    let index = u.charCodeAt() - base;
    if (!strArr[index]) return false;
    strArr[index]--;
  }
  return true;
};
```


// 15. 三数之和 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
// 你返回所有和为 0 且不重复的三元组。
```
var threeSum = function (nums) {
  let res = [],
    len = nums.length;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < len; i++) {
    let l = i + 1,
      r = len - 1,
      iNum = nums[i];
    if (iNum > 0) return res;
    if (iNum === nums[i - 1]) continue;
    while (l < r) {
      let lNum = nums[l],
        rNum = nums[r],
        threeSum = iNum + lNum + rNum;
      if (threeSum < 0) l++;
      else if (threeSum > 0) r--;
      else {
        res.push([iNum, lNum, rNum]);
        while (l < r && nums[l] === nums[l + 1]) {
          l++;
        }
        while (l < r && nums[r] === nums[r - 1]) {
          r--;
        }
        l++;
        r--;
      }
    }
  }
  return res;
};
```


// 18. 四数之和给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）
```
var fourSum = function (nums, target) {
  let res = [],
    len = nums.length;
  if (len < 4) return [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < len - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    for (let j = i + 1; j < len - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      let l = j + 1,
        r = len - 1;
      while (l < r) {
        const sum = nums[i] + nums[j] + nums[l] + nums[r];
        if (sum > target) r--;
        else if (sum < target) l++;
        else {
          res.push([nums[i], nums[j], nums[l], nums[r]]);
          // while (l < r && nums[l] === nums[l + 1]) {
          //   l++
          // }
          // while (l < r && nums[r] === nums[r - 1]) {
          //   r--;
          // }
          // l++
          // r--
          while (l < r && nums[l] === nums[++l]);
          while (l < r && nums[r] === nums[--r]);
        }
      }
    }
  }
  return res;
};
```


// 344. 反转字符串
// 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
```
var reverseString = function (s) {
  // let l = -1,r = s.length;
  // while(++l < --r) [s[l], s[r]] = [s[r], s[l]]
  let l = 0,
    r = s.length - 1,
    temp = null;
  while (l < r) {
    temp = s[l];
    s[l] = s[r];
    s[r] = temp;
    l++;
    r--;
  }
};
```


// 541. 反转字符串 II
// 给定一个字符串 s 和一个整数 k，从字符串开头算起，每计数至 2k 个字符，就反转这 2k 字符中的前 k 个字符。如果剩余字符少于 k 个，则将剩余字符全部反转。如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
```
var reverseStr = function (s, k) {
  let len = s.length,
    resArr = s.split("");
  // for (let i = 0; i < len; i += 2 * k) {
  //   let l = i - 1,
  //     r = i + k > len ? len : i + k;
  //   while (++l < --r) [[resArr[l]], resArr[r]] = [[resArr[r]], resArr[l]];
  // }
  for (let i = 0; i < len; i += 2 * k) {
    let l = i - 1,
      r = i + k > len ? len : i + k,
      temp = null;
    while (++l < --r) {
      temp = resArr[l];
      resArr[l] = resArr[r];
      resArr[r] = temp;
    }
  }
  return resArr.join("");
};
```


// 替换数字（第八期模拟笔试）
// 给定一个字符串 s，它包含小写字母和数字字符，请编写一个函数，将字符串中的字母字符保持不变，而将每个数字字符替换为number。 例如，对于输入字符串 "a1b2c3"，函数应该将其转换为 "anumberbnumbercnumber"。
```
let numberToStringFn = function (str) {
  let num0 = "0".charCodeAt(),
    num9 = "9".charCodeAt(),
    a = "a".charCodeAt(),
    z = "z".charCodeAt(),
    len = str.length,
    n = 0;
  let isNumber = (code) => {
    code = code.charCodeAt();
    return code >= num0 && code <= num9;
  };
  let isAz = (code) => {
    code = code.charCodeAt();
    return code >= a && code <= z;
  };
  // 计算新数组长度
  for (let i = 0; i < len; i++) {
    if (isNumber(str[i])) {
      n += 6;
    } else if (isAz(str[i])) {
      n += 1;
    } else {
      n += 1;
    }
  }
  let newArr = Array(n).fill(""),
    index = n - 1;
  for (let i = len - 1; i >= 0; i--) {
    if (isAz(str[i])) {
      // 字符串
      newArr[index] = str[i];
      index--;
    } else if (isNumber(str[i])) {
      // number
      newArr[index] = "r";
      newArr[index - 1] = "e";
      newArr[index - 2] = "b";
      newArr[index - 3] = "m";
      newArr[index - 4] = "u";
      newArr[index - 5] = "n";
      index -= 6;
    }
  }
  console.log(newArr.join(""));
  console.log(newArr.join("").length);
};

numberToStringFn("12jsd3k2n5k6k9");
```


// 151. 反转字符串中的单词
/**
 * 给你一个字符串 s ，请你反转字符串中 单词 的顺序。单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。
注意：输入字符串 s中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。
 */
```
var reverseWords = function (s) {
  // function removeExtraSpaces(strArr) {
  //   let slowIndex = 0, fastIndex = 0;
  //   while(fastIndex < strArr.length) {
  //     if (strArr[fastIndex] === ' ' && (fastIndex === 0 || strArr[fastIndex - 1] === ' ')) {
  //       fastIndex++
  //     } else {
  //       strArr[slowIndex++] = strArr[fastIndex++]
  //     }
  //   }
  //   strArr.length = strArr[slowIndex - 1] === ' ' ? slowIndex - 1 : slowIndex
  // }
  // function reverse(strArr, start, end) {
  //   let l = start,r = end;
  //   while(l < r) {
  //     [strArr[r], strArr[l]] = [strArr[l], strArr[r]]
  //     l++
  //     r--
  //   }
  // }

  // const strArr = Array.from(s)
  // removeExtraSpaces(strArr)
  // // 翻转
  // reverse(strArr, 0, strArr.length - 1)
  // let start = 0
  // for(let i = 0; i <= strArr.length;i++) {
  //   if (strArr[i] === ' ' || i === strArr.length) {
  //     reverse(strArr, start, i - 1)
  //     start = i + 1
  //   }
  // }
  // return strArr.join('')

  // 2--------
  const strArr = s.trim().split(/\s+/);
  let i = 0,
    j = strArr.length - 1;
  for (; i <= j; i++, j--) {
    // 1----------
    // [strArr[j], strArr[i]] = [strArr[i], strArr[j]];

    // 2----------
    let tmp = sArr[i];
    sArr[i] = sArr[j];
    sArr[j] = tmp;
  }
  return strArr.join(" ");
};
reverseWords("asdf sd adf sd fe");

```


// 右旋字符串
```
function reverseStrFn(arr, start, end) {
  let l = start,
    r = end;
  while (l < r) {
    [arr[r], arr[l]] = [arr[l], arr[r]];
    l++;
    r--;
  }
  return arr;
}

function reVerArr(arr, n) {
  reverseStrFn(arr, 0, arr.length - 1);
  reverseStrFn(arr, 0, n - 1);
  reverseStrFn(arr, n, arr.length - 1);
  console.log("arr: ", arr.join(""));
  return arr.join("");
}
let arr = Array.from("asbejkl");
reVerArr(arr, 3);
```


// 28. 找出字符串中第一个匹配项的下标
/**
 * 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。如果 needle 不是 haystack 的一部分，则返回  -1 。
 * @param {*} haystack
 * @param {*} needle
 */
 ```
var strStr = function (haystack, needle) {
  if (!needle.length) return 0;
  var getNext = (needle) => {
    let j = 0,
      next = [];
    next[0] = 0;
    for (let i = 1; i < needle.length; i++) {
      while (j > 0 && needle[i] !== needle[j]) {
        console.log("j: ", j);
        j = next[j - 1];
      }
      if (needle[i] === needle[j]) {
        j++;
      }
      next[i] = j;
    }
    return next;
  };
  let next = getNext(needle);
  let j = 0;
  for (let i = 0; i < haystack.length; i++) {
    while (j > 0 && haystack[i] !== needle[j]) {
      j = next[j - 1];
    }
    if (haystack[i] === needle[j]) {
      j++;
    }
    if (j === needle.length) {
      return i + 1 - needle.length;
    }
  }
  return -1;
};

const f = strStr("6sadbutsad", "sad");
console.log("f: ", f);
```


// 459.重复的子字符串 给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成
```
var repeatedSubstringPattern = function (s) {
  let len = s.length;
  if (!len) return false;
  let getNext = (s) => {
    let j = 0,
      next = [0];
    for (let i = 1; i < s.length; i++) {
      while (j > 0 && s[i] !== s[j]) {
        j = next[j - 1];
      }
      if (s[i] === s[j]) {
        j++;
      }
      next.push(j);
    }
    return next;
  };
  let next = getNext(s),
    len2 = next.length;
  return next[len2 - 1] !== 0 && len % (len - next[len2 - 1]) === 0;
};
```


// 27. 移除元素 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素。元素的顺序可能发生改变。然后返回 nums 中与 val 不同的元素的数量。
```
var removeElement = function (nums, val) {
  // let k = 0
  // for(let i = 0; i < nums.length; i++) {
  //   if (nums[i] !== val) {
  //     nums[k++] = nums[i]
  //   }
  // }
  // // nums.length = k
  // return k
  let l = 0,
    r = nums.length;
  while (l < r) {
    if (nums[l] === val) {
      nums[l] = nums[--r];
    } else {
      l++;
    }
  }
  nums.length = l;
  console.log("nums: ", nums);
  return l;
};
removeElement([1, 2, 3, 3, 5, 5], 5);
```


// 232. 用栈实现队列 请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：
```
var MyQueueFn = () => {
  var MyQueue = function () {
    this.stackIn = [];
    this.stackOut = [];
  };

  /**
   * @param {number} x
   * @return {void}
   */
  MyQueue.prototype.push = function (x) {
    this.stackIn.push(x);
  };

  /**
   * @return {number}
   */
  MyQueue.prototype.pop = function () {
    const size = this.stackOut.length;
    if (size) {
      return this.stackOut.pop();
    }
    while (this.stackIn.length) {
      this.stackOut.push(this.stackIn.pop());
    }
    return this.stackOut.pop();
  };

  /**
   * @return {number}
   */
  MyQueue.prototype.peek = function () {
    const x = this.pop();
    this.stackOut.push(x);
    return x;
  };

  /**
   * @return {boolean}
   */
  MyQueue.prototype.empty = function () {
    return !this.stackIn.length && !this.stackOut.length;
  };
};
```



// 225. 请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（push、top、pop 和 empty）。
```
var MyStackFn = () => {
  var MyStack = function () {
    this.queue1 = [];
    this.queue2 = [];
  };
  /**
   * @param {number} x
   * @return {void}
   */
  MyStack.prototype.push = function (x) {
    this.queue1.push(x);
  };

  /**
   * @return {number}
   */
  MyStack.prototype.pop = function () {
    if (!this.queue1.length) {
      [this.queue2, this.queue1] = [this.queue1, this.queue2];
    }
    while (this.queue1.length > 1) {
      this.queue2.push(this.queue1.shift());
    }
    return this.queue1.shift();
  };

  /**
   * @return {number}
   */
  MyStack.prototype.top = function () {
    var x = this.pop();
    this.queue1.push(x);
    return x;
  };

  /**
   * @return {boolean}
   */
  MyStack.prototype.empty = function () {
    return !this.queue1.length && !this.queue2.length;
  };
};

// 用一个队列实现-------
class MyStack {
  constructor() {
    this.queue = [];
  }

  push(x) {
    this.queue.push(x);
  }

  pop() {
    // 将队列前面的元素（除了最后一个）全部移到队列末尾
    let size = this.queue.length;
    while (size-- > 1) {
      this.queue.push(this.queue.shift());
    }
    // 移除并返回最后一个元素
    return this.queue.shift();
  }
  top() {
    // 将队列前面的元素（除了最后一个）全部移到队列末尾
    const x = this.pop();
    this.queue.push(x);
  }
  empty() {
    return this.queue.length === 0;
  }
}

// 示例用法：
const stack = new MyStack();
stack.push(1);
stack.push(2);
console.log(stack.top()); // 输出 2
console.log(stack.pop()); // 输出 2
console.log(stack.empty()); // 输出 false
```


/**
 * 有效字符串需满足：
  左括号必须用相同类型的右括号闭合。
  左括号必须以正确的顺序闭合。
  每个右括号都有一个对应的相同类型的左括号。
 */
// 20. 有效的括号 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效
```
var isValid = function (s) {
  // let list = [];
  // for(let i of s) {
  //   switch (i) {
  //     case '(':
  //       list.push(')')
  //       break;
  //     case '[':
  //       list.push(']')
  //       break;
  //     case '{':
  //       list.push('}')
  //       break;
  //     default:
  //       if (i !== list.pop()) return false
  //       break;
  //   }
  // }
  // return !list.length
  let list = [],
    map = {
      "(": ")",
      "[": "]",
      "{": "}",
    };
  for (let i of s) {
    if (map[i]) {
      list.push(i);
      continue;
    }
    if (map[list.pop()] !== i) return false;
  }
  return !list.length;
};
isValid("((");
```


// 1047. 删除字符串中的所有相邻重复项
```
var removeDuplicates = function (s) {
  // var list = []
  // for(let i of s) {
  //   let lastVal = list.length ? list[list.length - 1] : null
  //   if (i === lastVal) {
  //     list.pop()
  //   } else {
  //     list.push(i)
  //   }
  // }
  // return list.join('')
  let list = [...s],
    top = -1;
  for (let i of s) {
    if (top === -1 || list[top] !== i) {
      list[++top] = i;
    } else {
      top--;
    }
  }
  list.length = top + 1;
  console.log("list.join", list.join(""));
  return list.join("");
};
removeDuplicates("dbccab");
```


// 150. 逆波兰表达式求值 给你一个字符串数组 tokens ，表示一个根据 逆波兰表示法 表示的算术表达式。请你计算该表达式。返回一个表示表达式值的整数。
```
var evalRPN = function (tokens) {
  let stack = [];
  for (const token of tokens) {
    if (isNaN(Number(token))) {
      // 重点 isNaN()
      const n2 = stack.pop(); // 出栈两个数字
      const n1 = stack.pop();
      switch (token) {
        case "+":
          stack.push(n1 + n2);
          break;
        case "-":
          stack.push(n1 - n2);
          break;
        case "*":
          stack.push(n1 * n2);
          break;
        case "/":
          const st = (n1 / n2) | 0; // 重点 | 0
          stack.push(st);
          break;
      }
    } else {
      stack.push(Number(token));
    }
  }
  console.log("stack[0]: ", stack[0]);
  return stack[0];
};

evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]);
```


// 239. 滑动窗口最大值 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。返回 滑动窗口中的最大值 。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 ```
var maxSlidingWindow = function (nums, k) {
  class MonoQueue {
    queue;
    constructor() {
      this.queue = [];
    }
    enqueue(value) {
      let back = this.queue[this.queue.length - 1];
      while (back !== undefined && back < value) {
        this.queue.pop();
        back = this.queue[this.queue.length - 1];
      }
      this.queue.push(value);
    }
    dequeue(value) {
      const front = this.front();
      if (front === value) {
        this.queue.shift();
      }
    }
    front() {
      return this.queue[0];
    }
  }
  const helpQueue = new MonoQueue();
  let i = 0,
    j = 0,
    resArr = [];
  // 先将前k个参数循环一遍
  while (j < k) {
    helpQueue.enqueue(nums[j++]);
  }
  resArr.push(helpQueue.front());
  // 再让i从0开始 如果有一样的走过的参数从列表里面删除掉
  while (j < nums.length) {
    helpQueue.enqueue(nums[j++]);
    helpQueue.dequeue(nums[i++]);
    resArr.push(helpQueue.front());
  }
  return resArr;
};
maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3);
```


/**
 * 
 * 在 JavaScript 中，小顶堆通常使用数组来实现。数组表示小顶堆时，元素按层级顺序存储，
 * 即父节点的索引为 i，其左子节点的索引为 2*i + 1，
 * 右子节点的索引为 2*i + 2。这种存储方式使得堆的操作非常高效。
 * 
 * 数组表示的具体规则
  根节点：根节点在数组中的索引为 0。
  左子节点：对于索引为 i 的节点，左子节点的索引为 2*i + 1。
  右子节点：对于索引为 i 的节点，右子节点的索引为 2*i + 2。
  父节点：对于索引为 i 的节点，父节点的索引为 Math.floor((i - 1) / 2)。
 * 
 */

// js实现小顶堆
```
class MinHeap {
  constructor(compareFn) {
    this.head = [];
    this.compareFn = compareFn;
  }
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  getLeftChildIndex(index) {
    return index * 2 + 1;
  }
  getRightChildIndex(index) {
    return index * 2 + 2;
  }
  swap(index1, index2) {
    [this.head[index2], this.head[index1]] = [
      this.head[index1],
      this.head[index2],
    ];
  }
  compare(index1, index2) {
    if (this.head[index1] === undefined) return 1;
    if (this.head[index2] === undefined) return -1;
    return this.compareFn(this.head[index1], this.head[index2]);
  }
  insert(val) {
    this.head.push(val);
    this.headPiFyUp();
  }
  // 向上堆积
  headPiFyUp() {
    let index = this.head.length - 1;
    while (index > 0) {
      let parentIndex = this.getParentIndex(index);
      //  this.head[index] < this.head[parentIndex]
      if (this.compare(index, parentIndex) < 0) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }
  remove() {
    let len = this.head.length;
    if (!len) return null;
    if (len === 1) return this.head.pop();
    const root = this.head[0];
    this.head[0] = this.head.pop();
    this.headPiFyDown(0);
    return root;
  }
  // 向下堆积
  headPiFyDown(index) {
    let smallest = index;
    const leftChildrenIndex = this.getLeftChildIndex(index);
    const rightChildrenIndex = this.getRightChildIndex(index);
    // if (leftChildrenIndex < this.head.length && this.head[leftChildrenIndex] < this.head[smallest]) {
    if (
      leftChildrenIndex < this.head.length &&
      this.compare(leftChildrenIndex, smallest) < 0
    ) {
      smallest = leftChildrenIndex;
    }
    // if (rightChildrenIndex < this.head.length && this.head[rightChildrenIndex] < this.head[smallest]) {
    if (
      rightChildrenIndex < this.head.length &&
      this.compare(rightChildrenIndex, smallest) < 0
    ) {
      smallest = rightChildrenIndex;
    }
    if (smallest !== index) {
      // 说明进行了转换
      this.swap(index, smallest);
      this.headPiFyDown(smallest);
    }
  }
  getMin() {
    return this.head[0];
  }
  size() {
    return this.head.length;
  }
  isEmpty() {
    return !this.head.length;
  }
  buildHeap(arr) {
    this.head = arr;
    for (let i = Math.floor(this.head.length / 2) - 1; i >= 0; i--) {
      this.headPiFyDown(i);
    }
  }
  printHeap() {
    console.log(this.head);
  }
}

// const testMinHeap = () => {
//   const minHeap = new MinHeap((a, b) => a - b)
//   minHeap.insert(10)
//   minHeap.insert(1)
//   minHeap.insert(2)
//   minHeap.insert(3)
//   minHeap.insert(4)
//   minHeap.printHeap()

//   const minVal1 = minHeap.getMin()
//   console.log('minVal1: ', minVal1);

//   minHeap.remove()
//   minHeap.printHeap()

//   const minVal2 = minHeap.getMin()
//   console.log('minVal2: ', minVal2);

//   minHeap.insert(5)
//   minHeap.printHeap()

//   const minVal3 = minHeap.getMin()
//   console.log('minVal3: ', minVal3);
// }
// testMinHeap()
```


// 347. 前 K 个高频元素 给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。
```
var topKFrequent = function (nums, k) {
  const map = new Map();
  for (const i of nums) {
    map.set(i, (map.get(i) || 0) + 1);
  }

  const heap = new MinHeap((a, b) => a[1] - b[1]);

  for (const i of map.entries()) {
    heap.insert(i);
    if (heap.size() > k) {
      heap.remove();
    }
  }
  const res = [];
  heap.printHeap();
  for (let i = heap.size() - 1; i >= 0; i--) {
    res.push(heap.remove()[0]);
  }
  console.log("res: ", res);
  return res;
};

topKFrequent([1, 1, 1, 2, 2, 3], 2);

const topKFrequent2 = (nums, k) => {
  const map = new Map();
  for (const i of nums) {
    map.set(i, (map.get(i) || 0) + 1);
  }
  //返回一个按出现次数降序的二维数组
  let sortArray = Array.from(map).sort((a, b) => b[1] - a[1]),
    res = [];
  for (let i = 0; i < k; i++) {
    res.push(sortArray[i][0]);
  }
  console.log("res: ", res);
  return res;
};
topKFrequent2([1, 1, 1, 2, 2, 3], 2);

```


// 二叉树节点类
```
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BinaryTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      // 新节点放到left
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      // 新节点放到right
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
  search(value) {
    return this.searchNode(this.root, value);
  }
  searchNode(root, value) {
    if (root === null) return false;
    if (value < root.value) {
      this.searchNode(root.left, value);
    } else if (value > root.value) {
      this.searchNode(root.right, value);
    } else {
      return true;
    }
  }
  /**
   * 
   * 看如下中间节点的顺序，就可以发现，中间节点的顺序就是所谓的遍历方式
    前序遍历：中左右
    中序遍历：左中右
    后序遍历：左右中
   */
  // 前序遍历
  preOrder(node = this.root) {
    if (node !== null) {
      console.log(node.value);
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }
  // 中序遍历
  inOrder(node = this.root) {
    if (node !== null) {
      this.preOrder(node.left);
      console.log(node.value);
      this.preOrder(node.right);
    }
  }
  // 后序遍历
  postOrder(node = this.root) {
    if (node !== null) {
      this.preOrder(node.left);
      this.preOrder(node.right);
      console.log(node.value);
    }
  }
}

const treeTestFn = () => {
  const tree = new BinaryTree();
  tree.insert(7);
  tree.insert(4);
  tree.insert(9);
  tree.insert(1);
  tree.insert(6);
  tree.insert(8);
  tree.insert(10);

  console.log("中序遍历");
  tree.inOrder();

  console.log("前序遍历");
  tree.preOrderOrder();

  console.log("后序遍历");
  tree.postOrder();

  console.log("查找节点");
  console.log(tree.search(6));
  console.log(tree.search(15));
};
treeTestFn();

const binaryTreeTraversal2 = () => {
  // 迭代法遍历
  // ---前序遍历---: (中左右) 栈进入顺序 右 -> 左; 出栈  中 -> 左 -> 右
  const preOrderTraversal = (root) => {
    let res = [];
    if (!root) return res;
    let stack = [root],
      cur = null;
    while (stack.length) {
      cur = stack.pop();
      res.push(cur.val);
      cur.right && stack.push(cur.right);
      cur.left && stack.push(cur.left);
    }
    return res;
  };
  // ---前序遍历--- 中左右  压入栈右->左->中; 出栈 中->左->右
  // const preOrderTraversal = (root) => {
  //   let res = [],
  //     stack = [root];
  //   while (stack.length) {
  //     const node = stack.pop();
  //     if (!node) {
  //       res.push(stack.pop().val);
  //       continue;
  //     }
  //     node.right && stack.push(node.right); // 右
  //     node.left && stack.push(node.left); // 左
  //     stack.push(node); // 中
  //     stack.push(null);
  //   }
  //   return res;
  // };

  // ---中序遍历---: (左中右) 入栈 左 -> 右;  出栈 左 -> 中 -> 右
  const inOrderTraversal = (root) => {
    if (!root) return [];
    let res = [],
      stack = [],
      cur = root;
    do {
      if (cur) {
        stack.push(cur);
        cur = cur.left;
      } else {
        cur = stack.pop();
        res.push(cur.val);
        cur = cur.right;
      }
    } while (stack.length || cur);
    return res;
  };

  // ---后序遍历---: (左右中) 栈进入顺序 左 -> 右;  出栈  中 -> 右 -> 左 结果翻转
  const postOrderTraversal = (root) => {
    let res = [];
    if (!root) return res;
    let stack = [root],
      cur = null;
    while (stack.length) {
      cur = stack.pop();
      res.push(cur.val);
      cur.left && stack.push(cur.left);
      cur.right && stack.push(cur.right);
    }
    return res.reverse();
  };
  // ---后续遍历--- 左右中
  // const postOrderTraversal_2 = (root) => {
  //   let res = [];
  //   if (!root) return res;
  //   let stack = [root],
  //     visited = new Set();

  //   while (stack.length) {
  //     const node = stack[stack.length - 1];
  //     if (node.left && !visited.has(node.left)) {
  //       stack.push(node.left);
  //     } else if (node.right && !visited.has(node.right)) {
  //       stack.push(node.right);
  //     } else {
  //       res.push(node.val);
  //       visited.add(node);
  //       stack.pop();
  //     }
  //   }
  //   return res;
  // };
};

// 示例二叉树结构
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

```
// 测试前序遍历方法

// 102.二叉树的层序遍历次  给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）
```
const levelOrder = (root) => {
  if (!root) return [];
  let res = [],
    queue = [root];
  while (queue.length) {
    let curLevel = [],
      len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      curLevel.push(node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    // res.push(curLevel);
    res.unshift(curLevel);
  }
  return res;
};
// 给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
const levelOrderBottom = (root) => {
  if (!root) return [];
  let res = [],
    queue = [root];
  while (queue.length) {
    let curLevel = [],
      len = queue.length;
    while (len--) {
      const node = queue.shift();
      curLevel.push(node.val);
      // 把下一层级的左右节点存入queue队列
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    res.unshift(curLevel);
  }
  return res;
};
```


// 199.二叉树的右视图 给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值
```
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

const rightSideView = (root) => {
  if (!root) return [];
  let res = [],
    queue = [root];
  while (queue.length) {
    let len = queue.length;
    while (len--) {
      const node = queue.shift();
      if (!len) {
        res.push(node.val);
      }
      // 把下一层级的左右节点存入queue队列
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return res;
};
console.log("rightSideView(root): ", rightSideView(root));
```


// 637.二叉树的层平均值  给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。
```
const averageOfLevels = (root) => {
  if (!root) return [];
  let res = [],
    queue = [root];
  while (queue.length) {
    let sum = 0,
      curLen = queue.length,
      len = curLen;
    while (len--) {
      const node = queue.shift();
      sum += node.val;
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    res.push(sum / curLen);
  }
  return res;
};

```

/**
 * 1. 广度优先搜索（BFS）需要先进先出（FIFO）的队列行为，以确保节点按层次顺序被处理。这就是为什么 shift() 被用于 BFS 的原因
 * 2. 如果使用 pop()，队列将变成后进先出（LIFO）的行为，这是深度优先搜索（DFS）的特性，而不是广度优先搜索。
 */

// 给定一个 N 叉树，返回其节点值的层序遍历。 (即从左到右，逐层遍历)。
```
const levelOrderN = function (root) {
  if (!root) return [];
  let res = [],
    queue = [root];
  while (queue.length) {
    let len = queue.length,
      curLevel = [];
    while (len--) {
      const node = queue.shift();
      curLevel.push(node.val);
      for (let item of node.children) {
        item && queue.push(item);
      }
    }
    res.push(curLevel);
  }
  return res;
};
```


// 515. 在每个树行中找最大值 给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。
```
const largestValues = function (root) {
  if (!root) return [];
  let res = [],
    queue = [root];
  while (queue.length) {
    let len = queue.length,
      max = -Infinity;
    while (len--) {
      const node = queue.shift();
      max = Math.max(max, node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    res.push(max);
  }
  return res;
};
```

// 116.填充每个节点的下一个右侧节点指针
/**
 * 给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。初始状态下，所有 next 指针都被设置为 NULL。
 */
 ```
const connect = function (root) {
  if (!root) return root;
  let queue = [root];
  while (queue.length) {
    let len = queue.length;
    while (len--) {
      const node = queue.shift();
      if (len > 0) {
        node.next = queue[0];
      }
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return root;
};
```

// 给定一个二叉树，找出其最大深度。二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
```
const maxDepth = function (root) {
  let max = 0
  if (!root) return max;
  let queue = [root];
  while (queue.length) {
    let len = queue.length;
    max++
    while (len--) {
      const node = queue.shift();
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return max;
}
```


// 111.二叉树的最小深度
```
const minDepth = function(root) {
  let min = 0,queue = [root]
  if (!root) return min
  while(queue.length) {
    let len = queue.length
    min++
    while(len--) {
      const node = queue.shift()
      if (!node.left && !node.right) return min
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
  }
  return min
}
```

// 翻转二叉树
// 递归
```
var invertTree = function(root) {
  if(root == null) return root
  const rightNode = root.right
  root.right = invertTree(root.left)
  root.left = invertTree(rightNode)
  return root
}

// 层序遍历
var invertTree2 = function(root) {
  const invertNode = (root, left, right) => {
    const temp = left
    root.left = right
    root.right = temp
  }
  if (root == null) return root
  let queue = [root]
  while(queue.length) {
    let len = queue.length
    if (len--) {
      const node = queue.shift()
      invertNode(node, node.left, node.right)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
  }
  return root
}
// 迭代遍历 (前序遍历中左右); 入栈顺序为：右左 (栈是后进先出原则)
var invertTree3 = function(root) {
  if (root == null) return root
  let queue = [root]
  while (queue.length) {
    let curNode = queue.pop()
    const temp = curNode.left
    curNode.left = curNode.right
    curNode.right = temp

    // 将右子节点入栈
    if (curNode.right) queue.push(curNode.right)

    // 将右子节点入栈
    if (curNode.left) queue.push(curNode.left)
  }
  return root
}
```