import './App.css';
import Navheader from './components/navbar';
import Workouts from './components/workouts';
import WorkoutDetail from './components/workoutDetail';
import { Switch, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Navheader />
      <Switch>
        <Route path={"/"} exact component={Workouts} />
        <Route path="/detail" component={WorkoutDetail} />
      </Switch>
    </>
  );
}

export default App;
