<script>
    import axios from 'axios'
    import { store } from '../store';
    export default {
        name: 'Contacts',
        data() {
            return {
                store,
                name: '',
                surname: '',
                email: '',
                phone: '',
                message: '',
                errors: {},
                success: false,
                loading: false,
            }
        },
        methods: {
            sendForm() {
                const data = {
                    name: this.name,
                    surname: this.surname,
                    email: this.email,
                    phone: this.phone,
                    message: this.message,
                }
               
                this.loading = true;
                axios.post(`${this.store.baseUrl}/api/contacts`, data).then((response) => {
                    if (!response.data.success) {
                        this.errors = response.data.errors;
                        this.loading = false;
                    }
                    else {
                        this.name = '';
                        this.surname = '';
                        this.email = '';
                        this.phone = '';
                        this.message = '';
                        this.success = true;
                        this.loading = false;
                        this.$router.push({ 'name': 'thank-you'})
                    }
                });
            }
        }
    }
</script>
<template lang="">
    <div class="container">
        <div class="row">
            <div class="col-12 my-5">
                <h2 class="text-center mt-5">Pagina Contatti</h2>
            </div>
        </div>
        <div class="col-12">
            <h5 class="text-center">Informazioni di contatto</h5>
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="text-center">
                        <div class="mt-2">
                            <span class="fw-semibold"><i class="fas fa-map me-2"></i> Indirizzo:</span>Via a casuale,
                            Num, Citt?? CAP
                            (PROVINCIA)
                        </div>
                        <div class="mt-2">
                            <span class="fw-semibold"><i class="fas fa-book me-2"></i>Partita Iva:</span> 21948904180
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="col-12">
                        <div class="text-center">
                            <div class="mt-2">
                                <span class="fw-semibold"><i class="fas fa-phone me-2"></i> Telefono:</span> 3295894852
                            </div>
                            <div class="mt-2">
                                <span class="fw-semibold"><i class="fas fa-envelope me-2"></i>Email:</span>
                                fraboolpress@mail.com
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 mt-4">
                    <h2>Contattaci</h2>
                    <form @submit.prevent="sendForm" action="POST">
                        <div class="row">
                            <div class="col-12 col-md-6 my-2">
                                <label for="nome" class="control-label fw-semibold mb-3">Nome</label>
                                <input type="text" class="form-control" name="nome" id="nome"
                                    placeholder="Inserisci nome.." v-model="name">
                                <div  v-for="(error, index) in errors.name"
                                    :key="`message-error-${index}`" class="text-danger">
                                    {{error}}
                                </div>
                            </div>
                            <div class="col-12 col-md-6 my-2">
                                <label for="cognome" class="control-label fw-semibold mb-3">Cognome</label>
                                <input type="text" class="form-control" name="cognome" id="cognome"
                                    placeholder="Inserisci cognome.." v-model="surname">
                                <div  v-for="(error, index) in errors.surname"
                                    :key="`message-error-${index}`" class="text-danger">
                                    {{error}}
                                </div>
                            </div>
                            <div class="col-12 col-md-6 my-2">
                                <label for="email" class="control-label fw-semibold mb-3">Email</label>
                                <input type="text" class="form-control" name="email" id="email"
                                    placeholder="Inserisci email.." v-model="email">
                                <div  v-for="(error, index) in errors.email"
                                    :key="`message-error-${index}`" class="text-danger">
                                    {{error}}
                                </div>
                            </div>
                            <div class="col-12 col-md-6 my-2">
                                <label for="telefono" class="control-label fw-semibold mb-3">Telefono</label>
                                <input type="text" class="form-control" name="telefono" id="telefono"
                                    placeholder="Inserisci telefono.." v-model="phone">
                                <div  v-for="(error, index) in errors.phone"
                                    :key="`message-error-${index}`" class="text-danger">
                                    {{error}}
                                </div>
                            </div>
                            <div class="col-12  my-2">
                                <label for="Messaggio" class="control-label fw-semibold mb-3">Messaggio</label>
                                <textarea class="form-control" name="messaggio" id="messaggio" cols="30" rows="10"
                                    placeholder="Inserisci messaggio.." v-model="message"></textarea>
                                <div  v-for="(error, index) in errors.message"
                                    :key="`message-error-${index}`" class="text-danger">
                                    {{error}}
                                </div>
                            </div>
                            <div class="col-12 my-2">
                                <button type="submit" class="btn btn-success" :disabled="loading">{{loading ? 'Invio richiesta..' : 'Invia' }}</button>
                            </div>
                            <div class="col-12 my-5" v-if="success">
                                <p class="fw-semibold">Richiesta inviata correttamente</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="">

</style>