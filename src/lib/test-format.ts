import { formatEpisodeTitle } from "./formatTitle";

// Test cases
console.log("Test 1:", formatEpisodeTitle("S2E15: Building Great Teams"));
console.log("Expected: Building Great Teams");
console.log("");

console.log(
  "Test 2:",
  formatEpisodeTitle("S3E12: Unpacking the Power of Purpose")
);
console.log("Expected: Unpacking the Power of Purpose");
console.log("");

console.log("Test 3:", formatEpisodeTitle("Building Great Teams"));
console.log("Expected: Building Great Teams");
console.log("");

console.log("Test 4:", formatEpisodeTitle(""));
console.log("Expected: (empty string)");
console.log("");

console.log("Test 5:", formatEpisodeTitle(undefined));
console.log("Expected: (empty string)");
console.log("");
