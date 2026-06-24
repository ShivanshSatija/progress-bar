// Optimal Python solutions — Part 3
export const PART3 = {
  // ===== Heap =====
  'last-stone-weight': {
    approach: 'Max-heap (negated) repeatedly smashes the two heaviest stones.',
    complexity: 'O(n log n) time, O(n) space',
    code: `import heapq

def last_stone_weight(stones):
    heap = [-s for s in stones]
    heapq.heapify(heap)
    while len(heap) > 1:
        first = -heapq.heappop(heap)
        second = -heapq.heappop(heap)
        if first != second:
            heapq.heappush(heap, -(first - second))
    return -heap[0] if heap else 0`,
  },
  'kth-largest-element-in-a-stream': {
    approach: 'Maintain a min-heap of size k so the root is always the kth largest.',
    complexity: 'O(log k) per add, O(k) space',
    code: `import heapq

class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.heap = nums
        heapq.heapify(self.heap)
        while len(self.heap) > k:
            heapq.heappop(self.heap)

    def add(self, val):
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]`,
  },
  'kth-largest-element-in-an-array': {
    approach: 'Min-heap of size k keeps the k largest seen so far; root is the answer.',
    complexity: 'O(n log k) time, O(k) space',
    code: `import heapq

def find_kth_largest(nums, k):
    return heapq.nlargest(k, nums)[-1]`,
  },
  'k-closest-points-to-origin': {
    approach: 'Use a max-heap of size k keyed by negative squared distance.',
    complexity: 'O(n log k) time, O(k) space',
    code: `import heapq

def k_closest(points, k):
    heap = []
    for x, y in points:
        dist = x * x + y * y
        heapq.heappush(heap, (-dist, x, y))
        if len(heap) > k:
            heapq.heappop(heap)
    return [[x, y] for _, x, y in heap]`,
  },
  'task-scheduler': {
    approach: 'Greedy formula: most frequent task defines idle slots filled by others.',
    complexity: 'O(n) time, O(1) space',
    code: `from collections import Counter

def least_interval(tasks, n):
    counts = Counter(tasks)
    max_count = max(counts.values())
    max_freq = sum(1 for c in counts.values() if c == max_count)
    return max(len(tasks), (max_count - 1) * (n + 1) + max_freq)`,
  },
  'find-median-from-data-stream': {
    approach: 'Two heaps (max-heap low half, min-heap high half) kept balanced.',
    complexity: 'O(log n) add, O(1) find, O(n) space',
    code: `import heapq

class MedianFinder:
    def __init__(self):
        self.low = []   # max-heap (negated)
        self.high = []  # min-heap

    def addNum(self, num):
        heapq.heappush(self.low, -num)
        heapq.heappush(self.high, -heapq.heappop(self.low))
        if len(self.high) > len(self.low):
            heapq.heappush(self.low, -heapq.heappop(self.high))

    def findMedian(self):
        if len(self.low) > len(self.high):
            return -self.low[0]
        return (-self.low[0] + self.high[0]) / 2`,
  },

  // ===== Greedy =====
  'jump-game': {
    approach: 'Track the farthest reachable index; fail if a position is unreachable.',
    complexity: 'O(n) time, O(1) space',
    code: `def can_jump(nums):
    reach = 0
    for i, step in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + step)
    return True`,
  },
  'jump-game-ii': {
    approach: 'BFS-style greedy: extend the current jump window when its end is hit.',
    complexity: 'O(n) time, O(1) space',
    code: `def jump(nums):
    jumps = 0
    cur_end = 0
    farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end:
            jumps += 1
            cur_end = farthest
    return jumps`,
  },
  'gas-station': {
    approach: 'If total gas >= total cost, the start is where running tank dips lowest.',
    complexity: 'O(n) time, O(1) space',
    code: `def can_complete_circuit(gas, cost):
    if sum(gas) < sum(cost):
        return -1
    start = 0
    tank = 0
    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        if tank < 0:
            start = i + 1
            tank = 0
    return start`,
  },
  'hand-of-straights': {
    approach: 'Greedily form consecutive groups starting from the smallest available card.',
    complexity: 'O(n log n) time, O(n) space',
    code: `from collections import Counter
import heapq

def is_n_straight_hand(hand, group_size):
    if len(hand) % group_size != 0:
        return False
    count = Counter(hand)
    heap = list(count.keys())
    heapq.heapify(heap)
    while heap:
        smallest = heap[0]
        for x in range(smallest, smallest + group_size):
            if count[x] == 0:
                return False
            count[x] -= 1
            if count[x] == 0:
                if x != heap[0]:
                    return False
                heapq.heappop(heap)
    return True`,
  },
  'valid-parenthesis-string': {
    approach: 'Track the range [low, high] of possible open-paren counts as we scan.',
    complexity: 'O(n) time, O(1) space',
    code: `def check_valid_string(s):
    low = high = 0
    for ch in s:
        if ch == '(':
            low += 1
            high += 1
        elif ch == ')':
            low -= 1
            high -= 1
        else:
            low -= 1
            high += 1
        if high < 0:
            return False
        low = max(low, 0)
    return low == 0`,
  },
  'partition-labels': {
    approach: 'Record each char last index; extend partition until reaching its end.',
    complexity: 'O(n) time, O(1) space',
    code: `def partition_labels(s):
    last = {ch: i for i, ch in enumerate(s)}
    result = []
    start = end = 0
    for i, ch in enumerate(s):
        end = max(end, last[ch])
        if i == end:
            result.append(end - start + 1)
            start = i + 1
    return result`,
  },
  'merge-triplets-to-form-target-triplet': {
    approach: 'Keep triplets not exceeding target; check each target coord is achievable.',
    complexity: 'O(n) time, O(1) space',
    code: `def merge_triplets(triplets, target):
    found = set()
    for t in triplets:
        if t[0] <= target[0] and t[1] <= target[1] and t[2] <= target[2]:
            for i in range(3):
                if t[i] == target[i]:
                    found.add(i)
    return len(found) == 3`,
  },

  // ===== Graphs =====
  'find-if-path-exists-in-graph': {
    approach: 'Union-Find: connect each edge, then check both vertices share a root.',
    complexity: 'O(E * alpha(V)) time, O(V) space',
    code: `def valid_path(n, edges, source, destination):
    parent = list(range(n))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for a, b in edges:
        parent[find(a)] = find(b)
    return find(source) == find(destination)`,
  },
  'number-of-islands': {
    approach: 'DFS flood-fill each unvisited land cell, counting connected components.',
    complexity: 'O(m*n) time, O(m*n) space',
    code: `def num_islands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])

    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    return count`,
  },
  'number-of-provinces': {
    approach: 'Union-Find on the adjacency matrix; count distinct connected roots.',
    complexity: 'O(n^2) time, O(n) space',
    code: `def find_circle_num(is_connected):
    n = len(is_connected)
    parent = list(range(n))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for i in range(n):
        for j in range(i + 1, n):
            if is_connected[i][j]:
                parent[find(i)] = find(j)
    return sum(1 for i in range(n) if find(i) == i)`,
  },
  'max-area-of-island': {
    approach: 'DFS each land cell, summing area and sinking visited cells.',
    complexity: 'O(m*n) time, O(m*n) space',
    code: `def max_area_of_island(grid):
    rows, cols = len(grid), len(grid[0])

    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != 1:
            return 0
        grid[r][c] = 0
        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)

    best = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                best = max(best, dfs(r, c))
    return best`,
  },
  'clone-graph': {
    approach: 'DFS with a map from original nodes to their clones to handle cycles.',
    complexity: 'O(V+E) time, O(V) space',
    code: `# Node has attributes .val and .neighbors (list of Node)
def clone_graph(node):
    if not node:
        return None
    clones = {}

    def dfs(n):
        if n in clones:
            return clones[n]
        copy = Node(n.val)
        clones[n] = copy
        for neighbor in n.neighbors:
            copy.neighbors.append(dfs(neighbor))
        return copy

    return dfs(node)`,
  },
  'rotting-oranges': {
    approach: 'Multi-source BFS from all rotten oranges; track minutes until none fresh.',
    complexity: 'O(m*n) time, O(m*n) space',
    code: `from collections import deque

def oranges_rotting(grid):
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1
    minutes = 0
    while queue and fresh:
        for _ in range(len(queue)):
            r, c = queue.popleft()
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    queue.append((nr, nc))
        minutes += 1
    return -1 if fresh else minutes`,
  },
  'pacific-atlantic-water-flow': {
    approach: 'DFS upward from each ocean border; answer is cells reachable from both.',
    complexity: 'O(m*n) time, O(m*n) space',
    code: `def pacific_atlantic(heights):
    rows, cols = len(heights), len(heights[0])
    pacific, atlantic = set(), set()

    def dfs(r, c, visited, prev):
        if (r < 0 or c < 0 or r >= rows or c >= cols or
                (r, c) in visited or heights[r][c] < prev):
            return
        visited.add((r, c))
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            dfs(r + dr, c + dc, visited, heights[r][c])

    for c in range(cols):
        dfs(0, c, pacific, 0)
        dfs(rows - 1, c, atlantic, 0)
    for r in range(rows):
        dfs(r, 0, pacific, 0)
        dfs(r, cols - 1, atlantic, 0)
    return [list(cell) for cell in pacific & atlantic]`,
  },
  'surrounded-regions': {
    approach: 'Mark border-connected O regions safe via DFS, then flip the rest to X.',
    complexity: 'O(m*n) time, O(m*n) space',
    code: `def solve(board):
    if not board:
        return
    rows, cols = len(board), len(board[0])

    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or board[r][c] != 'O':
            return
        board[r][c] = 'S'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        dfs(r, 0)
        dfs(r, cols - 1)
    for c in range(cols):
        dfs(0, c)
        dfs(rows - 1, c)
    for r in range(rows):
        for c in range(cols):
            board[r][c] = 'O' if board[r][c] == 'S' else 'X'`,
  },
  'course-schedule': {
    approach: 'Topological sort via Kahn BFS; a valid order exists iff no cycle.',
    complexity: 'O(V+E) time, O(V+E) space',
    code: `from collections import deque

def can_finish(num_courses, prerequisites):
    graph = [[] for _ in range(num_courses)]
    indegree = [0] * num_courses
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        indegree[course] += 1
    queue = deque(i for i in range(num_courses) if indegree[i] == 0)
    seen = 0
    while queue:
        node = queue.popleft()
        seen += 1
        for nxt in graph[node]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                queue.append(nxt)
    return seen == num_courses`,
  },
  'course-schedule-ii': {
    approach: 'Kahn topological sort; return the order or empty list if a cycle exists.',
    complexity: 'O(V+E) time, O(V+E) space',
    code: `from collections import deque

def find_order(num_courses, prerequisites):
    graph = [[] for _ in range(num_courses)]
    indegree = [0] * num_courses
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        indegree[course] += 1
    queue = deque(i for i in range(num_courses) if indegree[i] == 0)
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for nxt in graph[node]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                queue.append(nxt)
    return order if len(order) == num_courses else []`,
  },
  'redundant-connection': {
    approach: 'Union-Find; the first edge joining already-connected nodes is redundant.',
    complexity: 'O(n * alpha(n)) time, O(n) space',
    code: `def find_redundant_connection(edges):
    parent = list(range(len(edges) + 1))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for a, b in edges:
        ra, rb = find(a), find(b)
        if ra == rb:
            return [a, b]
        parent[ra] = rb
    return []`,
  },
  'word-ladder': {
    approach: 'BFS over words using wildcard patterns as adjacency buckets.',
    complexity: 'O(N * L^2) time, O(N * L) space',
    code: `from collections import deque, defaultdict

def ladder_length(begin_word, end_word, word_list):
    words = set(word_list)
    if end_word not in words:
        return 0
    patterns = defaultdict(list)
    for word in words:
        for i in range(len(word)):
            patterns[word[:i] + '*' + word[i + 1:]].append(word)
    queue = deque([(begin_word, 1)])
    visited = {begin_word}
    while queue:
        word, steps = queue.popleft()
        if word == end_word:
            return steps
        for i in range(len(word)):
            key = word[:i] + '*' + word[i + 1:]
            for nxt in patterns[key]:
                if nxt not in visited:
                    visited.add(nxt)
                    queue.append((nxt, steps + 1))
            patterns[key] = []
    return 0`,
  },

  // ===== Backtracking =====
  'subsets': {
    approach: 'Backtrack including/excluding each index to enumerate all subsets.',
    complexity: 'O(n * 2^n) time, O(n) space',
    code: `def subsets(nums):
    result = []

    def backtrack(start, path):
        result.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()

    backtrack(0, [])
    return result`,
  },
  'combination-sum': {
    approach: 'Backtrack allowing reuse of each candidate until the target is met.',
    complexity: 'O(2^t) time, O(t) space',
    code: `def combination_sum(candidates, target):
    result = []

    def backtrack(start, remaining, path):
        if remaining == 0:
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            if candidates[i] <= remaining:
                path.append(candidates[i])
                backtrack(i, remaining - candidates[i], path)
                path.pop()

    backtrack(0, target, [])
    return result`,
  },
  'permutations': {
    approach: 'Backtrack swapping unused elements into each position.',
    complexity: 'O(n * n!) time, O(n) space',
    code: `def permute(nums):
    result = []

    def backtrack(path, used):
        if len(path) == len(nums):
            result.append(path[:])
            return
        for i in range(len(nums)):
            if not used[i]:
                used[i] = True
                path.append(nums[i])
                backtrack(path, used)
                path.pop()
                used[i] = False

    backtrack([], [False] * len(nums))
    return result`,
  },
  'subsets-ii': {
    approach: 'Sort, then backtrack skipping duplicate values at the same depth.',
    complexity: 'O(n * 2^n) time, O(n) space',
    code: `def subsets_with_dup(nums):
    nums.sort()
    result = []

    def backtrack(start, path):
        result.append(path[:])
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]:
                continue
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()

    backtrack(0, [])
    return result`,
  },
  'combination-sum-ii': {
    approach: 'Sort, backtrack using each item once, skipping same-level duplicates.',
    complexity: 'O(2^n) time, O(n) space',
    code: `def combination_sum2(candidates, target):
    candidates.sort()
    result = []

    def backtrack(start, remaining, path):
        if remaining == 0:
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            if i > start and candidates[i] == candidates[i - 1]:
                continue
            if candidates[i] > remaining:
                break
            path.append(candidates[i])
            backtrack(i + 1, remaining - candidates[i], path)
            path.pop()

    backtrack(0, target, [])
    return result`,
  },
  'word-search': {
    approach: 'DFS from each cell, marking visited in-place and backtracking.',
    complexity: 'O(m*n*4^L) time, O(L) space',
    code: `def exist(board, word):
    rows, cols = len(board), len(board[0])

    def dfs(r, c, i):
        if i == len(word):
            return True
        if (r < 0 or c < 0 or r >= rows or c >= cols or board[r][c] != word[i]):
            return False
        tmp = board[r][c]
        board[r][c] = '#'
        found = (dfs(r + 1, c, i + 1) or dfs(r - 1, c, i + 1) or
                 dfs(r, c + 1, i + 1) or dfs(r, c - 1, i + 1))
        board[r][c] = tmp
        return found

    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True
    return False`,
  },
  'palindrome-partitioning': {
    approach: 'Backtrack cutting prefixes that are palindromes, recursing on the rest.',
    complexity: 'O(n * 2^n) time, O(n) space',
    code: `def partition(s):
    result = []

    def is_pal(left, right):
        while left < right:
            if s[left] != s[right]:
                return False
            left += 1
            right -= 1
        return True

    def backtrack(start, path):
        if start == len(s):
            result.append(path[:])
            return
        for end in range(start, len(s)):
            if is_pal(start, end):
                path.append(s[start:end + 1])
                backtrack(end + 1, path)
                path.pop()

    backtrack(0, [])
    return result`,
  },
  'letter-combinations-of-a-phone-number': {
    approach: 'Backtrack over digit-to-letters mapping building each combination.',
    complexity: 'O(4^n * n) time, O(n) space',
    code: `def letter_combinations(digits):
    if not digits:
        return []
    mapping = {'2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
               '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'}
    result = []

    def backtrack(i, path):
        if i == len(digits):
            result.append(''.join(path))
            return
        for ch in mapping[digits[i]]:
            path.append(ch)
            backtrack(i + 1, path)
            path.pop()

    backtrack(0, [])
    return result`,
  },
  'n-queens': {
    approach: 'Backtrack column by column tracking used columns and both diagonals.',
    complexity: 'O(n!) time, O(n) space',
    code: `def solve_n_queens(n):
    result = []
    cols = set()
    diag1 = set()
    diag2 = set()
    board = [['.'] * n for _ in range(n)]

    def backtrack(r):
        if r == n:
            result.append([''.join(row) for row in board])
            return
        for c in range(n):
            if c in cols or (r - c) in diag1 or (r + c) in diag2:
                continue
            cols.add(c)
            diag1.add(r - c)
            diag2.add(r + c)
            board[r][c] = 'Q'
            backtrack(r + 1)
            board[r][c] = '.'
            cols.remove(c)
            diag1.remove(r - c)
            diag2.remove(r + c)

    backtrack(0)
    return result`,
  },

  // ===== Dynamic Programming =====
  'climbing-stairs': {
    approach: 'Bottom-up DP; each step equals the sum of the previous two (Fibonacci).',
    complexity: 'O(n) time, O(1) space',
    code: `def climb_stairs(n):
    a, b = 1, 1
    for _ in range(n):
        a, b = b, a + b
    return a`,
  },
  'min-cost-climbing-stairs': {
    approach: 'DP where each step cost is its own plus the cheaper of the prior two.',
    complexity: 'O(n) time, O(1) space',
    code: `def min_cost_climbing_stairs(cost):
    prev = curr = 0
    for i in range(2, len(cost) + 1):
        prev, curr = curr, min(curr + cost[i - 1], prev + cost[i - 2])
    return curr`,
  },
  'house-robber': {
    approach: 'DP: at each house take max of skipping or robbing it plus two back.',
    complexity: 'O(n) time, O(1) space',
    code: `def rob(nums):
    prev = curr = 0
    for num in nums:
        prev, curr = curr, max(curr, prev + num)
    return curr`,
  },
  'house-robber-ii': {
    approach: 'Run linear house robber twice, excluding either the first or last house.',
    complexity: 'O(n) time, O(1) space',
    code: `def rob(nums):
    if len(nums) == 1:
        return nums[0]

    def rob_line(houses):
        prev = curr = 0
        for num in houses:
            prev, curr = curr, max(curr, prev + num)
        return curr

    return max(rob_line(nums[1:]), rob_line(nums[:-1]))`,
  },
  'coin-change': {
    approach: 'Unbounded knapsack DP over amounts, minimizing coins for each value.',
    complexity: 'O(amount * coins) time, O(amount) space',
    code: `def coin_change(coins, amount):
    dp = [0] + [float('inf')] * amount
    for value in range(1, amount + 1):
        for coin in coins:
            if coin <= value:
                dp[value] = min(dp[value], dp[value - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
  },
  'longest-increasing-subsequence': {
    approach: 'Patience sorting: binary-search each value into a tails array.',
    complexity: 'O(n log n) time, O(n) space',
    code: `import bisect

def length_of_lis(nums):
    tails = []
    for num in nums:
        i = bisect.bisect_left(tails, num)
        if i == len(tails):
            tails.append(num)
        else:
            tails[i] = num
    return len(tails)`,
  },
  'longest-common-subsequence': {
    approach: '2D DP comparing prefixes; extend on match else take the better side.',
    complexity: 'O(m*n) time, O(n) space',
    code: `def longest_common_subsequence(text1, text2):
    prev = [0] * (len(text2) + 1)
    for i in range(1, len(text1) + 1):
        curr = [0] * (len(text2) + 1)
        for j in range(1, len(text2) + 1):
            if text1[i - 1] == text2[j - 1]:
                curr[j] = prev[j - 1] + 1
            else:
                curr[j] = max(prev[j], curr[j - 1])
        prev = curr
    return prev[-1]`,
  },
  'word-break': {
    approach: 'DP where dp[i] is true if some word ends at i with dp[start] true.',
    complexity: 'O(n^2) time, O(n) space',
    code: `def word_break(s, word_dict):
    words = set(word_dict)
    dp = [True] + [False] * len(s)
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in words:
                dp[i] = True
                break
    return dp[len(s)]`,
  },
  'decode-ways': {
    approach: 'DP counting decodings: combine single-digit and valid two-digit options.',
    complexity: 'O(n) time, O(1) space',
    code: `def num_decodings(s):
    if not s or s[0] == '0':
        return 0
    prev2, prev1 = 1, 1
    for i in range(1, len(s)):
        curr = 0
        if s[i] != '0':
            curr += prev1
        if 10 <= int(s[i - 1:i + 1]) <= 26:
            curr += prev2
        prev2, prev1 = prev1, curr
    return prev1`,
  },
  'unique-paths': {
    approach: 'DP row reduction summing left and above; equals a binomial coefficient.',
    complexity: 'O(m*n) time, O(n) space',
    code: `def unique_paths(m, n):
    row = [1] * n
    for _ in range(1, m):
        for j in range(1, n):
            row[j] += row[j - 1]
    return row[-1]`,
  },
  'triangle': {
    approach: 'Bottom-up DP collapsing each row into the minimum path sums below.',
    complexity: 'O(n^2) time, O(n) space',
    code: `def minimum_total(triangle):
    dp = triangle[-1][:]
    for row in range(len(triangle) - 2, -1, -1):
        for col in range(len(triangle[row])):
            dp[col] = triangle[row][col] + min(dp[col], dp[col + 1])
    return dp[0]`,
  },
  'perfect-squares': {
    approach: 'DP: fewest squares for n is one plus the best over each square subtracted.',
    complexity: 'O(n * sqrt(n)) time, O(n) space',
    code: `def num_squares(n):
    dp = [0] + [float('inf')] * n
    for i in range(1, n + 1):
        j = 1
        while j * j <= i:
            dp[i] = min(dp[i], dp[i - j * j] + 1)
            j += 1
    return dp[n]`,
  },
  'target-sum': {
    approach: 'Reduce to subset-sum count: find subsets summing to (total+target)/2.',
    complexity: 'O(n * sum) time, O(sum) space',
    code: `def find_target_sum_ways(nums, target):
    total = sum(nums)
    if abs(target) > total or (total + target) % 2 != 0:
        return 0
    subset = (total + target) // 2
    dp = [1] + [0] * subset
    for num in nums:
        for s in range(subset, num - 1, -1):
            dp[s] += dp[s - num]
    return dp[subset]`,
  },
  'partition-equal-subset-sum': {
    approach: 'Subset-sum DP checking if half the total is reachable (0/1 knapsack).',
    complexity: 'O(n * sum) time, O(sum) space',
    code: `def can_partition(nums):
    total = sum(nums)
    if total % 2 != 0:
        return False
    target = total // 2
    dp = set([0])
    for num in nums:
        dp |= {s + num for s in dp if s + num <= target}
        if target in dp:
            return True
    return target in dp`,
  },
  'best-time-to-buy-and-sell-stock-with-cooldown': {
    approach: 'State DP tracking hold, sold, and rest values transitioning each day.',
    complexity: 'O(n) time, O(1) space',
    code: `def max_profit(prices):
    hold = float('-inf')
    sold = 0
    rest = 0
    for price in prices:
        prev_sold = sold
        sold = hold + price
        hold = max(hold, rest - price)
        rest = max(rest, prev_sold)
    return max(sold, rest)`,
  },
  'coin-change-2': {
    approach: 'Unbounded knapsack counting combinations by iterating coins outermost.',
    complexity: 'O(amount * coins) time, O(amount) space',
    code: `def change(amount, coins):
    dp = [1] + [0] * amount
    for coin in coins:
        for value in range(coin, amount + 1):
            dp[value] += dp[value - coin]
    return dp[amount]`,
  },
  'edit-distance': {
    approach: '2D DP over prefixes taking the cheapest insert, delete, or replace.',
    complexity: 'O(m*n) time, O(n) space',
    code: `def min_distance(word1, word2):
    prev = list(range(len(word2) + 1))
    for i in range(1, len(word1) + 1):
        curr = [i] + [0] * len(word2)
        for j in range(1, len(word2) + 1):
            if word1[i - 1] == word2[j - 1]:
                curr[j] = prev[j - 1]
            else:
                curr[j] = 1 + min(prev[j], curr[j - 1], prev[j - 1])
        prev = curr
    return prev[-1]`,
  },

  // ===== Bit Manipulation & Math =====
  'single-number': {
    approach: 'XOR all numbers; pairs cancel leaving the unique element.',
    complexity: 'O(n) time, O(1) space',
    code: `def single_number(nums):
    result = 0
    for num in nums:
        result ^= num
    return result`,
  },
  'number-of-1-bits': {
    approach: 'Repeatedly clear the lowest set bit with n & (n-1), counting steps.',
    complexity: 'O(set bits) time, O(1) space',
    code: `def hamming_weight(n):
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count`,
  },
  'counting-bits': {
    approach: 'DP: bits[i] equals bits[i >> 1] plus the lowest bit of i.',
    complexity: 'O(n) time, O(n) space',
    code: `def count_bits(n):
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp`,
  },
  'reverse-bits': {
    approach: 'Shift result left and append the lowest input bit over 32 iterations.',
    complexity: 'O(1) time, O(1) space',
    code: `def reverse_bits(n):
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result`,
  },
  'missing-number': {
    approach: 'XOR all indices and values; the unmatched one is the missing number.',
    complexity: 'O(n) time, O(1) space',
    code: `def missing_number(nums):
    result = len(nums)
    for i, num in enumerate(nums):
        result ^= i ^ num
    return result`,
  },
  'sum-of-two-integers': {
    approach: 'Add without operators: XOR sums bits, AND-shift carries, mask to 32 bits.',
    complexity: 'O(1) time, O(1) space',
    code: `def get_sum(a, b):
    mask = 0xFFFFFFFF
    while b & mask:
        carry = (a & b) << 1
        a = a ^ b
        b = carry
    a &= mask
    return a if a <= 0x7FFFFFFF else ~(a ^ mask)`,
  },
  'plus-one': {
    approach: 'Scan right to left adding one, propagating carry; prepend if it overflows.',
    complexity: 'O(n) time, O(1) space',
    code: `def plus_one(digits):
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits`,
  },
  'powx-n': {
    approach: 'Fast exponentiation by squaring; invert the base for negative exponents.',
    complexity: 'O(log n) time, O(1) space',
    code: `def my_pow(x, n):
    if n < 0:
        x = 1 / x
        n = -n
    result = 1.0
    while n:
        if n & 1:
            result *= x
        x *= x
        n >>= 1
    return result`,
  },
}
