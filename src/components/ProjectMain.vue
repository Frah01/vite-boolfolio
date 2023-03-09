<script>
    import ProjectCard from './ProjectCard.vue';
    import axios from 'axios';
    export default {
        name: "ProjectMain",
        components: {
            ProjectCard,
        },
        data() {
            return {
                projects: [],
                loading: true,
                baseUrl: 'http://127.0.0.1:8000',
                currentPage: 1,
                lastPage: null,
            }
        },
        methods: {
            getProjects(project_page) {
                this.loading = true;
                axios.get(`${this.baseUrl}/api/projects`, { params: { page: project_page } }).then((response) => {
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
        mounted() {
            this.getProjects(this.currentPage)
        }
    }
</script>
<template lang="">
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="text-center">Boolpress</h2>
                </div>
                <div v-if="loading" class="col-12 d-flex justify-content-center">
                    <div class="loader"></div>
                </div>
                <div v-else>
                    <div v-for="project in projects" :key="project.id">
                        <ProjectCard :baseUrl="baseUrl" :project="project" />
                    </div>
                </div>
                <div class="row">
                    <div class="col d-flex justify-content-center">
                        <nav>
                            <ul class="pagination">
                                <li :class="currentPage === 1 ? 'disabled' : 'page-item'">
                                    <button class="page-link" @click="getProjects(currentPage -1)">Prev</button>
                                </li>
                                <li :class="currentPage === 1 ? 'disabled' : 'page-item'" v-for="i in lastPage">
                                    <button class="page-link">{{ i }}</button>
                                </li>
                                <li :class="currentPage === lastPage ? 'disabled' : 'page-item'">
                                    <button class="page-link" @click="getProjects(currentPage +1)">Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>
<style lang="">

</style>