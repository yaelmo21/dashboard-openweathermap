import { State } from 'country-state-city';
export const getStatesOfCountry = (countryCode: string) => {
  const states = State.getStatesOfCountry(countryCode).map((state) => ({
    label: state.name,
    value: state.isoCode,
  }));
  return states;
};

export const getStateByName = (countryCode: string, stateName: string) => {
  const state = State.getStatesOfCountry(countryCode).find((state) =>
    state.name.toLowerCase().includes(stateName.toLowerCase()),
  );
  if (!state) return null;
  return state;
};
