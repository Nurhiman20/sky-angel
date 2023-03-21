import './App.css'
import airplaneImage from './assets/images/airplane.png'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className="container">
        <div className="airplane">
          <img src={airplaneImage} />
        </div>
      </div>
    </div>
  )
}

export default App
