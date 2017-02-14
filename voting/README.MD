# 签到

* 获取签到状态
```
GET /check

返回示例
{
    check_day: 1, 
    checked: true, 
    last_check_time: 111111111
}
```


* 签到
```
POST /check

返回示例
{
    err: 0,
    msg: "check success"
}

{
    err: 1,
    msg: "You have checked"
}
```

* 获取用户信息
```
GET /user/info

返回示例
{
    id: 0,
    nickname: "TyanBoot",
    points: 999,                 <--------积分
    check_day: 999,              <--------签到天数
    last_check_time: 11111111,   <--------上次签到时间，unix时间戳
    headimg: "http://"           <--------头像图片地址，
```

* 新建一个
```
POST /new
{
    type: "question | vote",
    data:                         <-------想要储存的数据，比如链接，过期时间等等
}

返回示例
{
    err: 0,
    msg: "Success"
}
```

* 获取全部
```
GET /all

返回示例
{
  "err": 0, 
  "result": {
    "num": 1,                             <------总共发布数目
    "qvs": [                              <------具体
      {                                   
        "data": "{\"a\": 1}",             <------这里是新建的时候储存的data
        "id": 1,                          <------问卷/投票的ID
        "last_change_time": 1484568355,   <------上次修改时间
        "nickname": "test",
        "type": "wenjuan"                 <------类型，问卷（问卷）还是投票（vote）
      }
    ]
  }
}

```

* 获取单个，按照ID
```
GET /qv?id=222

返回示例
{
    "type": vote,
    "id": 666,
    "data": "this is data",
    "time": 11111111
}

{
    err: 404,
    msg: "Not found"
}
```

* 删除，按照ID
```
DELETE /qv?id=666

返回示例
{
    err: 0,
    msg: "Success"
}

{
    err: 403,
    msg: "You can only delete things that you created!"
}

{
    err:400,
    msg: "id must be provided"
}
```