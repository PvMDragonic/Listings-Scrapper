<template>
    <div>
        <input 
            v-model = "searchText" 
            @input = "onInput" 
            placeholder = "Search term"
        >
    </div>
</template>
  
<script lang="ts">
    import { api } from '../api/api';
    
    type ProcessedData = 
    {
        title: string;
        rating: string;
        reviews: string;
        image: string;
    };

    export default 
    {
        data() 
        {
            return {
                searchText: '',
                debounceTimeout: null as number | null,
                results: [] as ProcessedData[]
            };
        },

        methods: 
        {
            onInput() 
            {
                clearTimeout(this.debounceTimeout!);
        
                this.debounceTimeout = setTimeout(
                    () => this.makePostRequest(), 500
                );
            },
    
            async makePostRequest() 
            {
                if (this.searchText.trim()) 
                {
                    try 
                    {
                        api.post('/process-data', {
                            searchTerm: this.searchText
                        }).then(response => {
                            console.log(response.data)
                            this.results = response.data;
                        });
                    } 
                    catch (error) 
                    {
                        console.error('Error making POST request:', error);
                    }
                }
            },
        },
    };
</script>