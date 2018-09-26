import React from "react";
import Header from "./header.js";
import Order from "./order.js";
import Inventory from "./Inventory.js";
import sampleFishes from "../sample-fishes.js";
import Fish from "./Fish.js";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

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
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagLine="Fresh Seafood Market" age={500} />{" "}
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish key={key} details={this.state.fishes[key]}>
                {key}
              </Fish>
            ))}{" "}
          </ul>
        </div>
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
