import { observable, action, computed } from "mobx";
import axios from "axios";

class GemStore {
  @observable gems = [];

  @action addGem = gemName => {
    const gems = this.gems;

    axios
      .post("http://localhost:5000/api/gems/", {
        name: gemName
      })
      .then(function(response) {
        console.log(response);
        gems.push(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  @action setGems = dbGems => {
    this.gems = dbGems;
  };

  @action updateGem = (gemName, id) => {
    const gems = this.gems;
    const gemIndex = gems.findIndex(gem => gem.id === parseInt(id));
    const address = `http://localhost:5000/api/gems/${id}`;

    axios
      .put(address, {
        name: gemName
      })
      .then(function(response) {
        console.log(response);
        gems.splice(gemIndex, 1, response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  @action deleteGem = id => {
    const gems = this.gems;
    const gemIndex = gems.findIndex(gem => gem.id === parseInt(id));
    const address = `http://localhost:5000/api/gems/${id}`;

    axios
      .delete(address)
      .then(function(response) {
        console.log(response);
        gems.splice(gemIndex, 1);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  @computed get gemCount() {
    return this.gems.length;
  }
}

const store = new GemStore();
export default store;
