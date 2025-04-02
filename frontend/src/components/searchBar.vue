<template>
    <div class = 'input'>
        <input 
            @input = "onInput" 
            v-model = "searchText"
            placeholder = "Search term"
            class = "input__search"
        >
        <button 
            v-if = "searchText !== ''"
            @click = "handleSearchReset"
            class = "input__clear"
            title = "Clear search"
            type = "button"
        >
            <ClearButton/>
        </button>
    </div>
</template>
  
<script setup lang = "ts">
    import { ref, toRef, watch } from 'vue';
    import { api } from '../api/api';
    import type { ProcessedData } from '../App.vue';
    import ClearButton from '../assets/clearButton.vue';

    const searchText = ref('');
    const debounceTimeout = ref<number | null>(null);

    const props = defineProps({
        regionDomain: String
    });

    const emit = defineEmits<{
        (event: 'updateListings', listings: Array<ProcessedData>): void;
    }>();

    // Something something Vue needs reactivity to watch() this prop.
    const regionDomain = toRef(props, 'regionDomain');

    // Will run the search again when a region gets selected.
    watch(regionDomain, () => onInput());

    function onInput() 
    {
        if (debounceTimeout.value) 
            clearTimeout(debounceTimeout.value);

        debounceTimeout.value = setTimeout(
            () => makePostRequest(), 500
        );
    };

    function handleSearchReset()
    {
        searchText.value = '';
        emit('updateListings', []);
    }

    async function makePostRequest() 
    {
        if (searchText.value.trim() === '')
            return;

        try 
        {
            const response = await api.post('/process-data', {
                regionDomain: props.regionDomain,
                searchTerm: searchText.value
            });
            
            emit('updateListings', response.data);
        } 
        catch (error) 
        {
            console.error('Error making POST request:', error);
        }   
    }    
</script>