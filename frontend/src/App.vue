<template>
    <section class = 'home'>
        <h1 class = 'home__title'>
            LISTINGS SCRAPPER
        </h1>
        <div 
            ref = 'resizeElement'
            class = 'home__container'
            :style = 'divStyle'
        >
            <SearchBar 
                @updateListings = "updateListings"
            />
            <ul v-if = "listings && listings.length > 0">
                <li v-for = "(item, index) in listings" :key = "index">
                    <itemContainer
                        :imageUrl = "item.image"
                        :title = "item.title"
                        :rating = "item.rating"
                        :reviews = "item.reviews"
                    />
                </li>
            </ul> 
        </div>
    </section>
</template>

<script setup lang = "ts">
    import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
    import SearchBar from './components/searchBar.vue';
    import itemContainer from './components/itemContainer.vue';

    export type ProcessedData = 
    {
        title: string;
        rating: string;
        reviews: string;
        image: string;
    };

    const listings = ref<ProcessedData[]>([]);

    const resizeElement = ref<HTMLElement | null>(null);

    const divStyle = reactive({
        paddingRight: '16px',
        maxHeight: '4.125rem', 
        width: '20rem'
    });

    function updateListings(newValue: ProcessedData[]) 
    {
        listings.value = newValue;
    };

    onMounted(() => 
    {
        const resizeObserver = new ResizeObserver(() => 
        {
            if (resizeElement.value)
            {
                const { scrollHeight, clientHeight } = resizeElement.value;
                divStyle.paddingRight = scrollHeight > clientHeight ? '5px' : '16px';
                divStyle.width = listings.value && listings.value.length > 0 ? '60rem' : '20rem';
                divStyle.maxHeight = resizeElement.value.childElementCount === 1 ? '4.125rem' : '90%';
            }
        });

        if (resizeElement.value)
            resizeObserver.observe(resizeElement.value);

        onBeforeUnmount(() => resizeObserver.disconnect());
    });
</script>