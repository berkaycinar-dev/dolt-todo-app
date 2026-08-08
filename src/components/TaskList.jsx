function TaskList({tasks , toggleTask , deleteTask} ) {
    if(tasks.length === 0) {
        return <p className="empty-message">Görev bulunamadı.</p>;
    }

    return(
        <ul className="task-list">
            {tasks.map((task) => (
                <li key={task.id} className={task.completed ? "completed-task" : ""}>
                    <input type="checkbox"
                           checked={task.completed}
                           onChange={() => toggleTask(task.id)}
                    />
                    <span>{task.title}</span>
                    <span>{task.category}</span>
                    <span>{task.date}</span>
                    <button onClick={() => deleteTask(task.id)}>Sil</button>
                </li>
            ))}
        </ul>
    )
}

export default TaskList;