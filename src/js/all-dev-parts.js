import './dev-1/renders.js';
import './dev-2/dev-2-main.js';
import './dev-3/dev-3-main.js';
import './dev-4/dev-4-main.js';
import './dev-5/dev-5-main.js';
import './dev-6/dev-6-main.js';
import './dev-7/dev-7-main.js';

import ApiService from './dev-1/api.js';
import { renderTrends, renderLibrary } from './dev-1/renders.js';



const API_KEY = `718b7347396ac1052bb7bdc76b11dbfa`;
const apiService = new ApiService();
apiService.fetchMovieTrends().then(renderTrends);



import './dev-1/pagination.js';

