import LoginPageController from './controller/aa-LoginPageController.js';
import WeekWordsPageController from './controller/aea-WeekWordsPageController.js';
import WeekListenedMusicController from './controller/aeb-WeekListenedMusicController.js'
import WordsPageContoller from './controller/db-WordsPageController.js';
import MusicsPageController from './controller/dc-MusicsPageController.js';
import SelectedMusicPageController from './controller/dca-SelectedMusicPageController.js';
import NewWordPageController from './controller/dd-NewWordPageController.js';
import NewMusicPageController from './controller/de-NewMusicPageController.js';

export default function RotasGerais(servidor){
    servidor.use(LoginPageController, WeekWordsPageController, WeekListenedMusicController, WordsPageContoller, MusicsPageController, SelectedMusicPageController, NewWordPageController, NewMusicPageController)
}
