import Header from './components/Header';
import Projection from './components/Projection';

function App() {
  return (
    <div className="bg-[#282c34] min-h-screen overflow-auto">
      <div className="max-w-85% mx-auto">
        <Header/>
        <Projection />
      </div>
    </div>
  );
}

export default App;
