<template>
    <button 
        ref = buttonRef
        class = 'region-selector'
        @click = "showMenu = !showMenu"
    >
        {{ regionDomain }}
    </button>
    <div
        v-if = "showMenu"
        ref = menuRef
        class = 'region-selector__container'
        :style = "{ 
            top: position.top, 
            left: position.left,
        }"
    >
        <button
            title = 'USA'
            class = 'region-selector__button'
            :style = "{ fontSize: '0.6rem' }"
            @click = "emit('updateRegion', '.com')"
        >
            .com
        </button>
        <button
            title = 'Mexico'
            class = 'region-selector__button'
            @click = "emit('updateRegion', '.mx')"
        >
            .mx
        </button>
        <button
            title = 'Brazil'
            class = 'region-selector__button'
            @click = "emit('updateRegion', '.br')"
        >
            .br
        </button>
        <button
            title = 'United Kingdom'
            class = 'region-selector__button'
            @click = "emit('updateRegion', '.uk')"
        >
            .uk
        </button>
        <button
            title = 'Germany'
            class = 'region-selector__button'
            @click = "emit('updateRegion', '.de')"
        >
            .de
        </button>
        <button
            title = 'France'
            class = 'region-selector__button'
            @click = "emit('updateRegion', '.fr')"
        >
            .fr
        </button>
        <button
            title = 'Italy'
            class = 'region-selector__button'
            @click = "emit('updateRegion', '.it')"
        >
            .it
        </button>
        <button
            title = 'Spain'
            class = 'region-selector__button'
            @click = "emit('updateRegion', '.es')"
        >
            .es
        </button>
        <button
            title = 'India'
            class = 'region-selector__button'
            @click = "emit('updateRegion', '.in')"
        >
            .in
        </button>
        <button
            title = 'Japan'
            class = 'region-selector__button'
            @click = "emit('updateRegion', '.jp')"
        >
            .jp
        </button>
    </div>
</template>

<script setup lang = "ts">
    import { onBeforeUnmount, onMounted, watch, ref } from 'vue';

    const showMenu = ref(false);
    const buttonRef = ref<HTMLElement | null>(null);
    const menuRef = ref<HTMLElement | null>(null);
    const position = ref({ top: '0px', left: '0px' });

    const props = defineProps<{
        regionDomain: String,
        parentRef: HTMLElement | null // Turns into an actual HTMLElement instead of a Ref<Type>.
    }>();

    const emit = defineEmits<{
        (event: 'updateRegion', regionDomain: string): void;
    }>();

    function updatePosition() 
    {
        if (buttonRef.value) 
        {
            const rect = buttonRef.value.getBoundingClientRect();
            position.value = { 
                top: `${rect.top + 25}px`, 
                left: `${rect.left + 1}px` 
            };
        }
    };

    function handleClickOutside(event: MouseEvent)
    {
        const clickedButton = buttonRef.value && buttonRef.value.contains(event.target as Node);
        const clickedRegionsDiv = menuRef.value && menuRef.value.contains(event.target as Node);

        if (!clickedButton && !clickedRegionsDiv) 
            showMenu.value = false;
    }

    let resizeObserver: ResizeObserver | null = null;

    watch(() => props.parentRef as HTMLElement, (element: HTMLElement) => 
    {
        if (!element) 
            return;

        if (resizeObserver) 
            resizeObserver.disconnect();

        // Positions the region selection menu under the region button at load and 
        // when the main container changes in size (due to search or window resizing).
        resizeObserver = new ResizeObserver(updatePosition);

        resizeObserver.observe(element);
    });

    onBeforeUnmount(() => 
    {
        if (resizeObserver) 
            resizeObserver.disconnect();
    });

    onMounted(() =>
    {
        // If the parentRef <div> is already at max size, it won't trigger the ResizeObserver.
        window.addEventListener('resize', updatePosition);
        document.addEventListener('click', handleClickOutside);

        onBeforeUnmount(() => 
        {
            window.removeEventListener('resize', updatePosition)
            document.removeEventListener('click', handleClickOutside)
        });
    });
</script>