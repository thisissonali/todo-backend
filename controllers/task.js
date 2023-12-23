import ErrorHandler from "../middlewares/error.js";
import Task from "../model/task.js";

export const newTask = async (req, res,next) => {
    try {
      const { title, description } = req.body;
        const data  = await Task.create({
        title,
        description,
        user:req.user,
      })
    
      res.status(200).json({
        success: true,
        message: "Task created successfully!",
        data
      })  
    } catch (error) {
        next(error);
    }
}

export const getMyTask = async (req, res,next) => { 
    try {
       const userid = req.user._id;
       const taskOfUser = await Task.find({user:userid});
       res.status(200).json({
        success: true,
        taskOfUser
       }) 
    } catch (error) {
        next(error); 
    }
}

export const updateTaskStatus = async (req, res,next) => {
    try {
     const  {id}  = req.params;
     const task = await Task.findById(id);
     if (!task) {
        return next(new ErrorHandler("Task not found",404));
     }
     task.isCompleted = !task.isCompleted;
    
     await task.save();
    
     res.status(200).json({
        success: true,
        message: "Task status successfully updated",
        task
     })   
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res,next) => {
    try {
        const { id } = req.params;
       const task = await Task.findById(id);
      if (!task) {
        return next(new ErrorHandler("Task not found",404));
    }
    await task.deleteOne();
   
    res.status(200).json({
        success: true,
        message: "Task successfully deleted",
        data
    })
    } catch (error) {
        next(error);
    }
}