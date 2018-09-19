const express = require('express');
const router = express.Router();
const todolist = require('../tododb/tododb');
const dateFormat = require('dateformat');


router.get('/',(req,res)=>{
    res.send('Hi there');
})

router.post('/add',(req,res)=>{
    // const date = new Date(req.body.date).toDateString();
     const date = dateFormat(req.body.dueDate, "yyyy-mm-dd h:MM:ss")
    console.log(req.body.todo+' '+ date);
    let newtodoItem = new todolist({
        todo: req.body.todo,
        dueDate: date,
        status: ''

    });
    todolist.addtoTodoList(newtodoItem,(error,todoitem)=>{
        if(error){
            res.json({success:false,msg:'Failed to add todo'});
        }
        else{
            res.json({success:true,msg:'added to do list item'});
        }
    });
});

router.post('/update',(req,res)=>{
    const todoitem = req.body.todo;
    todolist.updateStatus({todo:todoitem},req.body.status,(err, status)=>{
        if(err){
            res.json({success:false,msg:err})
        }else{
            res.json({success:true,msg:'update successful'});
        }
    });
});

router.post('/getlist',(req,res)=>{
    todolist.find({},(error,list)=>{
        if(error){
            res.json({success:flase,msg:'cannot get the list of users'});
        }else{
            res.json({success:true, data:list});
        }
    });
});


router.post('/delete',(req,res)=>{
    todolist.removeTodoItem(req.body.todo,(error,response)=>{
        if(error){
            res.json({success:false,msg:'cannot delete'})
        }else{
            res.json({success:true,msg:'deleted successful'});
        }
    });
});


module.exports = router;
