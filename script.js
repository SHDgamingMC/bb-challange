const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const MOD = 1e9 + 7;
const MAX = 200005;

let fact = new Array(MAX).fill(1);
let invFact = new Array(MAX).fill(1);


function power(x, y, mod) {
    let res = 1;
    x = x % mod;
    while (y > 0) {
        if (y % 2 === 1) {
            res = (res * x) % mod;
        }
        y = Math.floor(y / 2);
        x = (x * x) % mod;
    }
    return res;
}


for (let i = 1; i < MAX; i++) {
    fact[i] = (fact[i - 1] * i) % MOD;
}
invFact[MAX - 1] = power(fact[MAX - 1], MOD - 2, MOD);
for (let i = MAX - 2; i >= 0; i--) {
    invFact[i] = (invFact[i + 1] * (i + 1)) % MOD;
}


function comb(n, r) {
    if (r > n || r < 0) return 0;
    return (((fact[n] * invFact[r]) % MOD) * invFact[n - r]) % MOD;
}

let inputLines = [];
rl.on('line', function (line) {
    inputLines.push(line.trim());
});

rl.on('close', function () {
    let t = parseInt(inputLines[0]);
    let idx = 1;

    for (let test = 0; test < t; test++) {
        let [n, k] = inputLines[idx++].split(' ').map(Number);
        let arr = inputLines[idx++].split(' ').map(Number);
        let count1 = arr.filter(x => x === 1).length;
        let count0 = n - count1;

        let minOnes = Math.floor(k / 2) + 1;
        let sum = 0;

        for (let ones = minOnes; ones <= k; ones++) {
            let zeros = k - ones;
            let ways = (comb(count1, ones) * comb(count0, zeros)) % MOD;
            sum = (sum + ways) % MOD;
        }

        console.log(sum);
    }
});
