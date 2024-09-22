import Header from "./component/Header";
import DayList from "./component/DayList";
import Day from "./component/Day";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmptyPage from "./component/EmptyPage";
import CreateWord from "./component/CreateWord";
import CreateDay from "./component/CreateDay";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element = {<DayList />} />
          <Route path="/day/:day" element = {<Day />} />
          <Route path="/create_word" element = {<CreateWord/>}/>
          <Route path="/create_day" element = {<CreateDay/>}/>
          <Route element={<EmptyPage />}></Route>

        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
