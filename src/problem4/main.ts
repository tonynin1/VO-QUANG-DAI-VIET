// Implementation 1: Iterative Approach
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n ; i++) sum += i;
    return sum;
}

// Complexity: O(n) time complexity due to the loop iterating n times. O(1) space complexity as it uses a constant amount of space.

// Implementation 2: Mathematical Formula
function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}

// Complexity: O(1) time complexity since it performs a constant number of operations regardless of n. O(1) space complexity as it uses a constant amount of space.

// Implementation 3: Recursive Approach
function sum_to_n_c(n: number): number {
    if (n < 0) throw new Error("Input must be a non-negative integer");
    if (n <= 1) return n;
    return n + sum_to_n_c(n - 1);
}
// Complexity: O(n) time complexity due to the recursive calls. O(n) space complexity because of the call stack.

// Example usage:
console.log(sum_to_n_a(5)); // Output: 15
console.log(sum_to_n_b(5)); // Output: 15
console.log(sum_to_n_c(5)); // Output: 15
