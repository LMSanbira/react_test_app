import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

@inject("GemStore")
@observer
class GemsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenGem: null };
  }

  componentDidMount() {
    this.props.GemStore.getGems();
  }

  changeToInput = id => {
    this.setState({ chosenGem: id });
  };

  handleSubmit = e => {
    this.props.GemStore.addGem(this.gemName.value);
    this.gemName.value = "";
  };

  handleGemChange = id => {
    this.props.GemStore.updateGem(this.gemName.value, id);
    this.setState({ chosenGem: null });
  };

  handleGemDelete = id => {
    this.props.GemStore.deleteGem(id);
    this.setState({ chosenGem: null });
  };

  render() {
    const { GemStore } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h3" gutterBottom>
          There are {GemStore.gemCount} gems
        </Typography>
        <div style={{ display: "flex", alineItems: "center" }}>
          <TextField
            id="outlined-basic"
            label="Gem Name"
            variant="outlined"
            size="small"
            inputProps={{ ref: input => (this.gemName = input) }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={e => this.handleSubmit(e)}
            style={{ marginLeft: "10px" }}
          >
            ADD
          </Button>
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
