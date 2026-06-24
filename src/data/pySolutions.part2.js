// Optimal Python solutions — Part 2
export const PART2 = {
  // ===== Stack =====
  'min-stack': {
    approach: 'Keep a parallel stack of running minimums alongside the value stack.',
    complexity: 'O(1) time per op, O(n) space',
    explanation: [
      'Track values and running minimums in two stacks.',
      'On push, store min of value and current min.',
      'getMin reads the top of the mins stack.',
    ],
    code: `class MinStack:
    def __init__(self):
        self.stack = []
        self.mins = []

    def push(self, val):
        self.stack.append(val)
        m = val if not self.mins else min(val, self.mins[-1])
        self.mins.append(m)

    def pop(self):
        self.stack.pop()
        self.mins.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.mins[-1]`,
  },
  'evaluate-reverse-polish-notation': {
    approach: 'Push operands; on an operator pop two and push the result.',
    complexity: 'O(n) time, O(n) space',
    explanation: [
      'Push each number onto the stack.',
      'On operator, pop two and apply it.',
      'Push the result; final stack top is the answer.',
    ],
    code: `def eval_rpn(tokens):
    stack = []
    ops = {"+", "-", "*", "/"}
    for t in tokens:
        if t in ops:
            b = stack.pop()
            a = stack.pop()
            if t == "+":
                stack.append(a + b)
            elif t == "-":
                stack.append(a - b)
            elif t == "*":
                stack.append(a * b)
            else:
                stack.append(int(a / b))  # truncate toward zero
        else:
            stack.append(int(t))
    return stack[-1]`,
  },
  'generate-parentheses': {
    approach: 'Backtrack adding "(" while open < n and ")" while close < open.',
    complexity: 'O(4^n / sqrt(n)) time and space',
    explanation: [
      'Backtrack building the string character by character.',
      'Add open paren while open count below n.',
      'Add close paren only while close below open.',
      'Record the string when length reaches 2n.',
    ],
    code: `def generate_parenthesis(n):
    res = []
    cur = []

    def backtrack(open_n, close_n):
        if len(cur) == 2 * n:
            res.append("".join(cur))
            return
        if open_n < n:
            cur.append("(")
            backtrack(open_n + 1, close_n)
            cur.pop()
        if close_n < open_n:
            cur.append(")")
            backtrack(open_n, close_n + 1)
            cur.pop()

    backtrack(0, 0)
    return res`,
  },
  'daily-temperatures': {
    approach: 'Monotonic decreasing stack of indices; resolve spans when a warmer day appears.',
    complexity: 'O(n) time, O(n) space',
    explanation: [
      'Keep a stack of indices with decreasing temps.',
      'When a warmer day arrives, pop waiting indices.',
      'Record the day gap for each popped index.',
    ],
    code: `def daily_temperatures(temperatures):
    res = [0] * len(temperatures)
    stack = []  # indices with decreasing temps
    for i, t in enumerate(temperatures):
        while stack and t > temperatures[stack[-1]]:
            j = stack.pop()
            res[j] = i - j
        stack.append(i)
    return res`,
  },
  'car-fleet': {
    approach: 'Sort cars by position descending; a slower car ahead absorbs faster ones behind into one fleet.',
    complexity: 'O(n log n) time, O(n) space',
    explanation: [
      'Sort cars by position closest to target first.',
      'Compute each car time to reach the target.',
      'A new fleet forms when a car is slower.',
    ],
    code: `def car_fleet(target, position, speed):
    pairs = sorted(zip(position, speed), reverse=True)
    fleets = 0
    slowest_time = 0.0
    for pos, spd in pairs:
        time = (target - pos) / spd
        if time > slowest_time:
            fleets += 1
            slowest_time = time
    return fleets`,
  },
  'largest-rectangle-in-histogram': {
    approach: 'Monotonic increasing stack; pop and compute area when a shorter bar arrives.',
    complexity: 'O(n) time, O(n) space',
    explanation: [
      'Keep an increasing stack of start index and height.',
      'On a shorter bar, pop and compute its area.',
      'Reuse the popped start as the new bar start.',
      'Flush remaining bars extending to the end.',
    ],
    code: `def largest_rectangle_area(heights):
    stack = []  # (start_index, height)
    max_area = 0
    for i, h in enumerate(heights):
        start = i
        while stack and stack[-1][1] > h:
            idx, height = stack.pop()
            max_area = max(max_area, height * (i - idx))
            start = idx
        stack.append((start, h))
    n = len(heights)
    for idx, height in stack:
        max_area = max(max_area, height * (n - idx))
    return max_area`,
  },

  // ===== Queue =====
  'implement-queue-using-stacks': {
    approach: 'Two stacks; push to in-stack, lazily transfer to out-stack for pop/peek.',
    complexity: 'O(1) amortized per op, O(n) space',
    explanation: [
      'Push always goes onto the in-stack.',
      'When out-stack empty, pour in-stack into it reversed.',
      'Pop and peek take from the out-stack top.',
    ],
    code: `class MyQueue:
    def __init__(self):
        self.in_stack = []
        self.out_stack = []

    def push(self, x):
        self.in_stack.append(x)

    def _shift(self):
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())

    def pop(self):
        self._shift()
        return self.out_stack.pop()

    def peek(self):
        self._shift()
        return self.out_stack[-1]

    def empty(self):
        return not self.in_stack and not self.out_stack`,
  },
  'implement-stack-using-queues': {
    approach: 'Single queue; after each push, rotate the queue so the newest element is at the front.',
    complexity: 'O(n) push, O(1) pop/top, O(n) space',
    explanation: [
      'Append the new element to the queue.',
      'Rotate older elements behind it via popleft/append.',
      'Front of queue is now the newest element.',
    ],
    code: `from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()

    def push(self, x):
        self.q.append(x)
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.popleft())

    def pop(self):
        return self.q.popleft()

    def top(self):
        return self.q[0]

    def empty(self):
        return not self.q`,
  },
  'number-of-recent-calls': {
    approach: 'Keep a queue of timestamps; evict any older than t-3000 before counting.',
    complexity: 'O(1) amortized per call, O(n) space',
    explanation: [
      'Append the new timestamp to the queue.',
      'Pop front timestamps older than t minus 3000.',
      'Return the queue length as the count.',
    ],
    code: `from collections import deque

class RecentCounter:
    def __init__(self):
        self.q = deque()

    def ping(self, t):
        self.q.append(t)
        while self.q[0] < t - 3000:
            self.q.popleft()
        return len(self.q)`,
  },

  // ===== Linked List =====
  'reverse-linked-list': {
    approach: 'Iteratively reverse next pointers with a prev cursor.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Start prev at None, walk the list.',
      'Save next, point current node back at prev.',
      'Advance prev and head one step each.',
      'Return prev as the new head.',
    ],
    code: `# Definition: class ListNode: def __init__(self, val=0, next=None): ...
def reverse_list(head):
    prev = None
    while head:
        nxt = head.next
        head.next = prev
        prev = head
        head = nxt
    return prev`,
  },
  'merge-two-sorted-lists': {
    approach: 'Splice nodes from the smaller head onto a dummy tail until one list ends.',
    complexity: 'O(n + m) time, O(1) space',
    explanation: [
      'Use a dummy node and a tail pointer.',
      'Attach the smaller head, advance that list.',
      'Append the leftover list when one ends.',
      'Return dummy.next as the merged head.',
    ],
    code: `# Definition: class ListNode: def __init__(self, val=0, next=None): ...
def merge_two_lists(list1, list2):
    dummy = tail = ListNode()
    while list1 and list2:
        if list1.val <= list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next
    tail.next = list1 or list2
    return dummy.next`,
  },
  'linked-list-cycle': {
    approach: 'Floyd fast/slow pointers; they meet iff a cycle exists.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Move slow one step, fast two steps.',
      'If they ever meet, a cycle exists.',
      'If fast hits None, the list is acyclic.',
    ],
    code: `# Definition: class ListNode: def __init__(self, val=0, next=None): ...
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
  },
  'middle-of-the-linked-list': {
    approach: 'Advance fast two steps per slow step; slow lands on the (second) middle.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Move slow one step, fast two steps.',
      'When fast reaches the end, slow is centered.',
      'Return slow, the middle node.',
    ],
    code: `# Definition: class ListNode: def __init__(self, val=0, next=None): ...
