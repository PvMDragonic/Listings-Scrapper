<template>
    <input 
        @input = "onInput" 
        v-model = "searchText"
        placeholder = "Search term"
        class = "input"
    >
</template>
  
<script setup lang = "ts">
    import { ref } from 'vue';
    import { api } from '../api/api';
    import type { ProcessedData } from '../App.vue';

    const searchText = ref('');
    const debounceTimeout = ref<number | null>(null);

    const emit = defineEmits<{
        (event: 'updateListings', listings: Array<ProcessedData>): void;
    }>();

    function onInput() 
    {
        if (debounceTimeout.value) 
            clearTimeout(debounceTimeout.value);

        debounceTimeout.value = setTimeout(
            () => makePostRequest(), 500
        );
    };

    async function makePostRequest() 
    {
        if (searchText.value.trim() === '')
            emit('updateListings', []);
        else
            try 
            {
                const response = await api.post('/process-data', {
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