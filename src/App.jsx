import { useState, useEffect } from 'react'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all') // "all" | "active" | "completed"
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return
    setTodos([...todos, { text: inputValue, completed: false }])
    setInputValue('')
  }

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  const toggleComplete = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  // filter tasks
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const itemsLeft = todos.filter(todo => !todo.completed).length

  return (
    <>
      <div className='container'>
        <div className='header'>
          <h1>T O D O</h1>
          <button 
            className='mode-button' 
            onClick={() => setDarkMode(!darkMode)}
          >
            <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <div className='input-section'>
            <button className='submit' onClick={handleAddTodo}>
              <div className='circle'></div>
            </button>
            <input 
              type="text" 
              placeholder='Create a new todo...' 
              className='x1'
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
            />
          </div>
        </div>

        <div className='maintodo'>
          {filteredTodos.map((todo, index) => (
            <div key={index} className="todo-item">
              <div className="todo-left">
                <button 
                  className={`circle-btn ${todo.completed ? 'completed' : ''}`} 
                  onClick={() => toggleComplete(index)}
                ></button>
                <h1 className={`todotext ${todo.completed ? 'completed-text' : ''}`}>
                  {todo.text}
                </h1>
              </div>
              <button className="delete-btn" onClick={() => handleDeleteTodo(index)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          ))}

          <div className="footer">
            <span className="items-left">{itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left</span>

            <div className="filters">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${filter === 'active' ? 'active' : ''}`} 
                onClick={() => setFilter('active')}
              >
                Active
              </button>
              <button 
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`} 
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>

            <button className="clear-btn" onClick={clearCompleted}>
              Clear Completed
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
