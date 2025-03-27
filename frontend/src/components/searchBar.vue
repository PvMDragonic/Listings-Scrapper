<template>
    <div>
        <input 
            v-model = "searchText" 
            @input = "onInput" 
            placeholder = "Search term"
        >
    </div>
</template>
  
<script setup lang = "ts">
    import { ref } from 'vue';
    import { api } from '../api/api';

    type ProcessedData = 
    {
        title: string;
        rating: string;
        reviews: string;
        image: string;
    };

    const searchText = ref('');
    const debounceTimeout = ref<number | null>(null);
    const results = ref<ProcessedData[]>([]);

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
        if (searchText.value.trim()) 
        {
            try 
            {
                const response = await api.post('/process-data', {
                    searchTerm: searchText.value
                });

                results.value = response.data;
            } 
            catch (error) 
            {
                console.error('Error making POST request:', error);
            }
        }
    };
</script>