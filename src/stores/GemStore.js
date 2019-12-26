import { observable, action, computed } from "mobx";
import apiReq from "../lib/api_req";

class GemStore {
  @observable apiRoot = "http://localhost:5000/api/gems/";

  @observable gems = [];

  @action getGems = async () => {
    try {
      const res = await apiReq("get", this.apiRoot);
      this.gems = res.data;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  @action addGem = async gemName => {
    try {
      const res = await apiReq("post", this.apiRoot, null, { name: gemName });
      this.gems.push(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  @action updateGem = async (gemName, id) => {
    const gemIndex = this.gems.findIndex(gem => gem.id === parseInt(id));
    const address = this.apiRoot + id;

    try {
      const res = await apiReq("put", address, null, { name: gemName });
      this.gems.splice(gemIndex, 1, res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  @action deleteGem = async id => {
    const gemIndex = this.gems.findIndex(gem => gem.id === parseInt(id));
    const address = this.apiRoot + id;

    try {
      const res = await apiReq("delete", address);
      this.gems.splice(gemIndex, 1);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  @computed get gemCount() {
    return this.gems.length;
  }
}

const store = new GemStore();
export default store;
