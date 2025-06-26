MOD = 10**9 + 7
MAX_N = 2 * 10**5

fact = [1] * (MAX_N + 1)
invFact = [1] * (MAX_N + 1)

def precompute_factorials():
    for i in range(2, MAX_N + 1):
        fact[i] = (fact[i-1] * i) % MOD
    
    invFact[MAX_N] = pow(fact[MAX_N], MOD - 2, MOD)
    for i in range(MAX_N - 1, 1, -1):
        invFact[i] = (invFact[i+1] * (i + 1)) % MOD

def nCr(n, r):
    if r < 0 or r > n:
        return 0
    numerator = fact[n]
    denominator = (invFact[r] * invFact[n - r]) % MOD
    return (numerator * denominator) % MOD

# Precompute factorials once at the beginning
precompute_factorials()

def solve():
    n, k = map(int, input().split())
    s = list(map(int, input().split()))

    n_zeros = 0
    n_ones = 0
    for x in s:
        if x == 0:
            n_zeros += 1
        else:
            n_ones += 1

    mid = (k + 1) // 2
    
    total_median_sum = 0

    # Iterate through the number of 1s in the subsequence
    # The median is 1 if num_ones >= mid
    for num_ones in range(mid, min(k, n_ones) + 1):
        num_zeros_needed = k - num_ones
        
        # Check if the number of zeros needed is valid
        if num_zeros_needed >= 0 and num_zeros_needed <= n_zeros:
            ways_to_choose_ones = nCr(n_ones, num_ones)
            ways_to_choose_zeros = nCr(n_zeros, num_zeros_needed)
            
            count_subsequences = (ways_to_choose_ones * ways_to_choose_zeros) % MOD
            total_median_sum = (total_median_sum + count_subsequences) % MOD
            
    print(total_median_sum)

t = int(input())
for _ in range(t):
    solve()