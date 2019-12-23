import { observable, action, computed } from "mobx";

class GemStore {
  @observable gems = [];

  @action addGem = gem => {
    const id = parseInt(Date.now() * 100 + Math.random() * 100);
    const newGem = {
      name: gem,
      id: id
    };
    this.gems.push(newGem);
  };

  @computed get gemCount() {
    return this.gems.length;
  }
}

const store = new GemStore();
export default store;
