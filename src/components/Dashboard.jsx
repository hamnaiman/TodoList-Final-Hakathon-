import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Statuses for tasks
const statuses = ['To Do', 'In Progress', 'Done'];

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    priority: 'Low',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await fetchTasks();
    setTasks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(form);
    setForm({ title: '', description: '', assignedTo: '', dueDate: '', priority: 'Low' });
    loadTasks();
  };

  const handleStatusChange = async (id, status) => {
    await updateTask(id, { status });
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;
    await handleStatusChange(taskId, newStatus);
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format due date to be more readable
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString(); // Formats the date as MM/DD/YYYY
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#e8f5e9', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#2e7d32' }}>Task Management Dashboard</h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by title or assigned user"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', border: '1px solid #2e7d32', borderRadius: '4px' }}
        />
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          style={{ padding: '8px', border: '1px solid #2e7d32', borderRadius: '4px' }}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ padding: '8px', border: '1px solid #2e7d32', borderRadius: '4px' }}
        />
        <input
          placeholder="Assigned To"
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
          required
          style={{ padding: '8px', border: '1px solid #2e7d32', borderRadius: '4px' }}
        />
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          style={{ padding: '8px', border: '1px solid #2e7d32', borderRadius: '4px' }}
        />
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          style={{ padding: '8px', border: '1px solid #2e7d32', borderRadius: '4px' }}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          type="submit"
          style={{ padding: '8px 16px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Add Task
        </button>
      </form>

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    flex: 1,
                    minHeight: '500px',
                    backgroundColor: 'white',
                    padding: '10px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  }}
                >
                  <h3 style={{ textAlign: 'center', color: '#2e7d32' }}>{status}</h3>
                  {filteredTasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable draggableId={task._id} index={index} key={task._id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              background: '#a5d6a7',
                              padding: '10px',
                              margin: '10px 0',
                              borderRadius: '6px',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              ...provided.draggableProps.style,
                            }}
                          >
                            <h4 style={{ margin: '0', color: '#1b5e20' }}>{task.title}</h4>
                            <p style={{ margin: '4px 0', fontSize: '14px' }}>Assigned: {task.assignedTo}</p>
                            <p style={{ fontSize: '12px', color: '#388e3c' }}>
                              Due Date: {task.dueDate ? formatDate(task.dueDate) : 'N/A'}
                            </p>
                            <p style={{ fontSize: '12px', color: '#388e3c' }}>Priority: {task.priority}</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
                              <button
                                onClick={() => handleStatusChange(task._id, 'To Do')}
                                style={{ backgroundColor: '#66bb6a', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
                              >
                                To Do
                              </button>
                              <button
                                onClick={() => handleStatusChange(task._id, 'In Progress')}
                                style={{ backgroundColor: '#43a047', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
                              >
                                In Progress
                              </button>
                              <button
                                onClick={() => handleStatusChange(task._id, 'Done')}
                                style={{ backgroundColor: '#2e7d32', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
                              >
                                Done
                              </button>
                              <button
                                onClick={() => handleDelete(task._id)}
                                style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
