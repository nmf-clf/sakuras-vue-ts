import { reactive, onMounted, onUnmounted } from 'vue';

export default function useCounter() {
    const state = reactive({
        count: 0
    });

    const increment = () => {
        state.count++;
    };

    onMounted(() => {
        console.log('Mounted');
    });

    onUnmounted(() => {
        console.log('Unmounted');
    });

    return {
        state,
        increment
    };
}