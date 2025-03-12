import AnimatedComponent from '../components/AnimatedComponent';
import useStore from '../store/store';
export default function Home() {
    const { count, increment, decrement } = useStore();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Zustand Counter</h1>
            <p className="text-xl mb-4">Count: {count}</p>
            <button
                onClick={increment}
                className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Increment
            </button>
            <button
                onClick={decrement}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                Decrement
            </button>
            <AnimatedComponent />
        </div>
    );
}
