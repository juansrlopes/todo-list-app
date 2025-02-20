import Header  from './components/Layout/Header';
import Tasks from './components/Tasks';

function App() {

  return (
    <div className="max-w-md mx-auto mt-10">
      <Header title='To-Do List'></Header>
      <Tasks />
    </div>
  );
}

export default App;
