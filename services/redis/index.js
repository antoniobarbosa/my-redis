


var memoDb = {};
var scores = {};
var zMemoDb = {};
var expirationMemoDb = {};

function set(key, value, expiration) {
    return new Promise((resolve,reject)=>{ 
        if (expiration)
            expirationMemoDb[key] = { expiration: expiration, createdAt: new Date() };
        memoDb[key] = value;    
        resolve("OK")
    });
}
function get(key) {
    return new Promise((resolve,reject)=>{ 
        resolve( memoDb[key] ? memoDb[key] : null);
    });
}

function del(key) {
    return new Promise((resolve,reject)=>{ 
        resolve(delete memoDb[key])
    });
}
function dbsize() {
    return new Promise((resolve,reject)=>{ 
        resolve( Object.keys(memoDb).length)
    });
}
function incr(key) {
    if (!memoDb[key]&&memoDb[key]!=0)
        memoDb[key] = 0;
    else
        memoDb[key]++

        return new Promise((resolve,reject)=>{ 
            resolve(memoDb[key]);
        });
}
function zAdd(key, score, value) {
    if (!zMemoDb[key])
        zMemoDb[key] = [];
    if (!scores[key])
        scores[key] = []

    zMemoDb[key][value] = score ;
     for(var i=0;i<scores[key].length;i++){
        if(scores[key][i].value==value)
            scores[key].splice(i,1);
    }
    scores[key].push({score,value});
    scores[key].sort(function(a, b){return a.score-b.score});
    return new Promise((resolve,reject)=>{ 
        resolve(zMemoDb[key]);
    })
}
function zCard(key) {
    return new Promise((resolve,reject)=>{ 
        resolve(Object.keys(zMemoDb[key]).length);
    });
}
function zRank(key, value) {
    // return scores[key]
    for(var i=0;i<scores[key].length;i++){
        if(scores[key][i].value==value)
        return new Promise((resolve,reject)=>{ 
            resolve(i);
        });
    }
}
function zRange(key, start, stop) {
    let array =[];
    if(stop>scores[key].length)
        stop =scores[key].length
    for(var i=start;i<stop;i++){
        array.push(scores[key][i].value)
    }
    return new Promise((resolve,reject)=>{ 
        resolve(array);
    });
}
module.exports= {get,set,del,dbsize,incr,zAdd, zCard,zRange,zRank} 