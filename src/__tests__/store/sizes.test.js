import { fromJS } from 'immutable';
import { initialState } from '../../store/sizes/reducer';
import { reducer, fetchSizes } from '../../store/sizes';
import {
  fetchSizesError,
  fetchSizesSuccess
} from '../../store/sizes/actions';
import {
  FETCH_SIZES,
  FETCH_SIZES_ERROR,
  FETCH_SIZES_SUCCESS
} from '../../store/sizes/constants';
import Service from '../../services/Service';
import sizes from '../../__DATA__/sizes';

const getMockSizes = () => sizes;

describe('Store:Sizes', () => {
  describe('actions and reducers', () => {
    it('return the initial state', () => {
      expect(initialState).toEqual(fromJS({
        sizes: [],
        fetchSizesError: null,
        isFetchingSizes: false,
        selectedSizes: [],
      }));
    });

    test('action: FETCH_SIZES updates "isFetchingSizes" from false to true', () => {
      expect(reducer(initialState, fetchSizes())).toEqual(fromJS({
        sizes: [],
        fetchSizesError: null,
        isFetchingSizes: true,
        selectedSizes: [],
      }));
    });

    test('action: FETCH_SIZES_ERROR sets "fetchSizesError" to specified error', () => {
      const error = new Error('Failed to fetch sizes');

      expect(reducer(initialState, fetchSizesError(error))).toEqual(fromJS({
        sizes: [],
        fetchSizesError: error,
        isFetchingSizes: false,
        selectedSizes: [],
      }));
    });

    test('action: FETCH_SIZES_SUCCESS sets the sizes to specified sizes', () => {
      const data = getMockSizes();

      expect(reducer(initialState, fetchSizesSuccess(data))).toEqual(fromJS({
        sizes: data,
        fetchSizesError: null,
        isFetchingSizes: false,
        selectedSizes: [],
      }));
    });
  });

  describe('fetchSizes() dispatch calls', () => {
    const sizeService = Service.getService('SizeService');
    const mockFetchSizes = async dispatch => {
      dispatch(fetchSizes());

      try {
        dispatch(fetchSizesSuccess(
          await sizeService.getSizes()
        ));
      } catch(err) {
        dispatch(fetchSizesError(err.toString()));
      }
    };

    it('dispatches "fetchSizesSuccess(fetchedSizes) on success', async () => {
      const mockDispatch = jest.fn();
      const spy = jest
        .spyOn(sizeService, 'getSizes')
        .mockImplementation(() => Promise.resolve(getMockSizes()));
      const expectedActions = [
        [{ type: FETCH_SIZES }],
        [{
          type: FETCH_SIZES_SUCCESS,
          payload: { sizes: getMockSizes() }
        }],
      ];

      expect(spy).not.toHaveBeenCalled();

      await mockFetchSizes(mockDispatch);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockDispatch.mock.calls).toEqual(expectedActions);

      sizeService.getSizes.mockRestore();
    });

    it('dispatches "fetchSizesError(thrownError)" on error', async () => {
      const error = new Error('Network error');
      const mockDispatch = jest.fn();
      const spy = jest
        .spyOn(sizeService, 'getSizes')
        .mockImplementation(() => {
          throw error;
        });
      const expectedActions = [
        [{ type: FETCH_SIZES }],
        [{
          type: FETCH_SIZES_ERROR,
          error: error.toString()
        }],
      ];

      expect(spy).not.toHaveBeenCalled();

      await mockFetchSizes(mockDispatch);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockDispatch.mock.calls).toEqual(expectedActions);

      sizeService.getSizes.mockRestore();
    });
  });
});
