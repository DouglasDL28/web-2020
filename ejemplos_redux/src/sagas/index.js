import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from './auth';
import { watchSayHappyBirthday } from './happyBirthday';
import { watchFetchPetOwnersStarted, watchAddPetOwnersStarted, watchRemovePetOwnersStarted } from './petOwners';


function* mainSaga() {
    yield all([
        fork(watchLoginStarted),
        fork(watchSayHappyBirthday),
        fork(watchFetchPetOwnersStarted),
        fork(watchAddPetOwnersStarted),
        fork(watchRemovePetOwnersStarted),
    ]);
}


export default mainSaga;