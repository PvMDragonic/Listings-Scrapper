<template>
    <div class = 'item-container'>
        <img 
            class = 'item-container__image'
            alt = 'Product image'
            :src = "imageUrl"
        />
        <div class = 'item-container__text-container'>
            <h3>{{ title }}</h3>
            <p>{{ rating }}</p>
            <p>{{ reviews }} reviews</p>
        </div>
    </div>
</template>

<script setup lang = "ts">
    defineProps<{
        imageUrl: string;
        title: string;
        rating: string;
        reviews: string;
    }>();
</script>