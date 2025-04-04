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
            <div class = 'home__header'>
                <RegionSelector
                    v-model:regionDomain = "regionDomain"
                    v-model:parentRef = "resizeElement"
                    @update-region = "updateRegion"
                />
                <SearchBar 
                    v-model:regionDomain = "regionDomain"
                    @updateLoading = "updateLoading"
                    @updateListings = "updateListings"
                />
            </div>
            <div 
                v-if = "showLoading"
                class = 'home__loading'
            >
                <Loading/>
            </div>
            <div v-if = "!showLoading && listings && listings.length > 0">
                <div class = "home__counter">
                    <h2>
                        {{ listings.length > 0 ? `${listings.length} listings found:` : 'No item(s) found.' }}
                    </h2>
                </div>
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
        </div>
    </section>
</template>

<script setup lang = "ts">
    import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
    import SearchBar from './components/searchBar.vue';
    import itemContainer from './components/itemContainer.vue';
    import RegionSelector from './components/regionSelector.vue';
    import Loading from './assets/loading.vue';

    export type ProcessedData = 
    {
        title: string;
        rating: string;
        reviews: string;
        image: string;
    };

    const listings = ref<ProcessedData[]>([]);
    const resizeElement = ref<HTMLElement | null>(null);
    const regionDomain = ref('.com');
    const showLoading = ref(false);

    const divStyle = reactive({
        paddingRight: '16px',
        maxHeight: '4.125rem', 
        width: '20rem'
    });

    function updateRegion(newRegion: string)
    {
        regionDomain.value = newRegion;
    }

    function updateLoading(newValue: boolean)
    {
        showLoading.value = newValue;
    }

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