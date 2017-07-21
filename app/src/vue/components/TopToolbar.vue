<template>
    <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button v-if="backLabel">
                {{ backLabel }}
            </v-ons-back-button>
        </div>
        <div class="center">{{ title }}</div>
        <div class="right">
            <v-ons-icon @click="selectInfo()" icon="fa-question-circle" size="30px" class="list-item__icon"></v-ons-icon>
        </div>
    </v-ons-toolbar>
</template>

<script>
    import InfoPage from '../pages/Info.vue';

    export default {
        props: ['title', 'backLabel'],
        methods: {
            selectInfo: function(){
                this.$store.commit('navigator/push', InfoPage);
            }
        }
    };
</script>