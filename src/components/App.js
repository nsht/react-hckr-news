import React from "react";
import Story from "./Story";
import Paginator from "./paginator";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      display: {},
      median_score: 0,
      filter: "",
      sort_by: "",
      pages: 0,
      current_page: 1,
      dark_mode: false
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
        let pages = Math.ceil(items.length / 20);

        this.setState({
          items,
          pages
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

  goToPage = key => {
    let display = {};
    let items = this.state.items;
    let start_item = (key - 1) * 20;
    let last_item = start_item + 20;
    items.slice(start_item, last_item).forEach(element => {
      this.getStoryData(element).then(result => {
        display[element] = result;
        if (Object.keys(display).length >= 20 || key === this.state.pages) {
          this.setState({
            current_page: key,
            display
          });
        }
      });
    });
  };

  scrollToTop = () => {
    this.header.current.scrollIntoView({ behavior: "smooth" });
  };

  toggle_dark_mode = () => {
    if (this.state.dark_mode === true) {
      this.setState({
        dark_mode: false
      });
    } else {
      this.setState({
        dark_mode: true
      });
    }
  };

  header = React.createRef();
  render() {
    let classname = this.state.dark_mode ? "dark-mode" : "normal-mode";
    return (
      <div className={`App ${classname}`}>
        <div>
          <h1 className="header" ref={this.header}>
            Hacker News
            <label class="switch">
              <input type="checkbox" onChange={this.toggle_dark_mode} />
              <span class="slider round" />
            </label>
          </h1>
        </div>
        <div>
          <ol
            start={
              this.state.current_page !== 1
                ? (this.state.current_page - 1) * 20 + 1
                : 1
            }
          >
            {Object.keys(this.state.display).map(key => (
              <Story key={key} index={key} post={this.state.display[key]} />
            ))}
          </ol>
        </div>
        <div className="pagination-container">
          <Paginator
            pages={this.state.pages}
            current_page={this.state.current_page}
            goToPage={this.goToPage}
            scrollToTop={this.scrollToTop}
          />
        </div>
        <hr />
      </div>
    );
  }
}

export default App;
