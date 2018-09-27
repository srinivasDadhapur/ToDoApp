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
        todo: req.body.todo.trim(),
        dueDate: date,
        status: 'todo'

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

router.put('/update',(req,res)=>{
    const todoitem = req.body.todo.trim();
    console.log(req.body.todo);
    console.log(req.body.todo.trim());

    todolist.updateStatus({'todo':todoitem},req.body.status,(err, status)=>{
        if(err){
            res.status(400).json({success:false,msg:err})
        }else if(status.n==0){
            res.status(404).json({success:false,msg:'cannot find the item'});
        }else{
            res.json({success:true,msg:'Updated Successfully'});
        }
    });
});

router.get('/getlist',(req,res)=>{
    todolist.find({},(error,list)=>{
        if(error){
            res.status(400).json({success:flase,msg:'cannot get the list of users'});
        }else{

            res.json({success:true, data:list});
        }
    });
});


router.post('/delete',(req,res)=>{
    todolist.removeTodoItem(req.body.todo,(error,response)=>{
        if(error){
            res.status(400).json({success:false,msg:'cannot delete'})
        }else if(response.n=='0'){
            res.status(404).json({success:false,msg:'cannot find the requested item'});
        }else{
            res.json({success:true,msg:'deleted successful'});
        }
    });
});


module.exports = router;
