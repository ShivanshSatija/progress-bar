// Optimal Python solutions — Part 1
export const PART1 = {
  // ---------- Arrays ----------
  'two-sum': {
    approach: 'Hash map storing value -> index; check complement in one pass.',
    complexity: 'O(n) time, O(n) space',
    explanation: [
      'Walk through the array once.',
      'For each number compute target minus it.',
      'If complement was seen, return both indices.',
      'Otherwise store the number with its index.',
    ],
    code: `def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        if target - x in seen:
            return [seen[target - x], i]
        seen[x] = i
    return []`,
  },
  'best-time-to-buy-and-sell-stock': {
    approach: 'Track the minimum price so far and the best profit selling today.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Track the lowest price seen so far.',
      'For each day compute profit versus that low.',
      'Keep the best profit found.',
    ],
    code: `def max_profit(prices):
    min_price = float('inf')
    best = 0
    for p in prices:
        if p < min_price:
            min_price = p
        elif p - min_price > best:
            best = p - min_price
    return best`,
  },
  'contains-duplicate': {
    approach: 'Compare the size of a set of the elements against the list length.',
    complexity: 'O(n) time, O(n) space',
    explanation: [
      'Build a set from the list.',
      'A set drops duplicate values.',
      'Different lengths mean a duplicate existed.',
    ],
    code: `def contains_duplicate(nums):
    return len(set(nums)) != len(nums)`,
  },
  'move-zeroes': {
    approach: 'Two pointers: write index advances only on non-zero, then fill zeros.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Keep a write pointer for non-zeros.',
      'Swap each non-zero into the write slot.',
      'Zeros naturally drift to the end.',
    ],
    code: `def move_zeroes(nums):
    last = 0
    for i in range(len(nums)):
        if nums[i] != 0:
            nums[last], nums[i] = nums[i], nums[last]
            last += 1
    return nums`,
  },
  'maximum-subarray': {
    approach: 'Kadane: extend the running sum or restart from the current element.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Either extend the running sum or restart.',
      'Restart when the element alone is bigger.',
      'Track the best sum seen overall.',
    ],
    code: `def max_sub_array(nums):
    best = cur = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best`,
  },
  'product-of-array-except-self': {
    approach: 'Prefix products pass then suffix products pass without division.',
    complexity: 'O(n) time, O(1) extra space',
    explanation: [
      'First pass stores product of left elements.',
      'Second pass multiplies by product of right elements.',
      'No division needed.',
    ],
    code: `def product_except_self(nums):
    n = len(nums)
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= suffix
        suffix *= nums[i]
    return res`,
  },
  'maximum-product-subarray': {
    approach: 'Track running max and min products since a negative flips them.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Track both running max and min products.',
      'A negative number swaps which is largest.',
      'Best comes from element, max times it, or min times it.',
    ],
    code: `def max_product(nums):
    best = cur_max = cur_min = nums[0]
    for x in nums[1:]:
        candidates = (x, cur_max * x, cur_min * x)
        cur_max = max(candidates)
        cur_min = min(candidates)
        best = max(best, cur_max)
    return best`,
  },
  'find-minimum-in-rotated-sorted-array': {
    approach: 'Binary search comparing mid to the right end to pick the side.',
    complexity: 'O(log n) time, O(1) space',
    explanation: [
      'Binary search comparing mid to the right end.',
      'If mid is bigger, minimum lies to the right.',
      'Otherwise minimum is mid or left of it.',
      'Converge until lo equals hi.',
    ],
    code: `def find_min(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1
        else:
            hi = mid
    return nums[lo]`,
  },
  'merge-intervals': {
    approach: 'Sort by start, then extend or append based on overlap.',
    complexity: 'O(n log n) time, O(n) space',
    explanation: [
      'Sort intervals by start.',
      'If current overlaps the last, extend its end.',
      'Otherwise append it as a new interval.',
    ],
    code: `def merge(intervals):
    intervals.sort()
    res = []
    for s, e in intervals:
        if res and s <= res[-1][1]:
            res[-1][1] = max(res[-1][1], e)
        else:
            res.append([s, e])
    return res`,
  },
  'insert-interval': {
    approach: 'Add intervals before, merge all overlapping, then add the rest.',
    complexity: 'O(n) time, O(n) space',
    explanation: [
      'Copy intervals ending before the new one.',
      'Merge all that overlap the new interval.',
      'Append the merged interval then the rest.',
    ],
    code: `def insert(intervals, new_interval):
    res = []
    i, n = 0, len(intervals)
    while i < n and intervals[i][1] < new_interval[0]:
        res.append(intervals[i])
        i += 1
    while i < n and intervals[i][0] <= new_interval[1]:
        new_interval[0] = min(new_interval[0], intervals[i][0])
        new_interval[1] = max(new_interval[1], intervals[i][1])
        i += 1
    res.append(new_interval)
    while i < n:
        res.append(intervals[i])
        i += 1
    return res`,
  },
  'rotate-array': {
    approach: 'Reverse whole array, then reverse the two parts split at k.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Reduce k modulo length.',
      'Reverse the entire array.',
      'Reverse first k, then reverse the rest.',
    ],
    code: `def rotate(nums, k):
    n = len(nums)
    k %= n

    def reverse(lo, hi):
        while lo < hi:
            nums[lo], nums[hi] = nums[hi], nums[lo]
            lo += 1
            hi -= 1

    reverse(0, n - 1)
    reverse(0, k - 1)
    reverse(k, n - 1)
    return nums`,
  },
  'set-matrix-zeroes': {
    approach: 'Use first row/column as markers, with a flag for the first column.',
    complexity: 'O(m*n) time, O(1) space',
    explanation: [
      'Use first row and column as zero markers.',
      'A separate flag handles the first column.',
      'Zero out cells whose marker is set.',
      'Finally zero the first row and column.',
    ],
    code: `def set_zeroes(matrix):
    rows, cols = len(matrix), len(matrix[0])
    first_col = False
    for r in range(rows):
        if matrix[r][0] == 0:
            first_col = True
        for c in range(1, cols):
            if matrix[r][c] == 0:
                matrix[r][0] = 0
                matrix[0][c] = 0
    for r in range(1, rows):
        for c in range(1, cols):
            if matrix[r][0] == 0 or matrix[0][c] == 0:
                matrix[r][c] = 0
    if matrix[0][0] == 0:
        for c in range(cols):
            matrix[0][c] = 0
    if first_col:
        for r in range(rows):
            matrix[r][0] = 0
    return matrix`,
  },
  'spiral-matrix': {
    approach: 'Maintain four shrinking boundaries and walk layer by layer.',
    complexity: 'O(m*n) time, O(1) extra space',
    explanation: [
      'Keep four boundaries: top, bottom, left, right.',
      'Walk right, down, left, up each layer.',
      'Shrink the boundary after each direction.',
    ],
    code: `def spiral_order(matrix):
    res = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            res.append(matrix[top][c])
        top += 1
        for r in range(top, bottom + 1):
            res.append(matrix[r][right])
        right -= 1
        if top <= bottom:
            for c in range(right, left - 1, -1):
                res.append(matrix[bottom][c])
            bottom -= 1
        if left <= right:
            for r in range(bottom, top - 1, -1):
                res.append(matrix[r][left])
            left += 1
    return res`,
  },
  'rotate-image': {
    approach: 'Transpose the matrix in place, then reverse each row.',
    complexity: 'O(n^2) time, O(1) space',
    explanation: [
      'Transpose by swapping across the diagonal.',
      'Then reverse each row in place.',
      'Result is a 90-degree clockwise rotation.',
    ],
    code: `def rotate(matrix):
    n = len(matrix)
    for r in range(n):
        for c in range(r + 1, n):
            matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]
    for row in matrix:
        row.reverse()
    return matrix`,
  },
  '3sum': {
    approach: 'Sort, then for each anchor use two pointers, skipping duplicates.',
    complexity: 'O(n^2) time, O(1) extra space',
    explanation: [
      'Sort the array first.',
      'Fix an anchor, two pointers scan the rest.',
      'Move pointers based on the triplet sum.',
      'Skip duplicates to avoid repeats.',
    ],
    code: `def three_sum(nums):
    nums.sort()
    res = []
    n = len(nums)
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        if nums[i] > 0:
            break
        lo, hi = i + 1, n - 1
        while lo < hi:
            total = nums[i] + nums[lo] + nums[hi]
            if total < 0:
                lo += 1
            elif total > 0:
                hi -= 1
            else:
                res.append([nums[i], nums[lo], nums[hi]])
                lo += 1
                hi -= 1
                while lo < hi and nums[lo] == nums[lo - 1]:
                    lo += 1
                while lo < hi and nums[hi] == nums[hi + 1]:
                    hi -= 1
    return res`,
  },

  // ---------- Strings ----------
  'valid-anagram': {
    approach: 'Compare character frequency counts of both strings.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Count letter frequencies of each string.',
      'Anagrams have identical frequency counts.',
      'Compare the two Counters directly.',
    ],
    code: `from collections import Counter


def is_anagram(s, t):
    return Counter(s) == Counter(t)`,
  },
  'valid-palindrome': {
    approach: 'Two pointers skipping non-alphanumerics, comparing lowercased chars.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Two pointers move from both ends.',
      'Skip any non-alphanumeric characters.',
      'Compare lowercased characters; mismatch fails.',
    ],
    code: `def is_palindrome(s):
    lo, hi = 0, len(s) - 1
    while lo < hi:
        while lo < hi and not s[lo].isalnum():
            lo += 1
        while lo < hi and not s[hi].isalnum():
            hi -= 1
        if s[lo].lower() != s[hi].lower():
            return False
        lo += 1
        hi -= 1
    return True`,
  },
  'valid-parentheses': {
    approach: 'Push opens onto a stack and match each close against the top.',
    complexity: 'O(n) time, O(n) space',
    explanation: [
      'Push opening brackets onto a stack.',
      'For each close, pop and check it matches.',
      'Valid only if the stack ends empty.',
    ],
    code: `def is_valid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for ch in s:
        if ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
        else:
            stack.append(ch)
    return not stack`,
  },
  'longest-common-prefix': {
    approach: 'Compare min and max strings; their common prefix bounds all others.',
    complexity: 'O(S) time, O(1) space',
    explanation: [
      'Take the lexicographic min and max strings.',
      'Their common prefix bounds every string.',
      'Compare characters until they differ.',
    ],
    code: `def longest_common_prefix(strs):
    if not strs:
        return ''
    lo = min(strs)
    hi = max(strs)
    i = 0
    while i < len(lo) and lo[i] == hi[i]:
        i += 1
    return lo[:i]`,
  },
  'find-the-index-of-the-first-occurrence-in-a-string': {
    approach: 'KMP using a failure table for linear-time substring search.',
    complexity: 'O(n + m) time, O(m) space',
    explanation: [
      'Build the needle failure (LPS) table.',
      'Scan haystack, advancing matches in needle.',
      'On mismatch, jump back via the LPS table.',
      'Return start index when full needle matches.',
    ],
    code: `def str_str(haystack, needle):
    if not needle:
        return 0
    m = len(needle)
    lps = [0] * m
    length = 0
    i = 1
    while i < m:
        if needle[i] == needle[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length:
            length = lps[length - 1]
        else:
            lps[i] = 0
            i += 1
    j = 0
    for i in range(len(haystack)):
        while j and haystack[i] != needle[j]:
            j = lps[j - 1]
        if haystack[i] == needle[j]:
            j += 1
            if j == m:
                return i - m + 1
    return -1`,
  },
  'string-to-integer-atoi': {
    approach: 'Skip spaces, read optional sign, accumulate digits, then clamp to 32-bit.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Skip leading spaces.',
      'Read an optional plus or minus sign.',
      'Accumulate digits into the number.',
      'Apply sign then clamp to 32-bit range.',
    ],
    code: `def my_atoi(s):
    i, n = 0, len(s)
    while i < n and s[i] == ' ':
        i += 1
    sign = 1
    if i < n and s[i] in '+-':
        if s[i] == '-':
            sign = -1
        i += 1
    num = 0
    while i < n and s[i].isdigit():
        num = num * 10 + int(s[i])
        i += 1
    num *= sign
    return max(-2**31, min(2**31 - 1, num))`,
  },
  'group-anagrams': {
    approach: 'Bucket words by their sorted-character signature in a dict.',
    complexity: 'O(n*k log k) time, O(n*k) space',
    explanation: [
      'Sort each word to form a signature key.',
      'Anagrams share the same sorted key.',
      'Group words by key in a dict.',
    ],
    code: `from collections import defaultdict


def group_anagrams(strs):
    groups = defaultdict(list)
    for word in strs:
        key = ''.join(sorted(word))
        groups[key].append(word)
    return list(groups.values())`,
  },
  'longest-substring-without-repeating-characters': {
    approach: 'Sliding window tracking last seen index to jump the left bound.',
    complexity: 'O(n) time, O(min(n, charset)) space',
    explanation: [
      'Track each character last seen index.',
      'On a repeat inside the window, jump left.',
      'Record the longest window length.',
    ],
    code: `def length_of_longest_substring(s):
    last = {}
    left = 0
    best = 0
    for right, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1
        last[ch] = right
        best = max(best, right - left + 1)
    return best`,
  },
  'longest-repeating-character-replacement': {
    approach: 'Window valid while size minus max char count stays within k.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Expand window, counting each character.',
      'Track the most frequent char count.',
      'Shrink when others exceed k replacements.',
      'Best window length is the answer.',
    ],
    code: `from collections import defaultdict


def character_replacement(s, k):
    counts = defaultdict(int)
    left = 0
    max_freq = 0
    best = 0
    for right in range(len(s)):
        counts[s[right]] += 1
        max_freq = max(max_freq, counts[s[right]])
        while (right - left + 1) - max_freq > k:
            counts[s[left]] -= 1
            left += 1
        best = max(best, right - left + 1)
    return best`,
  },
  'longest-palindromic-substring': {
    approach: 'Expand around each center for odd and even length palindromes.',
    complexity: 'O(n^2) time, O(1) space',
    explanation: [
      'Treat each index as a palindrome center.',
      'Expand outward for odd and even cases.',
      'Keep the longest span found.',
    ],
    code: `def longest_palindrome(s):
    if not s:
        return ''
    start, end = 0, 0

    def expand(lo, hi):
        while lo >= 0 and hi < len(s) and s[lo] == s[hi]:
            lo -= 1
            hi += 1
        return lo + 1, hi - 1

    for i in range(len(s)):
        for lo, hi in (expand(i, i), expand(i, i + 1)):
            if hi - lo > end - start:
                start, end = lo, hi
    return s[start:end + 1]`,
  },
  'palindromic-substrings': {
    approach: 'Count palindromes by expanding around every odd and even center.',
    complexity: 'O(n^2) time, O(1) space',
    explanation: [
      'Expand around every odd and even center.',
      'Count each palindrome found while expanding.',
      'Sum all counts across centers.',
    ],
    code: `def count_substrings(s):
    n = len(s)
    total = 0

    def expand(lo, hi):
        count = 0
        while lo >= 0 and hi < n and s[lo] == s[hi]:
            count += 1
            lo -= 1
            hi += 1
        return count

    for i in range(n):
        total += expand(i, i) + expand(i, i + 1)
    return total`,
  },
  'minimum-window-substring': {
    approach: 'Expand a window to cover all needed chars, then shrink to minimize.',
    complexity: 'O(n + m) time, O(charset) space',
    explanation: [
      'Count characters needed from t.',
      'Expand right until all are covered.',
      'Shrink left to minimize the window.',
      'Track the smallest valid window.',
    ],
    code: `from collections import Counter


def min_window(s, t):
    if not t or not s:
        return ''
    need = Counter(t)
    missing = len(t)
    left = 0
    best = (float('inf'), 0, 0)
    for right, ch in enumerate(s):
        if need[ch] > 0:
            missing -= 1
        need[ch] -= 1
        while missing == 0:
            if right - left < best[0]:
                best = (right - left, left, right)
            need[s[left]] += 1
            if need[s[left]] > 0:
                missing += 1
            left += 1
    return '' if best[0] == float('inf') else s[best[1]:best[2] + 1]`,
  },

  // ---------- Hash Maps ----------
  'majority-element': {
    approach: 'Boyer-Moore voting maintains a candidate and a count.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Hold a candidate and a counter.',
      'Pick a new candidate when count hits zero.',
      'Increment or decrement based on match.',
      'Surviving candidate is the majority.',
    ],
    code: `def majority_element(nums):
    count = 0
    candidate = None
    for x in nums:
        if count == 0:
            candidate = x
        count += 1 if x == candidate else -1
    return candidate`,
  },
  'ransom-note': {
    approach: 'Count magazine letters and ensure each note letter is available.',
    complexity: 'O(n + m) time, O(1) space',
    explanation: [
      'Count letters in note and magazine.',
      'Subtract magazine counts from the note.',
      'Empty result means every letter was available.',
    ],
    code: `from collections import Counter


def can_construct(ransom_note, magazine):
    return not (Counter(ransom_note) - Counter(magazine))`,
  },
  'valid-sudoku': {
    approach: 'Track seen values per row, column, and 3x3 box in sets.',
    complexity: 'O(1) time, O(1) space',
    explanation: [
      'Build unique keys per row, column, box.',
      'Add each filled value as three keys.',
      'A repeated key means an invalid board.',
    ],
    code: `def is_valid_sudoku(board):
    seen = set()
    for r in range(9):
        for c in range(9):
            v = board[r][c]
            if v == '.':
                continue
            keys = ((r, v, 'row'), (v, c, 'col'), (r // 3, c // 3, v))
            for key in keys:
                if key in seen:
                    return False
                seen.add(key)
    return True`,
  },
  'top-k-frequent-elements': {
    approach: 'Count frequencies, then bucket by count and read the top k.',
    complexity: 'O(n) time, O(n) space',
    explanation: [
      'Count each number frequency.',
      'Bucket numbers by their frequency.',
      'Read buckets high to low for top k.',
    ],
    code: `from collections import Counter


def top_k_frequent(nums, k):
    counts = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in counts.items():
        buckets[freq].append(num)
    res = []
    for freq in range(len(buckets) - 1, 0, -1):
        for num in buckets[freq]:
            res.append(num)
            if len(res) == k:
                return res
    return res`,
  },
  'subarray-sum-equals-k': {
    approach: 'Count prefix sums; add occurrences of prefix minus k seen so far.',
    complexity: 'O(n) time, O(n) space',
    explanation: [
      'Track running prefix sum.',
      'Count how often each prefix occurred.',
      'Add count of prefix minus k each step.',
    ],
    code: `from collections import defaultdict


def subarray_sum(nums, k):
    counts = defaultdict(int)
    counts[0] = 1
    prefix = 0
    res = 0
    for x in nums:
        prefix += x
        res += counts[prefix - k]
        counts[prefix] += 1
    return res`,
  },
  'longest-consecutive-sequence': {
    approach: 'Use a set and only start counting from a sequence start value.',
    complexity: 'O(n) time, O(n) space',
    explanation: [
      'Put all numbers into a set.',
      'Only start counting at a sequence start.',
      'Walk upward counting consecutive numbers.',
      'Keep the longest run found.',
    ],
    code: `def longest_consecutive(nums):
    num_set = set(nums)
    best = 0
    for x in num_set:
        if x - 1 not in num_set:
            length = 1
            while x + length in num_set:
                length += 1
            best = max(best, length)
    return best`,
  },

  // ---------- Two Pointers ----------
  'remove-duplicates-from-sorted-array': {
    approach: 'Slow pointer writes the next unique value found by the fast pointer.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Slow pointer marks last unique value.',
      'Fast pointer scans for a new value.',
      'Write new values just after slow.',
      'Return slow plus one as the count.',
    ],
    code: `def remove_duplicates(nums):
    if not nums:
        return 0
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1`,
  },
  'two-sum-ii-input-array-is-sorted': {
    approach: 'Two pointers move inward based on the sum versus target.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Two pointers start at both ends.',
      'If sum is low, move left pointer right.',
      'If sum is high, move right pointer left.',
      'Return indices when the sum matches.',
    ],
    code: `def two_sum(numbers, target):
    lo, hi = 0, len(numbers) - 1
    while lo < hi:
        total = numbers[lo] + numbers[hi]
        if total == target:
            return [lo + 1, hi + 1]
        if total < target:
            lo += 1
        else:
            hi -= 1
    return []`,
  },
  'container-with-most-water': {
    approach: 'Two pointers from the ends, moving the shorter wall inward.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Two pointers at the far ends.',
      'Area uses width times shorter wall.',
      'Move the shorter wall inward each step.',
      'Track the largest area seen.',
    ],
    code: `def max_area(height):
    lo, hi = 0, len(height) - 1
    best = 0
    while lo < hi:
        best = max(best, (hi - lo) * min(height[lo], height[hi]))
        if height[lo] < height[hi]:
            lo += 1
        else:
            hi -= 1
    return best`,
  },
  '3sum-closest': {
    approach: 'Sort, then for each anchor use two pointers tracking the closest sum.',
    complexity: 'O(n^2) time, O(1) space',
    explanation: [
      'Sort the array.',
      'Fix an anchor, two pointers scan the rest.',
      'Track the sum closest to target.',
      'Move pointers toward the target.',
    ],
    code: `def three_sum_closest(nums, target):
    nums.sort()
    n = len(nums)
    closest = nums[0] + nums[1] + nums[2]
    for i in range(n - 2):
        lo, hi = i + 1, n - 1
        while lo < hi:
            total = nums[i] + nums[lo] + nums[hi]
            if abs(total - target) < abs(closest - target):
                closest = total
            if total < target:
                lo += 1
            elif total > target:
                hi -= 1
            else:
                return total
    return closest`,
  },
  'trapping-rain-water': {
    approach: 'Two pointers tracking left/right maxes; fill from the lower side.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Two pointers track left and right maxes.',
      'Process the side with the lower wall.',
      'Add trapped water above each bar.',
    ],
    code: `def trap(height):
    lo, hi = 0, len(height) - 1
    left_max = right_max = 0
    water = 0
    while lo < hi:
        if height[lo] < height[hi]:
            left_max = max(left_max, height[lo])
            water += left_max - height[lo]
            lo += 1
        else:
            right_max = max(right_max, height[hi])
            water += right_max - height[hi]
            hi -= 1
    return water`,
  },

  // ---------- Sliding Window ----------
  'maximum-average-subarray-i': {
    approach: 'Maintain a fixed-size window sum and track its maximum.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Sum the first k elements.',
      'Slide by adding new and dropping old.',
      'Track the maximum window sum.',
      'Divide the best sum by k.',
    ],
    code: `def find_max_average(nums, k):
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i - k]
        best = max(best, window)
    return best / k`,
  },
  'minimum-size-subarray-sum': {
    approach: 'Grow the window, shrinking from the left while the sum meets target.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Grow the window adding each element.',
      'While sum meets target, record length.',
      'Shrink from the left to minimize.',
    ],
    code: `def min_sub_array_len(target, nums):
    left = 0
    total = 0
    best = float('inf')
    for right in range(len(nums)):
        total += nums[right]
        while total >= target:
            best = min(best, right - left + 1)
            total -= nums[left]
            left += 1
    return 0 if best == float('inf') else best`,
  },
  'permutation-in-string': {
    approach: 'Slide a fixed window and compare its char counts to the pattern.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Count characters needed from s1.',
      'Slide a fixed-size window over s2.',
      'Add right char, drop left char each step.',
      'Match when window counts equal need.',
    ],
    code: `from collections import Counter


def check_inclusion(s1, s2):
    if len(s1) > len(s2):
        return False
    need = Counter(s1)
    window = Counter(s2[:len(s1)])
    if window == need:
        return True
    for i in range(len(s1), len(s2)):
        window[s2[i]] += 1
        left = s2[i - len(s1)]
        window[left] -= 1
        if window[left] == 0:
            del window[left]
        if window == need:
            return True
    return False`,
  },
  'find-all-anagrams-in-a-string': {
    approach: 'Slide a fixed window, comparing its counts to the pattern counts.',
    complexity: 'O(n) time, O(1) space',
    explanation: [
      'Count characters needed from p.',
      'Slide a fixed-size window over s.',
      'Add right char, drop left char each step.',
      'Record index when counts match need.',
    ],
    code: `from collections import Counter


def find_anagrams(s, p):
    if len(p) > len(s):
        return []
    need = Counter(p)
    window = Counter(s[:len(p)])
    res = []
    if window == need:
        res.append(0)
    for i in range(len(p), len(s)):
        window[s[i]] += 1
        left = s[i - len(p)]
        window[left] -= 1
        if window[left] == 0:
            del window[left]
        if window == need:
            res.append(i - len(p) + 1)
    return res`,
  },
  'sliding-window-maximum': {
    approach: 'Monotonic deque of indices holding candidates in decreasing order.',
    complexity: 'O(n) time, O(k) space',
    explanation: [
      'Deque holds indices in decreasing value.',
      'Pop smaller values before adding each index.',
      'Drop the front when it leaves the window.',
      'Front index is the current window max.',
    ],
    code: `from collections import deque


def max_sliding_window(nums, k):
    dq = deque()
    res = []
    for i, x in enumerate(nums):
        while dq and nums[dq[-1]] < x:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            res.append(nums[dq[0]])
    return res`,
  },
}
