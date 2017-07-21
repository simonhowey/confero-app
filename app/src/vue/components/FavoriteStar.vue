<template>
    <div>
        <v-ons-icon v-show="!isFavorite" @click="addFavorite()" icon="fa-star-o" size="30px" class="list-item__icon"></v-ons-icon>
        <v-ons-icon v-show="isFavorite" @click="removeFavorite()" icon="fa-star"  size="30px" class="list-item__icon"></v-ons-icon>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props: ['favoriteType', 'favoriteKey'],
        computed: {
            ...mapGetters({
                event: 'events/selectedEvent',
            }),
            isFavorite: function(){
                let favorites = this.$store.getters['events/selectedEventFavorites'];
                return favorites[this.favoriteType] && favorites[this.favoriteType].includes(this.favoriteKey);
            },
        },
        methods: {
            addFavorite(){
                this.$store.dispatch('events/addFavorite', {event: this.event, favoriteType: this.favoriteType, key: this.favoriteKey});
            },
            removeFavorite(){
                this.$store.dispatch('events/removeFavorite', {event: this.event, favoriteType: this.favoriteType, key: this.favoriteKey});
            },
        }
    };
</script>