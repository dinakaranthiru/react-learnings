import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Apifetch from "./Apifetch";
import Counter from "./Counter";
import Exampleprops from "./Exampleprops";
import Formvalidation from "./Formvalidation";
import Learning from "./Learning";
import PaginationExample from "./PaginationExample";
import Search from "./Search";
import SearchFilter from "./SearchFilter";
import Theme from "./Theme";
import Todo from "./Todo";
import Toggle from "./Toggle";
import Navbar from "./Navbar";
import Tabs from "./Tabs";
import Cart from "./Cart";
import FileExplorer from "./FileExplorer";
import DebouncedSearch from "./DebouncedSearch";
import Stopwatch from "./Stopwatch";
import USEEFFECT from "./Hooks/USEEFFECT";
import UseState from "./Hooks/UseState";
import Props from "./Hooks/Props";
import EventHandling from "./EventHandling";

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Learning />} />
        <Route path="/event" element={<EventHandling />} />
        <Route path="/props" element={<Props name='Dina' age={23} />} />
        <Route path="/api" element={<Apifetch />} />
        <Route path="/usestate" element={<UseState />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/example-props" element={<Exampleprops name="Sai" age={22} />} />
        <Route path="/pagination" element={<PaginationExample />} />
        <Route path="/search" element={<Search />} />
        <Route path="/filter" element={<SearchFilter />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/toggle" element={<Toggle />} />
        <Route path="/form" element={<Formvalidation />} />
        <Route path="/theme" element={<Theme />} />
        <Route path="/tabs" element={<Tabs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/file" element={<FileExplorer />} />
        <Route path="/useEffect" element={<USEEFFECT />} />
        <Route path="/debounce" element={<DebouncedSearch />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
       <Route path="*" element={<Navigate to='/' replace={true} />} />
      </Routes>
    </Router>
  );
};

export default App;