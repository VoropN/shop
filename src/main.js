import '../node_modules/skeleton-scss/scss/skeleton.scss';
import './main.sass';
import main from './main.html';
import { Router } from './router';
import { Translator } from './translator';

new Translator({template: main, output: document.body}).render();
new Router();