import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("GemStore")
@observer
class GemsDisplay extends Component {
  handleSubmit = e => {
    this.props.GemStore.addGem(this.gemName.value);
    this.gemName.value = "";
  };

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
