import { createAction, props } from '@ngrx/store';
import { feedState, userState } from './store.state';

export const addUser = createAction('[userState] add to store', props<userState>());
export const removeUser = createAction('[userState] remove from store');

export const addFeed = createAction('[feedState] add feed data', props<feedState>());
export const removeUserFromFeed = createAction('[feedState] remove user data from feed', props<{_id: string}>());
export const removeFeed = createAction('[feedState] remove feed data');