<script>
import axios from 'axios';
export default {
    name: "ProjectMain",
    data(){
        return{
            projects: [],
            loading: true,
            baseUrl: 'http://127.0.0.1:8000',
            currentPage: 1,
            lastPage: null,
        }
    },
    methods:{
        getProjects(project_page){
            this.loading = true;
            axios.get(`${this.baseUrl}/api/projects`,{params: {page: project_page}}).then((response) =>{
                //PRIMO METODO SENZA RICHIAMO DEL NUMERO DI CARD DA VISUALIZZARE IN UNA PAGINA
                //this.project = response.data.projects      //.projects fa riferimento alla keyword scritta in project controller su laravel
                //this.loading = false;

                //SECONDO METODO CON RICHIAMO DEL NUMERO DELLE CARD DA VISUALIZZARE IN UNA PAGINA
                this.projects = response.data.results.data   
                this.currentPage = response.data.results.current_page;
                this.lastPage = response.data.results.last_page;
                this.loading = false;

            });
        }
    },
    mounted(){
        this.getProjects(this.currentPage)
    }   
}
</script>
<template lang="">
   <div>
    <div class="container">
        <div class="row">
            <div class="col">
                <h2 class="text-center">Boolpress</h2>
            </div>
            <div class="col">
                <div v-if="loading" class="col-12 d-flex justify-content-center">
                    <div class="loader"></div>
                </div>
                <div v-else class="col-12 d-flex justify-content-center flex-wrap">
                    <div class="col-12">
                        <div  v-for="project in projects" :key="project.id">
                            <div class="card my-3">
                                <div class="card-body">
                                    <div class="card-img-top">
                                        <img class="img-fluid" :src="project.cover_image != null ? `${baseUrl}/storage/${project.cover_image}` : 'https://picsum.photos/300/200' ">
                                    </div>
                                    <div class="card-title py-1">
                                        <h5>{{project.title}}</h5>
                                        <p class="fw-semibold">Tecnologie:</p>
                                        <p v-for="technology in project.technologies" :key="technology.id">{{technology.name}} </p>
                                        <p>
                                            <strong>Tipo:</strong>
                                            <span class="badge bg-primary mx-1"  >
                                                {{project.type.name}}
                                            </span>
                                         </p>
                                    </div>
                                    <div calss="card-text py-1">
                                        <p>{{project.content}}</p>
                                    </div>
                                    <a href="#" class="btn btn-sm btn-success">Leggi Il Progetto</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <nav>
                                <ul class="pagination">
                                    <li  :class="currentPage === 1 ? 'disabled' : 'page-item'">
                                        <button class="page-link" @click="getProjects(currentPage -1)">Prev</button>
                                    </li>
                                    <li :class="currentPage === 1 ? 'disabled' : 'page-item'" v-for="i in lastPage">
                                        <button class="page-link">{{ i }}</button>
                                    </li>
                                    <li  :class="currentPage === lastPage ? 'disabled' : 'page-item'">
                                        <button class="page-link" @click="getProjects(currentPage +1)">Next</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<style lang="">
    
</style>