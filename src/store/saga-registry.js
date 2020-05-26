export class SagaRegistry {
  constructor() {
    this.sagas = {};
    this.onChange = null;
  }

  getSagas() {
    return { ...this.sagas };
  }

  register(name, saga) {
    if (this.sagas[name]) {
      return;
    }

    this.sagas = {
      ...this.sagas,
      [name]: saga
    };

    if (this.onChange) {
      this.onChange(this.getSagas());
    }
  }

  setChangeListener(listener) {
    this.onChange = listener;
  }
}

const sagaRegistry = new SagaRegistry();
export default sagaRegistry;
