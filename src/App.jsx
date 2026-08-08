import "./App.css";
import { useEffect, useState } from "react";
import Statcard from "./components/Statcard";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AddTaskForm from "./components/AddTaskForm";

const initialTasks = [
  {
    id: 1,
    title: "Finish React Project",
    category: "Work",
    date: "2026-08-05",
    completed: false,
  },
  {
    id: 2,
    title: "Buy groceries",
    category: "Personal",
    date: "2026-08-05",
    completed: false,
  },
  {
    id: 3,
    title: "Read 30 pages of a book",
    category: "Self Development",
    date: "2026-08-05",
    completed: false,
  },
  {
    id: 4,
    title: "Go to the gym",
    category: "Health",
    date: "2026-08-05",
    completed: true,
  },
  {
    id: 5,
    title: "Call mom",
    category: "Personal",
    date: "2026-08-06",
    completed: false,
  },
];
const initialRoutines = [
  {
    id: 1,
    title: "water",
  },
  {
    id: 2,
    title: "Read",
  },
  {
    id: 3,
    title: "Exercise",
  },
];

function getInitialRoutines() {
  const savedRoutines = localStorage.getItem("routines");

  if (savedRoutines) {
    return JSON.parse(savedRoutines);
  }

  return initialRoutines;
}

function getInitialRoutineChecks() {
  const savedChecks = localStorage.getItem("routineChecks");

  if (savedChecks) {
    return JSON.parse(savedChecks);
  }

  return {};
}

function getInitialTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

  return initialTasks;
}

