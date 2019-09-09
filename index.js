
var memoDb = {};
var scores = {};
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
    if (!scores[key])
        scores[key] = []
     for(var i=0;i<scores[key].length;i++){
        console.log(scores[key][i].value)
        console.log(value);
        if(scores[key][i].value==value)
            scores[key].splice(i,1);
    }
    scores[key].push({score,value});
    scores[key].sort(function(a, b){return a.score-b.score});
    return zMemoDb[key];
}
function zcard(key) {
    return Object.keys(zMemoDb[key]).length;
}
function zrank(key, value) {
    // return scores[key]
    for(var i=0;i<scores[key].length;i++){
        console.log(scores[key][i].value)
        console.log(value);
        if(scores[key][i].value==value)
            return i
    }
}
function zrange(key, start, stop) {
    let array =[];
    if(stop>scores[key].length)
        stop =scores[key].length
    for(var i=start;i<scores[key].length;i++){
        array.push(scores[key][i].value)
    }
    return array;
}


