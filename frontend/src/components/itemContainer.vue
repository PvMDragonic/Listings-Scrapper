<template>
    <div class = 'item-container'>
        <img 
            class = 'item-container__image'
            alt = 'Product image'
            :src = "imageUrl"
        />
        <div class = 'item-container__text-container'>
            <h3>{{ title }}</h3>
            <div :title="rating + ' out of 5'">
                <StarRating 
                    v-for = "index in 5" 
                    :key = "index" 
                    :index = "index - 1" 
                    :rating = "rating" 
                />
            </div> 
            <p>{{ reviews }}</p>
        </div>
    </div>
</template>

<script setup lang = "ts">
    import StarRating from './starRating.vue';

    defineProps<{
        imageUrl: string;
        title: string;
        rating: string;
        reviews: string;
    }>();
</script>