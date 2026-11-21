import {createBoardActivity} from '../../shared/board-activity.js';
import * as model from './board-model.js';
import {render} from './view.js';
export * from './model.js';
export function createActivity(context){return createBoardActivity(context,{...model,createState:seed=>model.createState(seed,context.prefs.choices===2?2:3)},render);}
