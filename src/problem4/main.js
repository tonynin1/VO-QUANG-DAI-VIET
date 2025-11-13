// Provide 3 unique implementations of the following function in TypeScript.
// - Comment on the complexity or efficiency of each function.
// **Input**: `n` - any integer
// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
// Implementation 1: Iterative Approach
function sum_to_n_a(n) {
    var sum = 0;
    for (var i = 1; i <= n; i++)
        sum += i;
    return sum;
}
// Complexity: O(n) time complexity due to the loop iterating n times. O(1) space complexity as it uses a constant amount of space.
// Implementation 2: Mathematical Formula
function sum_to_n_b(n) {
    return (n * (n + 1)) / 2;
}
// Complexity: O(1) time complexity since it performs a constant number of operations regardless of n. O(1) space complexity as it uses a constant amount of space.
// Implementation 3: Recursive Approach
function sum_to_n_c(n) {
    if (n < 0)
        throw new Error("Input must be a non-negative integer");
    if (n <= 1)
        return n;
    return n + sum_to_n_c(n - 1);
}
// Complexity: O(n) time complexity due to the recursive calls. O(n) space complexity because of the call stack.
// Example usage:
console.log(sum_to_n_a(5)); // Output: 15
console.log(sum_to_n_b(5)); // Output: 15
console.log(sum_to_n_c(5)); // Output: 15
