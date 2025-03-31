<template>
    <svg
        width = "24"
        height = "24"
        viewBox = "0 0 24 24"
        xmlns = "http://www.w3.org/2000/svg"
    >
        <defs>
            <mask :id="'star-mask-' + uniqueId">
                <!-- Mask Shape -->
                <StarEmpty/>
                <!-- Black Rectangle to Control Fill -->
                <rect 
                    :width = "fillWidth" 
                    height = "24" 
                    fill = "black" 
                />
            </mask>
        </defs>
    
        <StarFull/>
    
        <g :mask="'url(#star-mask-' + uniqueId + ')'">
            <StarEmpty/>
        </g>
    </svg>
</template>

<script setup lang = "ts">
    import { computed } from "vue";
    import StarFull from "../assets/starFull.vue";
    import StarEmpty from "../assets/starEmpty.vue";

    const props = defineProps({
        index: { type: Number, required: true },
        rating: { type: String, required: true },
    });

    const fillPercentage = computed(() => 
    {
        const score = parseFloat(props.rating);

        if (props.index + 1 <= Math.floor(score)) 
            return 100; // Full star.
        
        if (props.index === Math.floor(score))
            return (score % 1) * 100; // Partial star.

        return 0; // Empty star.
    });

    const fillWidth = computed(() => (fillPercentage.value / 100) * 24);

    // Generate a unique ID to prevent conflicts.
    const uniqueId = Math.random().toString(36).substring(7);
</script>