import { BrowserRouter, Routes, Route} from "react-router-dom"
import LandingGeral from './pages/ab-LandingGeral';
import LoginPage from './pages/aa-LoginPage';
import FilmesVistoSemana from './pages/ac-FilmesVistoSemana';
import DiasTreinadoSemana from './pages/ad-DiasTreinadoSemana';
import WeekWordsPage from './pages/aea-WeekWordsPage';
import WeekListenedMusic from './pages/aeb-WeekListenedMusic';
import LandingFSA from './pages/ba-LandingFSA';
import PaginaFilmes from './pages/bb-PaginaFilmes';
import PaginaFilmeSelected from './pages/bba-PaginaFilmeSelected';
import PaginaSeries from './pages/bc-PaginaSeries';
import PaginaSerieSelected from './pages/bca-PaginaSerieSelected';
import PaginaAnimes from './pages/bd-PaginaAnimes';
import PaginaAnimeSelected from './pages/bda-PaginaAnimeSelected';
import AddFSAPage from './pages/be-AddFSAPage';
import PaginaVistos from './pages/bf-PaginaVistos';
import LandingTreino from './pages/ca-LandingTreino';
import TreinoHoje  from './pages/cb-TreinoHoje';
import ComoFazer from './pages/cba-ComoFazer';
import Treinos from './pages/cc-Treinos';
import SelectedTreino from './pages/cca-SelectedTreino';
import DiasTreinados from './pages/cd-DiasTreinados';
import TreinoDia  from './pages/cda-TreinoDia';
import AddTreino from './pages/ce-AddTreino';
import LandingEnglish from './pages/da-LandingEnglish';
import WordsPage from './pages/db-WordsPage';
import VerbalTense from './pages/dba-VerbalTense';
import MusicsPage from './pages/dc-MusicsPage';
import SelectedMusicPage from './pages/dca-SelectedMusicPage';
import NewWordPage from './pages/dd-NewWordPage';
import NewMusicPage from './pages/de-NewMusicPage';


export default function Navegacao(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path= "/" element={<LandingGeral/>}> </Route>
                <Route path="/aa-LoginPage" element={<LoginPage/>}> </Route>
                <Route path="/ac-FilmesVistoSemana" element={<FilmesVistoSemana/>}> </Route>
                <Route path="/ad-DiasTreinadoSemana" element={<DiasTreinadoSemana/>}> </Route>
                <Route path="/aea-WeekWordsPage" element={<WeekWordsPage/>}> </Route>
                <Route path="/aeb-WeekListenedMusic" element={<WeekListenedMusic/>}> </Route>
                <Route path="/ba-LandingFSA" element={<LandingFSA/>}> </Route>
                <Route path="/bb-PaginaFilmes" element={<PaginaFilmes/>}> </Route>
                <Route path="/bba-PaginaFilmeSelected" element={<PaginaFilmeSelected/>}> </Route>
                <Route path="/bba-PaginaFilmeSelected/:id" element={<PaginaFilmeSelected/>}> </Route>
                <Route path="/bc-PaginaSeries" element={<PaginaSeries/>}> </Route>
                <Route path="/bca-PaginaSerieSelected" element={<PaginaSerieSelected/>}> </Route>
                <Route path="/bca-PaginaSerieSelected/:id" element={<PaginaSerieSelected/>}> </Route>
                <Route path="/bd-PaginaAnimes" element={<PaginaAnimes/>}> </Route>
                <Route path="/bda-PaginaAnimeSelected" element={<PaginaAnimeSelected/>}> </Route>
                <Route path="/bda-PaginaAnimeSelected/:id" element={<PaginaAnimeSelected/>}> </Route>
                <Route path="/be-AddFSAPage" element={<AddFSAPage/>}> </Route>
                <Route path="/bf-PaginaVistos" element={<PaginaVistos/>}> </Route>
                <Route path="/ca-LandingTreino" element={<LandingTreino/>}> </Route>
                <Route path="/cb-TreinoHoje" element={<TreinoHoje/>}> </Route>
                <Route path="/cba-ComoFazer"id element={<ComoFazer/>}> </Route>
                <Route path="/cba-ComoFazer/:id" element={<ComoFazer/>}> </Route>
                <Route path="/cc-Treinos" element={<Treinos/>}> </Route>
                <Route path="/cca-SelectedTreino" element={<SelectedTreino/>}> </Route>
                <Route path="/cca-SelectedTreino/:id" element={<SelectedTreino/>}> </Route>
                <Route path="/cd-DiasTreinados" element={<DiasTreinados/>}> </Route>
                <Route path="/cda-TreinoDia" element={<TreinoDia/>}> </Route>
                <Route path="/cda-TreinoDia/:id" element={<TreinoDia/>}> </Route>
                <Route path="/ce-AddTreino" element={<AddTreino/>}> </Route>
                <Route path="/da-LandingEnglish" element={<LandingEnglish/>}> </Route>
                <Route path="/db-WordsPage" element={<WordsPage/>}> </Route>
                <Route path="/dba-VerbalTense" element={<VerbalTense/>}> </Route>
                <Route path="/dc-MusicsPage" element={<MusicsPage/>}> </Route>
                <Route path="/dca-SelectedMusicPage" element={<SelectedMusicPage/>}> </Route>
                <Route path="/dca-SelectedMusicPage/:id" element={<SelectedMusicPage/>}> </Route>
                <Route path="/dd-NewWordPage" element={<NewWordPage/>}> </Route>
                <Route path="/de-NewMusicPage" element={<NewMusicPage/>}> </Route>
            </Routes>
        </BrowserRouter>
    )
}