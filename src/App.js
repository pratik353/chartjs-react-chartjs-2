import logo from './logo.svg';
import './App.css';
import BarChart from './charts/HorizontalBarChart';
import DoughnutChart from './charts/DoughnutChart';
import LineChart from './charts/LineChart';
import PieChart from './charts/PieChart';
import MultiTypeChart from './charts/MultiTypeChart';
import RoundedDoughnutChart from './charts/RoundedArcDoughnutChart';
import VerticalBarChart from './charts/VerticalBarChart';

function App() {
  return (
    <div className="App">
     <BarChart/>
     <br/>
     <br/>
     <br/>
     <VerticalBarChart/>
     <br/>
     <br/>
     <br/>
     <DoughnutChart/>
     <br/>
     <br/>
     <br/>
     {/* <RoundedDoughnutChart/> */}
     <br/>
     <br/>
     <br/>
     <LineChart/>
     <br/>
     <br/>
     <br/>
     {/* <PieChart/> */}
     {/* <MultiTypeChart/> */}
    </div>
  );
}

export default App;
