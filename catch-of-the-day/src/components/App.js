import React from "react";
import Header from "./header.js";
import Order from "./Order.js";
import Inventory from "./Inventory.js";
import sampleFishes from "../sample-fishes.js";
import Fish from "./Fish.js";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    //first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeid);
    console.log(params.storeid);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeid}/fishes`, {
      context: this,
      state: "fishes"
    });
  }
  componentDidUpdate() {
    console.log(this.props.match.params.storeid);
    localStorage.setItem(
      this.props.match.params.storeid,
      JSON.stringify(this.state.order)
    );
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
    console.log("Unmounting!");
  }

  addFish = fish => {
    console.log("Adding a fish");
    //1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    //2. Add our new fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    //3. Set the new fishes object to state
    console.log(fishes);
    this.setState({
      fishes
    });
  };

  loadSampleFishes = () => {
    console.log("Loading Sample");
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    //1. take a copy of state
    const order = { ...this.state.order };
    //2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    //3. call setState to update our stat object
    this.setState({ order });
  };
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagLine="Fresh Seafood Market" age={500} />{" "}
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                addToOrder={this.addToOrder}
                details={this.state.fishes[key]}
              />
            ))}{" "}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
