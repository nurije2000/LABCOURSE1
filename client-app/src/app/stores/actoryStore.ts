import {  makeObservable, observable, runInAction} from "mobx";
import agent from "../api/agent";
import { Actory } from "../models/actory";
import {format} from 'date-fns';



export default class ActoryStore{
@observable actoryRegistry = new Map<string, Actory >();
@observable selectedActory : Actory  | undefined= undefined;
@observable editMode = false;
@observable loading = false;
@observable loadingInitial = false;

constructor(){ 
    makeObservable(this); 
    }

    get actoriesByDate(){
    return Array.from(this.actoryRegistry.values()).sort((a, b) =>
    a.date!.getTime() - b.date!.getTime());
    }

    get groupedActories(){
return Object.entries(
    this.actoriesByDate.reduce((actories, actory) =>{
        const date = format(actory.date!, 'dd MMM yyyy h:mm aa' );
        actories[date] = actories[date] ? [...actories[date], actory] : [actory];
        return actories;
    }, {} as {[key: string]: Actory []} )
)
    }

    loadActories = async () => {
        this.loadingInitial = true;
        try{
         const actories = await agent.Actories.list();
            actories.forEach(actory =>{
               this.setActory (actory);
              })
              this.setLoadingInitial(false);
        }catch (error){
            console.log(error);
                this.setLoadingInitial(false);    
        }
    }

    loadActory  = async (id: string) =>{
        let actory = this.getActory (id);
        if (actory){
            this.selectedActory  = actory;
            return actory;
        }else {
            this.loadingInitial = true;
            try{
                actory = await agent.Actories.details(id);
                this.setActory (actory);
                runInAction(()=>{
                    this.selectedActory  = actory;
                })
                this.setLoadingInitial(false);
                return actory;
            } catch (error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setActory  = (actory: Actory ) =>{
        actory.date = new Date(actory.date!);
        this.actoryRegistry.set(actory.id, actory);
    }

    private getActory  =(id: string) => {
        return this.actoryRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) =>{
        this.loadingInitial = state;
    }
    createActory  = async (actory: Actory ) => {
        this.loading = true;
        try{
            await agent.Actories.create(actory);
            runInAction(() =>{
                this.actoryRegistry.set(actory.id, actory);
                this.selectedActory  = actory;
                this.editMode = false;
                this.loading = false;
            })
        }catch (error){
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }
    updateActory  = async (actory: Actory ) => {
        this.loading = true;
        try{
            await agent.Actories.update(actory);
            runInAction(()=>{
              this.actoryRegistry.set(actory.id, actory);
              this.selectedActory  = actory;
              this.editMode = false;
              this.loading = false;
            })
        }catch (error) {
            console.log(error);
            runInAction(() =>{
                this.loading = false;
            })
        }
    }

    deleteActory  = async (id: string) =>{
        this.loading = true;
        try{    
            await agent.Actories.delete(id);
            runInAction(()=>{
                this.actoryRegistry.delete(id);
                this.loading=false;
})
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
}


