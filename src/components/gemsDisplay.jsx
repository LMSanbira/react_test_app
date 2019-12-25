import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import axios from "axios";

@inject("GemStore")
@observer
class GemsDisplay extends Component {
  handleSubmit = e => {
    this.props.GemStore.addGem(this.gemName.value);
    this.gemName.value = "";
  };

  componentDidMount() {
    const { GemStore } = this.props;

    axios
      .get("http://localhost:5000/api/gems")
      .then(function(response) {
        console.log(response);
        GemStore.setGems(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { GemStore } = this.props;
    return (
      <React.Fragment>
        <h1>There are {GemStore.gemCount} gems</h1>
        <input
          type="text"
          placeholder="Add a gem"
          ref={input => (this.gemName = input)}
        />
        <div className="btn-send" onClick={e => this.handleSubmit(e)}>
          ADD
        </div>
        <ul>
          {GemStore.gems.map(gem => (
            <li key={gem.id}>{gem.name}</li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default GemsDisplay;
