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

  @computed get gemCount() {
    return this.gems.length;
  }
}

const store = new GemStore();
export default store;
