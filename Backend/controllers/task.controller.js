const Task = require("../models/task.model");

const addTask = async (req, res) => {
  try {
    const { name } = req.body;
    const existingTask = await Task.findOne({ name });
    if (existingTask) {
      res.status(404).json({ message: "Task already exists!" });
    }
    await Task.create(req.body);
    res.status(200).json({ message: "Successfully created Task !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const task = await Task.find({});
    if (task.length === 0) {
      return res.status(404).json({ message: "Task is Empty !" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task Not Found !" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);
    if (!task) {
      return res.status(404).json({ message: "Task Not Found !" });
    }
    res.status(200).json({ message: "Task Updated Successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletetask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not Found !" });
    }
    res.status(200).json({ message: "Task Deleted Successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addTask,
  getTasks,
  getTask,
  updateTask,
  deletetask,
};
