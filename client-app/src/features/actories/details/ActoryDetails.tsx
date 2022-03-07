import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActoryDetailedChat from './ActoryDetailedChat';
import ActoryDetailedHeader from './ActoryDetailedHeader';
import ActoryDetailedInfo from './ActoryDetailedInfo';
import ActoryDetailedSideBar from './ActoryDetailedSidebar';

export default observer(function ActoryDetails(){
  const {actoryStore} = useStore();
  const {selectedActory: actory, loadActory, loadingInitial} = actoryStore;
const {id} = useParams<{id: string}>();

useEffect(() =>{
  if(id) loadActory(id);
}, [id,  loadActory ]);

  if ( loadingInitial || !actory) return <LoadingComponent />;
 
    return(
     <Grid>
       <Grid.Column width={10}>
         <ActoryDetailedHeader actory={actory}/>
         <ActoryDetailedInfo actory={actory} />
         <ActoryDetailedChat />
       </Grid.Column>
       <Grid.Column width={6}>
         <ActoryDetailedSideBar />
       </Grid.Column>
     </Grid>
    )
})