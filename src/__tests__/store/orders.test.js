import { fromJS } from 'immutable';
import { initialState } from '../../store/orders/reducer';
import { reducer, processOrder } from '../../store/orders';
import {
  processOrderError,
  processOrderSuccess,
} from '../../store/orders/actions';

const stateTree = {
  orderId: 0,
  isProcessingOrder: false,
  processOrderError: null,
};

describe('Store:Orders', () => {
  describe('actions and reducers', () => {
    it('return the initial state', () => {
      expect(initialState).toEqual(fromJS(stateTree));
    });

    test('action: PROCESS_ORDER updates "isProcesingOrder" from false to true', () => {
      expect(reducer(initialState, processOrder())).toEqual(fromJS({
        ...stateTree,
        isProcessingOrder: true,
      }));
    });

    test('action: PROCESS_ORDER_ERROR sets "processOrderError" to specified error', () => {
      const error = new Error('Failed to process order');

      expect(reducer(initialState, processOrderError(error))).toEqual(fromJS({
        ...stateTree,
        processOrderError: error,
      }));
    });

    test('action: PROCESS_ORDER_SUCCESS sets the Order ID to specified ID', () => {
      const orderId = 12345;

      expect(reducer(initialState, processOrderSuccess(orderId))).toEqual(fromJS({
        ...stateTree,
        orderId,
      }));
    });
  });
});
