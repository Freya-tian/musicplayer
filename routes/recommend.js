const express = require('express')
const recommend  = express.Router();
const db = require('../Database/connect')

async function getdata(sql,sql_new){
    const data ={
        recommendlist:[],
        types:[]
    }
    let promise = new Promise((resolve,reject)=>{
        db.db.query(sql,async (err,result)=>{
            if(err){reject(err)}
            resolve(result)
        })           
    })
    let promise_new = new Promise((resolvesub,rejectsub)=>{
        db.db.query(sql_new,async (err,result)=>{
            if(err){rejectsub(err)}
            resolvesub(result)
        })
    })
    data.recommendlist = await promise
    data.types = await promise_new
    return data
} 

/**
 * This function comment is parsed by doctrine
 * @route GET /recommend
 * @group Recommend - Operations about recommendList  
 * @returns {object} 200 - [data:{recommendlist:[],
 * types:[]
 * }]
 * @returns {Error}  default - Unexpected error
 */

recommend.get('/',(req,res)=>{
    let data ={    
    }
    let sql = 'SELECT a.MusicList_ID,a.list_Name,a.Introduction,a.Play_times,a.image  FROM musicapp_schema.musiclist a where  a.Recommended = 1  order by a.Play_times'
    let sql_new = "SELECT * FROM musicapp_schema.music_tag b where b.group = 'mood'"
    getdata(sql,sql_new).then((reslut)=>{       
        data = reslut
        res.send(200,data)
    })   
})


module.exports = recommend 