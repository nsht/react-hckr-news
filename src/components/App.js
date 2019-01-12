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

  getStoryData = story_id => {
    var items = fetch(
      "https://hacker-news.firebaseio.com/v0/item/" + story_id + ".json"
    )
      .then(response => {
        return response.json();
      })
      .then(items => {
        items.hckr_url = "https://news.ycombinator.com/item?id=" + story_id;
        return items;
      });
    return items;
  };

  componentDidMount() {
    // Use arrow function when using 'this'
    // https://stackoverflow.com/questions/36693898/couldnt-setstate-from-the-then-function-of-the-promise

    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then(response => {
        return response.json();
      })
      .then(items => {
        this.setState({
          items
        });
        let display = {};
        items.slice(0, 20).forEach(element => {
          this.getStoryData(element).then(result => {
            display[element] = result;
            // Prevents rendering the component while the data is being fetched
            // Removing this condition causes constant rerendering and rearranging of the component
            // Will cause no data to be rendered if the count is  less than 20 but that is an edge case
            // unless the last page is visited using pagination or multiple filters are used
            if (Object.keys(display).length >= 20) {
              this.setState({
                display
              });
            }
          });
        });
      });
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1 className="header">Hacker News</h1>
        </div>
        <div>
          <ol>
            {Object.keys(this.state.display).map(key => (
              <Story key={key} index={key} post={this.state.display[key]} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default App;
