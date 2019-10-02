import '../node_modules/skeleton-scss/scss/skeleton.scss';
import './main.sass';
import main from './main.html';
import { AppManager } from './app-manager';
import { Translator } from './translator';

document.body.appendChild(new Translator({template: main}).createElement());
new AppManager();