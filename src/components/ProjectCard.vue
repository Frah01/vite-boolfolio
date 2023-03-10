<script>
import { store } from '../store';
    export default {
        name: 'ProjectCard',
        props: {
            project: Object,
        },
        data(){
            return{
                store
            }
        }
    }

</script>
<template lang="">
    <div class="col-lg-6 d-flex justify-content-center flex-wrap">
        <div class="card my-3">
            <div class="card-body">
                <div class="card-img-top d-flex justify-content-center">
                    <img class="img-fluid"
                        :src="project.cover_image != null ? `${store.baseUrl}/storage/${project.cover_image}` : 'https://picsum.photos/300/200' ">
                </div>
                <div class="card-title py-1">
                    <h5>{{project.title}}</h5>
                    <p class="fw-semibold">Tecnologie:</p>
                    <p class="badge bg-primary mx-1" v-for="technology in project.technologies" :key="technology.id">
                        {{technology.name}} </p>
                    <p>
                        <strong>Tipo:</strong>
                        <span class="fw-semibold mx-2">
                            {{project.type.name}}
                        </span>
                    </p>
                </div>
                <div calss="card-text py-1">
                    <strong>Contenuto:</strong>
                    <p>{{project.content}}</p>
                </div>
                <router-link :to="{name: 'single-project', params: { slug: project.slug}}" class="btn btn-sm btn-success">Leggi il Progetto</router-link>
            </div>
        </div>

    </div>
</template>
<style lang="">

</style>