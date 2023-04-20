import './App.css';
import Articles from './components/Articles';
import Search from './components/Search';

function App() {
  return (
    <div>
      <Search />
      <ol>
      <Articles/>
      </ol>
    </div>
  );
}

export default App;
