import React from "react";
import TaskItem from "./TaskItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TaskList({ tasks, updateTask, deleteTask, reorderTasks }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);
    reorderTasks(reorderedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="taskList">
        {(provided) => (
          <ul
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
              >
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      userSelect: "none",
                      marginBottom: "10px",
                      borderRadius: "8px",
                      background: snapshot.isDragging ? "#64748b" : "#334155",
                      padding: "10px",
                      transition: "background 0.2s ease",
                      ...provided.draggableProps.style,
                    }}
                  >
                    <TaskItem
                      task={task}
                      updateTask={updateTask}
                      deleteTask={deleteTask}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TaskList;