function App() {
  const [tasks, setTasks] = useState(getInitialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("Work");
  const [newTaskDate, setNewTaskDate] = useState("2026-08-05");
  const [filter, setFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("DashBoard");
  const [routines, setRoutines] = useState(getInitialRoutines);
  const [routineChecks, setRoutineChecks] = useState(getInitialRoutineChecks);
  const [routineMonth, setRoutineMounth] = useState(new Date());
  const [newRoutineTitle, setNewRoutineTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("routineChecks", JSON.stringify(routineChecks));
  }, [routineChecks]);

  useEffect(() => {
    localStorage.setItem("routines", JSON.stringify(routines));
  }, [routines]);

  const allTaskCount = tasks.length;
  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const activeTaskCount = tasks.filter((task) => !task.completed).length;
  const overdueTaskCount = 0;
  const today = new Date().toISOString().slice(0, 10);

  const todayTasks = tasks.filter((task) => task.date === today);
  const todayTasksCount = todayTasks.length;
  const completedTodayTasksCount = todayTasks.filter(
    (tasks) => tasks.completed,
  ).length;
  const todayCompletionPercent =
    todayTasksCount === 0
      ? 0
      : Math.round((completedTodayTasksCount / todayTasksCount) * 100);

  const routineYear = routineMonth.getFullYear();
  const routineMonthIndex = routineMonth.getMonth();

  const daysInRoutineMonth = new Date(
    routineYear,
    routineMonthIndex + 1,
    0,
  ).getDate();

  const routineDays = Array.from(
    { length: daysInRoutineMonth },
    (_, index) => index + 1,
  );

  function getRoutineKey(routineId, day) {
    const monthKey = `${routineYear}-${routineMonthIndex + 1}`;
    return `${monthKey}-${routineId}-${day}`;
  }

  function toggleRoutineCheck(routineId, day) {
    const key = getRoutineKey(routineId, day);

    setRoutineChecks({
      ...routineChecks,
      [key]: !routineChecks[key],
    });
  }

  function addRoutine(event) {
    event.preventDefault();

    if (newRoutineTitle.trim() === "") {
      return;
    }

    const newRoutine = {
      id: Date.now(),
      title: newRoutineTitle,
    };

    setRoutines([...routines, newRoutine]);
    setNewRoutineTitle("");
  }

  function deleteRoutine(id) {
    const filteredRoutines = routines.filter((routine) => routine.id !==id);
    setRoutines(filteredRoutines);

    const updatedChecks = {};

    Object.keys(routineChecks).forEach((key)=> {
      const keyParts = key.split("-");
      const routineIdFromKey = Number(keyParts[2]);

      if (routineIdFromKey !== id) {
        updatedChecks[key] = routineChecks[key];
      }
     });

     setRoutineChecks(updatedChecks);
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  function toggleTask(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function addTask(event) {
    event.preventDefault();

    if (newTaskTitle.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      category: newTaskCategory,
      date: newTaskDate,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setNewTaskCategory("Work");
    setNewTaskDate("2026-08-05");
  }

  function deleteTask(id) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <h2 className="page-title">{activePage}</h2>

        {activePage === "Dashboard" && (
          <section className="dashboard-page">
            <div className="dashboard-welcome">
              <h2>Hoş geldin, Berkay</h2>
              <p>
                Bugünkü {todayTasksCount} görevin var.{" "}
                {completedTodayTasksCount} tanesini tamamladın.
              </p>
            </div>

            <section className="stats">
              <Statcard title="All Tasks" value={allTaskCount} />
              <Statcard title="Completed" value={completedTasksCount} />
              <Statcard title="In Progress" value={activeTaskCount} />
              <Statcard title="Overdue" value={overdueTaskCount} />
            </section>

            <section className="dashboard-grid">
              <div className="chart-card">
                <h3>Bugünkü Görev Durumu</h3>

                <div
                  className="pie-chart"
                  style={{
                    background: `conic-gradient(#7c3aed ${todayCompletionPercent}%, #e5e7eb 0)`,
                  }}
                >
                  <span>{todayCompletionPercent}%</span>
                </div>

                <p>
                  {completedTodayTasksCount} / {todayTasksCount} tamamlandı
                </p>
              </div>
            </section>
          </section>
        )}

        {activePage === "Daily Routine" && (
          <section className="routine-page">
            <div className="routine-header">
              <div>
                <h2>Günlük Rutin</h2>
                <p>
                  {routineMonth.toLocaleDateString("tr-TR", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <form className="routine-form" onSubmit={addRoutine}>
                <input
                  type="text"
                  placeholder="Yeni rutin ekle..."
                  value={newRoutineTitle}
                  onChange={(event) => setNewRoutineTitle(event.target.value)}
                />
                <button type="submit">Rutin Ekle</button>
              </form>

              <div className="routine-month-actions">
                <button
                  onClick={() =>
                    setRoutineMounth(
                      new Date(routineYear, routineMonthIndex - 1, 1),
                    )
                  }
                >
                  Önceki Ay
                </button>

                <button
                  onClick={() =>
                    setRoutineMounth(
                      new Date(routineYear, routineMonthIndex + 1, 1),
                    )
                  }
                >
                  Sonraki Ay
                </button>
              </div>
            </div>

            <div className="routine-table-wrapper">
              <table className="routine-table">
                <thead>
                  <tr>
                    <th>Rutin</th>
                    {routineDays.map((day) => (
                      <th key={day}>{day}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {routines.map((routine) => (
                    <tr key={routine.id}>
                      <td>
                        <div className="routine-name-cell">
                          <span>{routine.title}</span>
                          <button onClick={() => deleteRoutine(routine.id)}>Sil</button>
                        </div>
                      </td>

                      {routineDays.map((day) => (
                        <td key={day}>
                          <input
                            type="checkbox"
                            checked={Boolean(
                              routineChecks[getRoutineKey(routine.id, day)],
                            )}
                            onChange={() => toggleRoutineCheck(routine.id, day)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activePage === "Today" && (
          <>
            <div className="search-box">
              <input
                type="text"
                placeholder="Görev ara..."
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />
            </div>

            <AddTaskForm
              newTaskTitle={newTaskTitle}
              setNewTaskTitle={setNewTaskTitle}
              newTaskCategory={newTaskCategory}
              setNewTaskCategory={setNewTaskCategory}
              newTaskDate={newTaskDate}
              setNewTaskDate={setNewTaskDate}
              addTask={addTask}
            />

            <section className="task-section">
              <div className="task-section-header">
                <h2>Today's Tasks</h2>

                <div className="filters">
                  <button
                    className={filter === "all" ? "active-filter" : ""}
                    onClick={() => setFilter("all")}
                  >
                    All
                  </button>

                  <button
                    className={filter === "active" ? "active-filter" : ""}
                    onClick={() => setFilter("active")}
                  >
                    Active
                  </button>

                  <button
                    className={filter === "completed" ? "active-filter" : ""}
                    onClick={() => setFilter("completed")}
                  >
                    Completed
                  </button>
                </div>
              </div>

              <TaskList
                tasks={filteredTasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
