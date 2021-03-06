export default function reducer(state, { type, payload }) {
  switch (type) {
    case "CREATE_DRAFT":
      return {
        ...state,
        currentPin: null,
        draft: {
          latitude: 0,
          longitude: 0,
        },
      };
    case "UPDATE_DRAFT_LOCATION":
      return {
        ...state,
        draft: payload,
      };
    case "DELETE_DRAFT":
      return {
        ...state,
        draft: null,
      };

    case "CREATE_PIN":
      const newPin = payload;
      const prevPins = state.pins.filter((pin) => pin.title !== newPin.title);
      return {
        ...state,
        pins: [...prevPins, newPin],
      };
    case "SET_PIN":
      return {
        ...state,
        currentPin: payload,
        draft: null,
      };
    default:
      return state;
  }
}
