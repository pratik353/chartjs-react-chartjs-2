import logo from './logo.svg';
import './App.css';
import BarChart from './charts/BarChart';
import DoughnutChart from './charts/DoughnutChart';
import LineChart from './charts/LineChart';
import PieChart from './charts/PieChart';
import MultiTypeChart from './charts/MultiTypeChart';

function App() {
  return (
    <div className="App">
     <BarChart/>
     <DoughnutChart/>
     <LineChart/>
     <PieChart/>
     <MultiTypeChart/>
    </div>
  );
}

export default App;
