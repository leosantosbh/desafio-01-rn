import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle.length > 0) {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
  
      setTasks(prevState => [...prevState, newTask])
    } else {
      Alert.alert('Error', 'VocÊ não pode inserir uma tarefa em "Branco"!')
    }

  }

  function handleMarkTaskAsDone(id: number) {
    const tempTask: Task[] = [];
    tasks.forEach(task => {
      tempTask.push({
        id: task.id,
        title: task.title,
        done: task.id === id ? !task.done : task.done
      })
    })
    
    setTasks(tempTask)
  }

  function handleRemoveTask(id: number) {
    setTasks(prevState => prevState.filter(
      task => task.id !== id
    ))
  }

  return (
    <>
      <Header />
      <TodoInput addTask={handleAddTask} />
      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}