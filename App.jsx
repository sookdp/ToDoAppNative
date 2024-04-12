import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import ProjectsSideBar from './src/components/ProjectsSideBar.jsx';
import NewProject from './src/components/NewProject.jsx';
import NoProjectSelected from './src/components/NoProjectSelected.jsx';
import SelectedProject from './src/components/SelectedProject.jsx';
import {storeData, getData} from './src/components/Storage.jsx';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProject: undefined,
    projects: [],
    tasks: [],
    accomplishTasks: [],
  });
  const [taskState, setTaskState] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      const storedProjects = await getData('projects');
      if (storedProjects !== null) {
        setProjectsState(prevState => ({
          ...prevState,
          projects: JSON.parse(storedProjects),
        }));
      }
    };

    const loadTasks = async () => {
      const storedTasks = await getData('tasks');
      if (storedTasks !== null) {
        setProjectsState(prevState => ({
          ...prevState,
          tasks: JSON.parse(storedTasks),
        }));
      }
    };

    loadProjects();
    loadTasks();
  }, []);

  function handleAddTask(text) {
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      storeData('tasks', JSON.stringify([newTask, ...prevState.tasks]));
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      const taskToDelete = prevState.tasks.find(task => task.id === id);
      if (!taskToDelete) {
        return prevState;
      }

      storeData(
        'tasks',
        JSON.stringify(prevState.tasks.filter(task => task.id !== id)),
      );
      setTaskState(!taskState);
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id),
        accomplishTasks: [...prevState.accomplishTasks, taskToDelete],
      };
    });
  }

  function handleRestoreTask(id) {
    setProjectsState(prevState => {
      const taskToRestore = prevState.accomplishTasks.find(
        task => task.id === id,
      );
      if (!taskToRestore) {
        return prevState;
      }

      return {
        ...prevState,
        tasks: [...prevState.tasks, taskToRestore],
        accomplishTasks: prevState.accomplishTasks.filter(
          task => task.id !== id,
        ),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState(prevprojectsState => {
      return {
        ...prevprojectsState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState(prevprojectsState => {
      return {
        ...prevprojectsState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState(prevprojectsState => {
      return {
        ...prevprojectsState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState(prevprojectsState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      storeData(
        'projects',
        JSON.stringify([...prevprojectsState.projects, newProject]),
      ); // stocker les projets mis à jour
      return {
        ...prevprojectsState,
        selectedProjectId: undefined,
        projects: [...prevprojectsState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState(prevprojectsState => {
      storeData(
        'projects',
        JSON.stringify(
          prevprojectsState.projects.filter(
            project => project.id !== prevprojectsState.selectedProjectId,
          ),
        ),
      );
      return {
        ...prevprojectsState,
        selectedProjectId: undefined,
        projects: prevprojectsState.projects.filter(
          project => project.id !== prevprojectsState.selectedProjectId,
        ),
      };
    });
  }

  function moveUp(id) {
    const index = projectsState.tasks.findIndex(task => task.id === id);
    if (index === -1 || index === 0) return;

    const updatedTasks = [...projectsState.tasks];
    const temp = updatedTasks[index];
    updatedTasks[index] = updatedTasks[index - 1];
    updatedTasks[index - 1] = temp;

    storeData('tasks', JSON.stringify(updatedTasks)); // Mettre à jour le localStorage

    setProjectsState(prevState => ({...prevState, tasks: updatedTasks}));
  }

  function moveDown(id) {
    const index = projectsState.tasks.findIndex(task => task.id === id);
    if (index === -1 || index === projectsState.tasks.length - 1) return;

    const updatedTasks = [...projectsState.tasks];
    const temp = updatedTasks[index];
    updatedTasks[index] = updatedTasks[index + 1];
    updatedTasks[index + 1] = temp;

    storeData('tasks', JSON.stringify(updatedTasks)); // Mettre à jour le localStorage

    setProjectsState(prevState => ({...prevState, tasks: updatedTasks}));
  }

  const selectedProject = projectsState.projects.find(
    project => project.id === projectsState.selectedProjectId,
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
      onRestoreTask={handleRestoreTask}
      backgroundImage={selectedProject ? selectedProject.backgroundImage : null}
      accomplishTasks={projectsState.accomplishTasks}
      moveUp={moveUp}
      moveDown={moveDown}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onAdd={handleAddProject}
        onCancel={handleCancelAddProject}
        backgroundImage={
          selectedProject ? selectedProject.backgroundImage : null
        }
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected OnStartAddProject={handleStartAddProject} />;
  }
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <ProjectsSideBar
        OnStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </View>
  );
}

export default App;
// Path: src/components/ProjectsSideBar.jsx
