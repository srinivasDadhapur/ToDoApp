const mongoose = require('mongoose');


const todoschema = mongoose.Schema({
    todo:{
        type:String
    },
    dueDate:{
        type:Date
    },
    status:{
        type:String
    }
});

const todolist = module.exports = mongoose.model('todolist',todoschema);
//addtodb

module.exports.addtoTodoList = (todoItem,callback)=>{
    todoItem.save(callback);
}

//remove from db


module.exports.removeTodoItem = (todoItem,callback)=>{
    const query = {todo:todoItem};
    todolist.deleteOne(query,callback);
}


//get from db 





//update db

module.exports.updateStatus = (todoItem,updatestatus, callback)=>{
    todolist.updateOne(todoItem,{$set:{'status':updatestatus}},callback);
}