def middle_node(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`,
  },
  'remove-nth-node-from-end-of-list': {
    approach: 'Two pointers n apart; advance both until the lead hits the end, then unlink.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Use a dummy and advance lead n steps.',
      'Move lead and lag until lead reaches end.',
      'Lag now sits before the target node.',
      'Unlink by skipping lag.next.',
    ],
    code: `# Definition: class ListNode: def __init__(self, val=0, next=None): ...
def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    lead = lag = dummy
    for _ in range(n):
        lead = lead.next
    while lead.next:
        lead = lead.next
        lag = lag.next
    lag.next = lag.next.next
    return dummy.next`,
  },
  'add-two-numbers': {
    approach: 'Walk both lists adding digits with a carry into a new list.',
    complexity: 'O(max(n, m)) time, O(max(n, m)) space',
    explanation: [
      'Walk both lists while a carry remains.',
      'Sum the two digits plus the carry.',
      'divmod gives the new carry and digit.',
      'Append each digit to a result list.',
    ],
    code: `# Definition: class ListNode: def __init__(self, val=0, next=None): ...
def add_two_numbers(l1, l2):
    dummy = tail = ListNode()
    carry = 0
    while l1 or l2 or carry:
        a = l1.val if l1 else 0
        b = l2.val if l2 else 0
        carry, digit = divmod(a + b + carry, 10)
        tail.next = ListNode(digit)
        tail = tail.next
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
    return dummy.next`,
  },
  'reorder-list': {
    approach: 'Find the middle, reverse the second half, then weave the two halves together.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Find the middle with fast/slow pointers.',
      'Reverse the second half in place.',
      'Weave nodes alternately from both halves.',
    ],
    code: `# Definition: class ListNode: def __init__(self, val=0, next=None): ...
def reorder_list(head):
    # find middle
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    # reverse second half
    prev, cur = None, slow.next
    slow.next = None
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    # merge
    first, second = head, prev
    while second:
        first.next, first = second, first.next
        second.next, second = first, second.next`,
  },
  'copy-list-with-random-pointer': {
    approach: 'Interleave cloned nodes after originals to wire random pointers, then split.',
    complexity: 'O(n) time, O(1) extra space',
    explanation: [
      'Insert each clone right after its original.',
      'Set clone randoms using the interleaved layout.',
      'Unzip the two lists back apart.',
    ],
    code: `# Definition: class Node: def __init__(self, x, next=None, random=None): ...
def copy_random_list(head):
    if not head:
        return None
    # interleave clones
    cur = head
    while cur:
        clone = Node(cur.val, cur.next, None)
        cur.next = clone
        cur = clone.next
    # assign randoms
    cur = head
    while cur:
        if cur.random:
            cur.next.random = cur.random.next
        cur = cur.next.next
    # split lists
    cur = head
    new_head = head.next
    while cur:
        clone = cur.next
        cur.next = clone.next
        clone.next = clone.next.next if clone.next else None
        cur = cur.next
    return new_head`,
  },
  'lru-cache': {
    approach: 'Hash map of keys to nodes in a doubly linked list; move-to-front on use, evict the tail.',
    complexity: 'O(1) time per op, O(capacity) space',
    explanation: [
      'Map keys to nodes in a doubly linked list.',
      'On access, remove the node and add it front.',
      'On put over capacity, evict the tail node.',
    ],
    code: `class Node:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = {}
        self.head = Node()  # most recent side
        self.tail = Node()  # least recent side
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_front(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key):
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._remove(node)
        self._add_front(node)
        return node.val

    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self.cache[key] = node
        self._add_front(node)
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]`,
  },
  'merge-k-sorted-lists': {
    approach: 'Min-heap of list heads; pop the smallest and push its successor.',
    complexity: 'O(N log k) time, O(k) space',
    explanation: [
      'Push each list head into a min-heap.',
      'Pop the smallest node, append it to result.',
      'Push that node successor back into the heap.',
    ],
    code: `import heapq
