const  {set, get, del, dbsize,incr,zAdd,zCard,zRank,zRange }  = require('./index');

test('set 1 to group and get the result 1', () => {
    set("group",1)
    .then(()=>get("group"))       
    .then((group)=> expect(group).toBe(1)); 
});

test('set and del 1 to group2 and get the result null', () => {
    set("group2",1)
    .then(()=>get("group2"))       
    .then((group)=> expect(group).toBe(1))
    .then(()=> del("group2",1))
    .then(()=>get("group2"))    
    .then((group)=> expect(group).toBe(null))
});
test('set 3 elements to group3 and get dbsize  result as 2', () => {
    set("group3",1)
    .then(()=>set("group3",2))       
    .then(()=>set("group3",3))       
    .then(()=>dbsize("group3"))       
    .then((size)=> expect(size).toBe(2));       
  
});

test('incr 3 times  group4 and get  result as 2', () => {     
    incr("group4")       
    .then(()=>incr("group4"))       
    .then(()=>incr("group4"))   
    .then(()=>get("group4"))     
    .then((group)=> expect(group).toBe(2))
});

test('zadd zset 2 different elements, and modify another result zcard as 2 ', () => {     
    zAdd("zset",1, "one")
    .then(()=> zAdd("zset",1, "two")) 
    .then(()=> zAdd("zset",3, "one")) 
    .then(()=> zAdd("zset",3, "one")) 
    .then(()=> zCard("zset")) 
    .then((zcard)=>expect(zcard).toBe(2));
   
     
       
  
});

test('zadd 3 elements with 3 scores, result zrange, [one, two] ', () => {     
  let expected = ["one","two"];  
  zAdd("zset2",1, "one")
    .then(()=>zAdd("zset2",2, "two"))
    .then(()=>zAdd("zset2",3, "three"))
    .then(()=>zAdd("zset2",3, "three"))
    .then(()=>zRange("zset2",0,2))
    .then((zrange)=> expect(zrange).toEqual(expect.arrayContaining(expected)))
});
test('zrank 3 elements with 3 scores, result zrank 1', () => {     
    zAdd("zset3",2, "one")
    .then(()=>zAdd("zset3",1, "two"))
    .then(()=>zAdd("zset3",3, "three"))
    .then(()=>zRank("zset3", "one"))
    .then((zrank)=>expect().toBe(1))
      
});