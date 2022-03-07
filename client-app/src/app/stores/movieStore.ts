import {  makeObservable, observable, runInAction} from "mobx";
import agent from "../api/agent";
import { Movie } from "../models/movie";
import {format} from 'date-fns';



export default class MovieStore{
@observable movieRegistry = new Map<string, Movie>();
@observable selectedMovie: Movie | undefined= undefined;
@observable editMode = false;
@observable loading = false;
@observable loadingInitial = false;

constructor(){ 
    makeObservable(this); 
    }

    get moviesByDate(){
    return Array.from(this.movieRegistry.values()).sort((a, b) =>
    a.date!.getTime() - b.date!.getTime());
    }

    get groupedMovies(){
return Object.entries(
    this.moviesByDate.reduce((movies, movie) =>{
        const date = format(movie.date!, 'dd MMM yyyy h:mm aa' );
        movies[date] = movies[date] ? [...movies[date], movie] : [movie];
        return movies;
    }, {} as {[key: string]: Movie[]} )
)
    }

    loadMovies = async () => {
        this.loadingInitial = true;
        try{
         const movies = await agent.Movies.list();
            movies.forEach(movie =>{
               this.setMovie(movie);
              })
              this.setLoadingInitial(false);
        }catch (error){
            console.log(error);
                this.setLoadingInitial(false);    
        }
    }

    loadMovie = async (id: string) =>{
        let movie = this.getMovie(id);
        if (movie){
            this.selectedMovie = movie;
            return movie;
        }else {
            this.loadingInitial = true;
            try{
                movie = await agent.Movies.details(id);
                this.setMovie(movie);
                runInAction(()=>{
                    this.selectedMovie = movie;
                })
                this.setLoadingInitial(false);
                return movie;
            } catch (error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setMovie = (movie: Movie) =>{
        movie.date = new Date(movie.date!);
        this.movieRegistry.set(movie.id, movie);
    }

    private getMovie =(id: string) => {
        return this.movieRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) =>{
        this.loadingInitial = state;
    }
    createMovie = async (movie: Movie) => {
        this.loading = true;
        try{
            await agent.Movies.create(movie);
            runInAction(() =>{
                this.movieRegistry.set(movie.id, movie);
                this.selectedMovie = movie;
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
    updateMovie = async (movie: Movie) => {
        this.loading = true;
        try{
            await agent.Movies.update(movie);
            runInAction(()=>{
              this.movieRegistry.set(movie.id, movie);
              this.selectedMovie = movie;
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

    deleteMovie = async (id: string) =>{
        this.loading = true;
        try{    
            await agent.Movies.delete(id);
            runInAction(()=>{
                this.movieRegistry.delete(id);
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


