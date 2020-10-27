import { Route } from 'react-router';

import Header from './components/Header';
import Homepage from './components/Homepage';
import ShowPage from './components/ShowPage';
import AboutPage from './components/AboutPage';


function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Route exact path="/" component={Homepage} />
        <Route 
          path="/show"
          render={(props) => <ShowPage />}
        />
        <Route path="/about" component={AboutPage} />
      </main>
    </div>
  );
}

export default App;
