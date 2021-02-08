import React, { useState, useEffect} from "react";
import "./App.css";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return [];
  }
}

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task) {
      showAlert(true, 'danger', 'please enter value');
    } else if (task && isEdit) {
      setList(list.map((item) => {
        if(item.id === editId){
          return {...item, title: task}
        }
        return item
      } ))
      setTask('')
      setEditId(null)
      setIsEdit(false)
      showAlert(true, 'success', 'task edited')
    }
    else{
      showAlert(true, 'success', 'item added to the list')
      const newItem = {id: new Date().getTime().toString(), title: task}
      setList([...list, newItem])
      setTask('')
    }
  };

  const showAlert = (show=false, type='', msg='') => {
    setAlert({show, type, msg})
  }

  const clearList = () => {
    showAlert(true, 'danger', 'emply list')
    setList([])
  }

  const removeTask = (id) => {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter((item) => item.id !== id))
  }

  const editTask = (id) => {
    const specificTask = list.find((item) => item.id === id)
    setIsEdit(true);
    setEditId(id)
    setTask(specificTask.title)
    showAlert(true, 'danger', 'editing task')
  }

  useEffect(()=> {
localStorage.setItem('list', JSON.stringify(list))
  },[list])

  return (
    <section className="section-center">
      <form className="task-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>To DO List</h3>
        <div className="form-control">
          <input type="text" className="tasks" placeholder="eg. Meeting" value={task} onChange={(e) => setTask(e.target.value)}/>
          <button type="submit" className="submit-btn">
            {isEdit ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      <div className="tast-count"></div>
      <List items={list} removeTask={removeTask} editTask={editTask}/>
      <button className="clear-btn" onClick={clearList}>clear all</button>
    </section>
  );
}

export default App;
