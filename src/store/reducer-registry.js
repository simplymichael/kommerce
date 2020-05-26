export class ReducerRegistry {
  constructor() {
    this.onChange = null;
    this.reducers = {};
  }

  getReducers() {
    return { ...this.reducers };
  }

  register(name, reducer) {
    this.reducers = {
      ...this.reducers,
      [name]: reducer,
    };

    if (this.onChange) {
      this.onChange(this.getReducers());
    }
  }

  setChangeListener(listener) {
    this.onChange = listener;
  }
}

const reducerRegistry = new ReducerRegistry();
export default reducerRegistry;
