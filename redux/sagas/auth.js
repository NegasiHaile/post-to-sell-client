import { takeLatest, put, call } from "redux-saga/effects";

import ActionCreators, { Types } from "../actionCreators";

export function* signin(action) {
  const { user_name, password } = action;
  try {
    yield call(console.log, user_name, password);
    yield put(
      ActionCreators.signinSuccess({
        id: "",
        role: "",
        token: null,
        verification_state: "",
      })
    );
  } catch (err) {
    yield put(ActionCreators.signoutSuccess());
  }
}

export default function* authWatcher() {
  yield takeLatest(Types.SIGNIN, signin);
}
