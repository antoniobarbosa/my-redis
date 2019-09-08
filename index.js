
var memoDb = {};
var zMemoDb = {};
var expirationMemoDb = {};

function set(key, value, expiration) {
    if (expiration)
        expirationMemoDb[key] = { expiration: expiration, createdAt: new Date() };
    memoDb[key] = value;
}
function get(key) {
    return memoDb[key] ? memoDb[key] : null;
}

function del(key) {
    delete memoDb[key];
}
function dbsize() {
    return Object.keys(memoDb).length;
}
function incr(key) {
    if (!memoDb[key])
        memoDb[key] = 0;
    else
        memoDb[key]++
    return memoDb[key];
}
function zAdd(key, score, value) {
    if (!zMemoDb[key])
        zMemoDb[key] = [];
    zMemoDb[key][value]=score;
    return zMemoDb[key];
}
function zcard(key) {
    return Object.keys(zMemoDb[key]).length;
}
console.log(dbsize())

console.log(zAdd("teste", 1, "one"));
console.log(zAdd("teste", 1, "two"));
console.log(zAdd("teste", 1, "three"));
console.log(zAdd("teste", 2, "one"));
console.log(zcard("teste"));