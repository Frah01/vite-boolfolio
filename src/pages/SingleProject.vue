<script>
    import { store } from '../store';
    import axios from 'axios';

    export default {
        name: 'SingleProject',
        data() {
            return {
                store,
                project: null,
                loading: true,
            }
        },
        mounted() {
            this.loading = true;
            axios.get(`${this.store.baseUrl}/api/projects/${this.$route.params.slug}`).then((response) => {
                this.project = response.data.project;
                this.loading = false;
            });
        }

    }
</script>
<template lang="">
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div v-if="loading" class="col-12 d-flex justify-content-center mt-5">
                <div class="loader"></div>
            </div>
            <div v-else class="col-6 mt-5">
                <div class="d-flex justify-content-end my-5">
                    <router-link :to="{ name: 'project_list'}" class="btn btn-sm btn-success">Torna ai
                        Progetti</router-link>
                </div>
                <div class="card mt-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-center">
                            <img :src="project.cover_image != null ? `${store.baseUrl}/storage/${project.cover_image}` : 'https://picsum.photos/300/200' "
                                class="img-fluid shadow">
                        </div>
                        <h2>{{ project.title }}</h2>
                        <p class="fw-semibold">Tecnologie:</p>
                        <p class="badge bg-primary mx-1" v-for="technology in project.technologies"
                            :key="technology.id">
                            {{technology.name}} </p>
                        <p>
                            <strong>Tipo:</strong>
                            <span class="fw-semibold mx-2">
                                {{project.type.name}}
                            </span>
                        </p>
                        <div calss="card-text py-1">
                            <strong>Contenuto:</strong>
                            <p>{{project.content}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .cover_img {
        width: 250px;
    }

    .loader {
        border: 16px solid #f3f3f3;
        /* Light grey */
        border-top: 16px solid #3498db;
        /* Blue */
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>