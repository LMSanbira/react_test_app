import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import axios from "axios";

@inject("GemStore")
@observer
class GemsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenGem: null };
  }

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

  changeToInput = id => {
    this.setState({ chosenGem: id });
  };

  handleGemChange = id => {
    this.props.GemStore.updateGem(this.gemName.value, id);
    this.setState({ chosenGem: null });
  };

  handleGemDelete = id => {
    console.log("here");
    this.props.GemStore.deleteGem(id);
    this.setState({ chosenGem: null });
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
          {GemStore.gems.map(gem => {
            if (gem.id === this.state.chosenGem) {
              return (
                <div className="gem-input-container" key={gem.id}>
                  <input
                    type="text"
                    defaultValue={gem.name}
                    ref={input => (this.gemName = input)}
                    onBlur={() => this.handleGemChange(gem.id)}
                    autoFocus
                  />
                  <div
                    className="gem-input-delete"
                    onMouseDown={() => this.handleGemDelete(gem.id)}
                  >
                    DELETE
                  </div>
                </div>
              );
            } else {
              return (
                <li key={gem.id} onClick={() => this.changeToInput(gem.id)}>
                  {gem.name}
                </li>
              );
            }
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export default GemsDisplay;
