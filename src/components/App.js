import React from "react";
import Story from "./Story";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("clear");
    this.state = {
      items: [],
      display: {},
      median_score: 0,
      filter: "",
      sort_by: "",
      pages: 0,
      current_page: 0
    };
  }
  componentDidMount() {
    // Use arrow function when using 'this'
    // https://stackoverflow.com/questions/36693898/couldnt-setstate-from-the-then-function-of-the-promise

    fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
      .then(response => {
        return response.json();
      })
      .then(items => {
        let display = {};
        items.slice(0, 20).forEach(element => {
          display[element] = {};
        });
        this.setState({
          items,
          display
        });
      });
  }


  render() {
    return (
      <div className="App">
        <div>
          <h3>Hacker News</h3>
        </div>
        <ol>
          {Object.keys(this.state.display).map(key => (
            <Story key={key} index={key}/>
          ))}
        </ol>
      </div>
    );
  }
}

export default App;
