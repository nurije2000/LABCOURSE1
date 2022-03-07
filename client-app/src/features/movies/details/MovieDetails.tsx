import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import MovieDetailedChat from './MovieDetailedChat';
import MovieDetailedHeader from './MovieDetailedHeader';
import MovieDetailedInfo from './MovieDetailedInfo';
import MovieDetailedSideBar from './MovieDetailedSidebar';

export default observer(function MovieDetails(){
  const {movieStore} = useStore();
  const {selectedMovie: movie, loadMovie, loadingInitial} = movieStore;
const {id} = useParams<{id: string}>();

useEffect(() =>{
  if(id) loadMovie(id);
}, [id,  loadMovie ]);

  if ( loadingInitial || !movie) return <LoadingComponent />;
 
    return(
     <Grid>
       <Grid.Column width={10}>
         <MovieDetailedHeader movie={movie}/>
         <MovieDetailedInfo movie={movie} />
         <MovieDetailedChat />
       </Grid.Column>
       <Grid.Column width={6}>
         <MovieDetailedSideBar />
       </Grid.Column>
     </Grid>
    )
})