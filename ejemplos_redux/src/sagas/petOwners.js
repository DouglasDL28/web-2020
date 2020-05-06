import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    delay,
    select,
} from 'redux-saga/effects';

import * as selectors from '../reducers';
import * as actions from '../actions/petOwners';
import * as types from '../types/petOwners';
import * as tl_types from '../types/trafficLights';


const API_BASE_URL = 'http://localhost:8000/api/v1';


function* fetchPetOwners(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            console.log(isAuth)

            const response = yield call(
                fetch,
                `${API_BASE_URL}/owners/`, {
                    method: 'GET',
                    body: JSON.stringify(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );

            console.log("RESPONSE: ", response.json())


            // if (response.status >= 299 && response.status <= 200) {
            //     // yield put(actions.completeFetchingPetOwners(entities, order));

            // } else {
            //     const { non_field_errors } = yield response.json();
            //     yield put(actions.failFetchingPetOwners(non_field_errors[0]));
            // }
        }
    } catch (error) {
        // yield put(actions.failLogin('Falló horrible la conexión mano'));
    }
}

function* addPetOwner(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);

            const response = yield call(
                fetch,
                `${API_BASE_URL}/owners/`, {
                    method: 'POST',
                    body: JSON.stringify(action.payload),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );

            if (response.status >= 299 && response.status <= 200) {
                yield put(actions.completeAddingPetOwner(action.payload.id, action.payload));

            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failRemovingPetOwner(action.payload.id, non_field_errors[0]));
            }
        }
    } catch (error) {
        // yield put(actions.failLogin('Falló horrible la conexión mano'));
    }
}

function* removePetOwner(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const petOwnerId = action.payload;

            const response = yield call(
                fetch,
                `${API_BASE_URL}/owners/${petOwnerId}/`, {
                    method: 'DELETE',
                    body: JSON.stringify(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );

            console.log(response)

            if (response.status >= 299 && response.status <= 200) {
                yield put(actions.completeRemovingPetOwner());

            } else {
                const { non_field_errors } = yield response.json();
                yield put(actions.failRemovingPetOwner(petOwnerId, non_field_errors[0]));
            }

        }
    } catch (error) {
        // yield put(actions.failLogin('Falló horrible la conexión mano'));
    }
}

export function* watchFetchPetOwnersStarted() {
    yield takeEvery(
        tl_types.TRAFFIC_LIGHT_ADDED,
        fetchPetOwners,
    );
}

export function* watchAddPetOwnersStarted() {
    yield takeEvery(
        types.PET_OWNER_ADD_STARTED,
        addPetOwner,
    );
}

export function* watchRemovePetOwnersStarted() {
    yield takeEvery(
        types.PET_OWNER_REMOVE_STARTED,
        removePetOwner,
    );
}