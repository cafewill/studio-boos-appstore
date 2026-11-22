import {createBoardActivity} from '../../shared/board-activity.js';
import * as model from './model.js';
import {render} from './view.js';
export const createActivity=context=>createBoardActivity(context,model,render);
