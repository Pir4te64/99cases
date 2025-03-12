import { motion } from 'framer-motion';

export default function AnimatedComponent() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 bg-blue-500 text-white rounded"
        >
            <h1 className="text-2xl">¡Hola Framer Motion!</h1>
        </motion.div>
    );
}