# Definition: class ListNode: def __init__(self, val=0, next=None): ...
def merge_k_lists(lists):
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))
    dummy = tail = ListNode()
    while heap:
        _, i, node = heapq.heappop(heap)
        tail.next = node
        tail = node
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next`,
  },

  // ===== Binary Search =====
  'binary-search': {
    approach: 'Classic halving search over a sorted array with inclusive bounds.',
    complexity: 'O(log n) time, O(1) space',
    explanation: [
      'Keep inclusive lo and hi bounds.',
      'Check the middle element each step.',
      'Move toward the half that may hold target.',
      'Return -1 if the range empties.',
    ],
    code: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
  },
  'search-insert-position': {
    approach: 'Binary search for the leftmost index where target could be inserted.',
    complexity: 'O(log n) time, O(1) space',
    explanation: [
      'Search half-open range zero to length.',
      'Shrink toward the leftmost valid index.',
      'lo settles on the insertion position.',
    ],
    code: `def search_insert(nums, target):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo`,
  },
  'sqrtx': {
    approach: 'Binary search the largest m with m*m <= x.',
    complexity: 'O(log x) time, O(1) space',
    explanation: [
      'Binary search candidate roots from 0 to x.',
      'If mid squared fits, record it and go higher.',
      'Otherwise go lower; return the best recorded.',
    ],
    code: `def my_sqrt(x):
    lo, hi = 0, x
    ans = 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if mid * mid <= x:
            ans = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return ans`,
  },
  'search-a-2d-matrix': {
    approach: 'Treat the matrix as one sorted array and binary search by flattened index.',
    complexity: 'O(log(m*n)) time, O(1) space',
    explanation: [
      'Treat the grid as one flattened sorted array.',
      'Map a flat index to row and column.',
      'Binary search that virtual array for target.',
    ],
    code: `def search_matrix(matrix, target):
    rows, cols = len(matrix), len(matrix[0])
    lo, hi = 0, rows * cols - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        val = matrix[mid // cols][mid % cols]
        if val == target:
            return True
        if val < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return False`,
  },
  'find-first-and-last-position-of-element-in-sorted-array': {
    approach: 'Two binary searches for the left and right bounds of the target.',
    complexity: 'O(log n) time, O(1) space',
    explanation: [
      'A helper finds the left or right boundary.',
      'Run it once for the first occurrence.',
      'Run it again for the last occurrence.',
      'Return -1, -1 when target is absent.',
    ],
    code: `def search_range(nums, target):
    def bound(left):
        lo, hi = 0, len(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if nums[mid] < target or (not left and nums[mid] == target):
                lo = mid + 1
            else:
                hi = mid
        return lo

    start = bound(True)
    if start == len(nums) or nums[start] != target:
        return [-1, -1]
    end = bound(False) - 1
    return [start, end]`,
  },
  'search-in-rotated-sorted-array': {
    approach: 'Binary search; one half is always sorted, decide which side to keep.',
    complexity: 'O(log n) time, O(1) space',
    explanation: [
      'Find which half is sorted around mid.',
      'If target lies in the sorted half, search there.',
      'Otherwise search the other half.',
      'Return -1 when the range empties.',
    ],
    code: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:  # left half sorted
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:  # right half sorted
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1`,
  },
  'koko-eating-bananas': {
    approach: 'Binary search the smallest eating speed that finishes within h hours.',
    complexity: 'O(n log max_pile) time, O(1) space',
    explanation: [
      'Binary search the eating speed candidates.',
      'Compute hours needed at each trial speed.',
      'Keep slower speeds that still finish in time.',
    ],
    code: `import math
def min_eating_speed(piles, h):
    def hours(speed):
        return sum(math.ceil(p / speed) for p in piles)

    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        if hours(mid) <= h:
            hi = mid
        else:
            lo = mid + 1
    return lo`,
  },
  'find-peak-element': {
    approach: 'Binary search toward the higher neighbor; an uphill edge always leads to a peak.',
    complexity: 'O(log n) time, O(1) space',
    explanation: [
      'Compare mid with its right neighbor.',
      'Climb uphill toward the larger side.',
      'lo converges on a peak index.',
    ],
    code: `def find_peak_element(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < nums[mid + 1]:
            lo = mid + 1
        else:
            hi = mid
    return lo`,
  },
  'median-of-two-sorted-arrays': {
    approach: 'Binary search a partition of the smaller array so left halves hold exactly half the elements.',
    complexity: 'O(log(min(n, m))) time, O(1) space',
    explanation: [
      'Binary search a partition of the smaller array.',
      'Pair it so left halves hold half the elements.',
      'Adjust until left maxes are below right mins.',
      'Combine boundary values for the median.',
    ],
    code: `def find_median_sorted_arrays(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    n, m = len(nums1), len(nums2)
    half = (n + m + 1) // 2
    lo, hi = 0, n
    while lo <= hi:
        i = (lo + hi) // 2
        j = half - i
        left1 = nums1[i - 1] if i > 0 else float("-inf")
        right1 = nums1[i] if i < n else float("inf")
        left2 = nums2[j - 1] if j > 0 else float("-inf")
        right2 = nums2[j] if j < m else float("inf")
        if left1 <= right2 and left2 <= right1:
            if (n + m) % 2:
                return float(max(left1, left2))
            return (max(left1, left2) + min(right1, right2)) / 2
        elif left1 > right2:
            hi = i - 1
        else:
            lo = i + 1`,
  },

  // ===== Trees =====
  'maximum-depth-of-binary-tree': {
    approach: 'Recurse and return 1 plus the max depth of the two subtrees.',
    complexity: 'O(n) time, O(h) space',
    explanation: [
      'Empty subtree contributes depth zero.',
      'Recurse on both children for their depths.',
      'Return one plus the larger child depth.',
    ],
    code: `# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
  },
  'invert-binary-tree': {
    approach: 'Swap left and right children recursively.',
    complexity: 'O(n) time, O(h) space',
    explanation: [
      'Stop at a null node.',
      'Swap the inverted left and right subtrees.',
      'Return the node after swapping.',
    ],
    code: `# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def invert_tree(root):
    if not root:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root`,
  },
  'same-tree': {
    approach: 'Recursively compare node values and matching subtree structure.',
    complexity: 'O(n) time, O(h) space',
    explanation: [
      'Two nulls count as matching.',
      'Mismatch if one is null or values differ.',
      'Recurse on left and right children together.',
    ],
    code: `# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def is_same_tree(p, q):
    if not p and not q:
        return True
    if not p or not q or p.val != q.val:
        return False
    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)`,
  },
  'subtree-of-another-tree': {
    approach: 'For each node, check if the subtree rooted there equals subRoot.',
    complexity: 'O(n*m) time, O(h) space',
    explanation: [
      'A same helper checks full tree equality.',
      'At each node test equality with subRoot.',
      'Otherwise recurse into left and right children.',
    ],
    code: `# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def is_subtree(root, sub_root):
    def same(a, b):
        if not a and not b:
            return True
        if not a or not b or a.val != b.val:
            return False
        return same(a.left, b.left) and same(a.right, b.right)

    if not sub_root:
        return True
    if not root:
        return False
    if same(root, sub_root):
        return True
    return is_subtree(root.left, sub_root) or is_subtree(root.right, sub_root)`,
  },
  'diameter-of-binary-tree': {
    approach: 'Post-order DFS returning height while tracking the max left+right path.',
    complexity: 'O(n) time, O(h) space',
    explanation: [
      'Recurse computing each node height.',
      'Path through node is left plus right height.',
      'Track the largest such path as best.',
    ],
    code: `# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def diameter_of_binary_tree(root):
    best = 0

    def height(node):
        nonlocal best
        if not node:
            return 0
        left = height(node.left)
        right = height(node.right)
        best = max(best, left + right)
        return 1 + max(left, right)

    height(root)
    return best`,
  },
  'balanced-binary-tree': {
    approach: 'Post-order DFS returning height, short-circuiting with -1 when unbalanced.',
    complexity: 'O(n) time, O(h) space',
    explanation: [
      'Recurse returning subtree heights.',
      'Return -1 once any subtree is unbalanced.',
      'Tree is balanced if height stays non-negative.',
    ],
    code: `# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def is_balanced(root):
    def height(node):
        if not node:
            return 0
        left = height(node.left)
        if left == -1:
            return -1
        right = height(node.right)
        if right == -1:
            return -1
        if abs(left - right) > 1:
            return -1
        return 1 + max(left, right)

    return height(root) != -1`,
  },
  'path-sum': {
    approach: 'DFS subtracting node values; succeed when a leaf hits the remaining target.',
    complexity: 'O(n) time, O(h) space',
    explanation: [
      'Subtract the node value from the target.',
      'At a leaf, succeed if remainder equals leaf.',
      'Recurse into either child otherwise.',
    ],
    code: `# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def has_path_sum(root, target_sum):
    if not root:
        return False
    if not root.left and not root.right:
        return target_sum == root.val
    rem = target_sum - root.val
    return has_path_sum(root.left, rem) or has_path_sum(root.right, rem)`,
  },
  'binary-tree-level-order-traversal': {
    approach: 'BFS level by level, collecting each queue snapshot.',
    complexity: 'O(n) time, O(n) space',
    explanation: [
      'Use a queue seeded with the root.',
      'Process one full level per outer loop.',
      'Enqueue children while collecting values.',
    ],
    code: `from collections import deque
# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def level_order(root):
    if not root:
        return []
    res = []
    q = deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        res.append(level)
    return res`,
  },
  'binary-tree-zigzag-level-order-traversal': {
    approach: 'BFS level order, reversing every other level before appending.',
    complexity: 'O(n) time, O(n) space',
    explanation: [
      'BFS collecting each level normally.',
      'Reverse the level on alternating rows.',
      'Flip the direction flag after each level.',
    ],
    code: `from collections import deque
# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def zigzag_level_order(root):
    if not root:
        return []
    res = []
    q = deque([root])
    left_to_right = True
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        res.append(level if left_to_right else level[::-1])
        left_to_right = not left_to_right
    return res`,
  },
  'binary-tree-right-side-view': {
    approach: 'BFS per level, taking the last node seen on each level.',
    complexity: 'O(n) time, O(n) space',
    explanation: [
      'BFS level by level using a queue.',
      'Record only the last node of each level.',
      'Those rightmost nodes form the side view.',
    ],
    code: `from collections import deque
# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def right_side_view(root):
    if not root:
        return []
    res = []
    q = deque([root])
    while q:
        size = len(q)
        for i in range(size):
            node = q.popleft()
            if i == size - 1:
                res.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
    return res`,
  },
  'count-good-nodes-in-binary-tree': {
    approach: 'DFS carrying the max value on the path; count nodes >= that max.',
    complexity: 'O(n) time, O(h) space',
    explanation: [
      'Carry the max value seen on the path.',
      'Count the node if it is at least that max.',
      'Recurse passing down the updated max.',
    ],
    code: `# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def good_nodes(root):
    def dfs(node, max_so_far):
        if not node:
            return 0
        count = 1 if node.val >= max_so_far else 0
        new_max = max(max_so_far, node.val)
        count += dfs(node.left, new_max)
        count += dfs(node.right, new_max)
        return count

    return dfs(root, root.val)`,
  },
  'lowest-common-ancestor-of-a-binary-tree': {
    approach: 'DFS; the node where p and q split (or which is one of them) is the LCA.',
    complexity: 'O(n) time, O(h) space',
    explanation: [
      'Return the node if it matches p or q.',
      'Recurse into both subtrees for results.',
      'If both sides return, this node is the LCA.',
      'Otherwise bubble up the non-null side.',
    ],
    code: `# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def lowest_common_ancestor(root, p, q):
    if not root or root is p or root is q:
        return root
    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)
    if left and right:
        return root
    return left or right`,
  },
  'construct-binary-tree-from-preorder-and-inorder-traversal': {
    approach: 'Preorder gives roots in order; an inorder index map locates each split in O(1).',
    complexity: 'O(n) time, O(n) space',
    explanation: [
      'Map each value to its inorder index.',
      'Take preorder values in order as roots.',
      'Split inorder at the root for the subtrees.',
      'Recurse to build left then right.',
    ],
    code: `# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def build_tree(preorder, inorder):
    idx = {v: i for i, v in enumerate(inorder)}
    self_pre = [0]  # mutable pointer into preorder

    def build(lo, hi):
        if lo > hi:
            return None
        val = preorder[self_pre[0]]
        self_pre[0] += 1
        node = TreeNode(val)
        mid = idx[val]
        node.left = build(lo, mid - 1)
        node.right = build(mid + 1, hi)
        return node

    return build(0, len(inorder) - 1)`,
  },
  'binary-tree-maximum-path-sum': {
    approach: 'Post-order DFS returning best downward gain; track best split at each node.',
    complexity: 'O(n) time, O(h) space',
    explanation: [
      'Compute each child best downward gain.',
      'Clamp negative gains to zero.',
      'Best path through node is value plus both gains.',
      'Return value plus the larger single branch.',
    ],
    code: `# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def max_path_sum(root):
    best = float("-inf")

    def gain(node):
        nonlocal best
        if not node:
            return 0
        left = max(gain(node.left), 0)
        right = max(gain(node.right), 0)
        best = max(best, node.val + left + right)
        return node.val + max(left, right)

    gain(root)
    return best`,
  },
  'serialize-and-deserialize-binary-tree': {
    approach: 'Preorder DFS with explicit null markers; rebuild by consuming tokens in the same order.',
    complexity: 'O(n) time, O(n) space',
    explanation: [
      'Serialize with preorder DFS, marking nulls.',
      'Join the tokens into a comma string.',
      'Deserialize by consuming tokens in order.',
      'Rebuild left then right from the same stream.',
    ],
    code: `from collections import deque
# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
class Codec:
    def serialize(self, root):
        out = []

        def dfs(node):
            if not node:
                out.append("#")
                return
            out.append(str(node.val))
            dfs(node.left)
            dfs(node.right)

        dfs(root)
        return ",".join(out)

    def deserialize(self, data):
        tokens = deque(data.split(","))

        def build():
            val = tokens.popleft()
            if val == "#":
                return None
            node = TreeNode(int(val))
            node.left = build()
            node.right = build()
            return node

        return build()`,
  },

  // ===== BST =====
  'convert-sorted-array-to-binary-search-tree': {
    approach: 'Recurse on the middle element as root to keep the tree height-balanced.',
    complexity: 'O(n) time, O(log n) space',
    explanation: [
      'Pick the middle element as the subtree root.',
      'Recurse on the left half for the left child.',
      'Recurse on the right half for the right child.',
    ],
    code: `# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def sorted_array_to_bst(nums):
    def build(lo, hi):
        if lo > hi:
            return None
        mid = (lo + hi) // 2
        node = TreeNode(nums[mid])
        node.left = build(lo, mid - 1)
        node.right = build(mid + 1, hi)
        return node

    return build(0, len(nums) - 1)`,
  },
  'validate-binary-search-tree': {
    approach: 'DFS passing down an open (low, high) range each node must satisfy.',
    complexity: 'O(n) time, O(h) space',
    explanation: [
      'Pass an allowed open low-high range down.',
      'Each value must fall strictly inside it.',
      'Narrow the range when recursing each side.',
    ],
    code: `# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def is_valid_bst(root):
    def valid(node, low, high):
        if not node:
            return True
        if not (low < node.val < high):
            return False
        return valid(node.left, low, node.val) and valid(node.right, node.val, high)

    return valid(root, float("-inf"), float("inf"))`,
  },
  'kth-smallest-element-in-a-bst': {
    approach: 'Iterative in-order traversal; the kth popped node is the answer.',
    complexity: 'O(h + k) time, O(h) space',
    explanation: [
      'Iterative in-order using an explicit stack.',
      'Dive left, pushing nodes along the way.',
      'Each pop is the next smallest value.',
      'Return when the kth node is popped.',
    ],
    code: `# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def kth_smallest(root, k):
    stack = []
    cur = root
    while cur or stack:
        while cur:
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()
        k -= 1
        if k == 0:
            return cur.val
        cur = cur.right`,
  },
  'lowest-common-ancestor-of-a-binary-search-tree': {
    approach: 'Walk down: go left/right while both targets are on one side, else split point is the LCA.',
    complexity: 'O(h) time, O(1) space',
    explanation: [
      'Walk down from the root comparing values.',
      'Go left when both targets are smaller.',
      'Go right when both are larger.',
      'The split point is the LCA.',
    ],
    code: `# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def lowest_common_ancestor(root, p, q):
    cur = root
    while cur:
        if p.val < cur.val and q.val < cur.val:
            cur = cur.left
        elif p.val > cur.val and q.val > cur.val:
            cur = cur.right
        else:
            return cur`,
  },
  'insert-into-a-binary-search-tree': {
    approach: 'Walk down comparing values; attach the new leaf at the empty slot.',
    complexity: 'O(h) time, O(1) space',
    explanation: [
      'Empty tree becomes a single new node.',
      'Walk left or right comparing the value.',
      'Attach the new leaf at the empty slot.',
    ],
    code: `# Definition: class TreeNode: def __init__(self, val=0, left=None, right=None): ...
def insert_into_bst(root, val):
    if not root:
        return TreeNode(val)
    cur = root
    while True:
        if val < cur.val:
            if not cur.left:
                cur.left = TreeNode(val)
                return root
            cur = cur.left
        else:
            if not cur.right:
                cur.right = TreeNode(val)
                return root
            cur = cur.right`,
  },
}
