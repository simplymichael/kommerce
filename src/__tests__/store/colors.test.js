import { fromJS } from 'immutable';
import { initialState } from '../../store/colors/reducer';
import { reducer, fetchColors } from '../../store/colors';
import {
  fetchColorsError,
  fetchColorsSuccess
} from '../../store/colors/actions';
import {
  FETCH_COLORS,
  FETCH_COLORS_ERROR,
  FETCH_COLORS_SUCCESS
} from '../../store/colors/constants';
import Service from '../../services/Service';
import colors from '../../__DATA__/colors';

const getMockColors = () => colors;

describe('Store:Colors', () => {
  describe('actions and reducers', () => {
    it('return the initial state', () => {
      expect(initialState).toEqual(fromJS({
        colors: [],
        fetchColorsError: null,
        isFetchingColors: false,
        selectedColors: [],
      }));
    });

    test('action: FETCH_COLORS updates "isFetchingColors" from false to true', () => {
      expect(reducer(initialState, fetchColors())).toEqual(fromJS({
        colors: [],
        fetchColorsError: null,
        isFetchingColors: true,
        selectedColors: [],
      }));
    });

    test('action: FETCH_COLORS_ERROR sets "fetchColorsError" to specified error', () => {
      const error = new Error('Failed to fetch colors');

      expect(reducer(initialState, fetchColorsError(error))).toEqual(fromJS({
        colors: [],
        fetchColorsError: error,
        isFetchingColors: false,
        selectedColors: [],
      }));
    });

    test('action: FETCH_COLORS_SUCCESS sets the colors to specified colors', () => {
      const data = getMockColors();

      expect(reducer(initialState, fetchColorsSuccess(data))).toEqual(fromJS({
        colors: data,
        fetchColorsError: null,
        isFetchingColors: false,
        selectedColors: [],
      }));
    });
  });

  describe('fetchColors() dispatch calls', () => {
    const colorService = Service.getService('ColorService');
    const mockFetchColors = async dispatch => {
      dispatch(fetchColors());

      try {
        dispatch(fetchColorsSuccess(
          await colorService.getColors()
        ));
      } catch(err) {
        dispatch(fetchColorsError(err.toString()));
      }
    };

    it('dispatches "fetchColorsSuccess(fetchedColors) on success', async () => {
      const mockDispatch = jest.fn();
      const spy = jest
        .spyOn(colorService, 'getColors')
        .mockImplementation(() => Promise.resolve(getMockColors()));
      const expectedActions = [
        [{ type: FETCH_COLORS }],
        [{
          type: FETCH_COLORS_SUCCESS,
          payload: { colors: getMockColors() }
        }],
      ];

      expect(spy).not.toHaveBeenCalled();

      await mockFetchColors(mockDispatch);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockDispatch.mock.calls).toEqual(expectedActions);

      colorService.getColors.mockRestore();
    });

    it('dispatches "fetchColorsError(thrownError)" on error', async () => {
      const error = new Error('Network error');
      const mockDispatch = jest.fn();
      const spy = jest
        .spyOn(colorService, 'getColors')
        .mockImplementation(() => {
          throw error;
        });
      const expectedActions = [
        [{ type: FETCH_COLORS }],
        [{
          type: FETCH_COLORS_ERROR,
          error: error.toString()
        }],
      ];

      expect(spy).not.toHaveBeenCalled();

      await mockFetchColors(mockDispatch);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockDispatch.mock.calls).toEqual(expectedActions);

      colorService.getColors.mockRestore();
    });
  });
});
