import React, { useState } from 'react';
import { motion } from 'framer-motion';

const checkVariants = {
    checked: {
        pathLength: 1,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: 'easeInOut'
        }
    },
    unchecked: {
        pathLength: 0,
        opacity: 0,
        transition: {
            duration: 0.6,
            ease: 'easeInOut'
        }
    }
};

const boxVariants = {
    checked: {
        backgroundColor: "hotpink",
        transition: { duration: 2, ease: 'easeInOut' }
    },
    unchecked: {
        backgroundColor: '#E5E7EB',
        transition: { duration: 2, ease: 'easeInOut' }
    }
};

const Checkbox = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <motion.div
            className="checkbox"
            variants={boxVariants}
            animate={isChecked ? 'checked' : 'unchecked'}
            onClick={() => setIsChecked(!isChecked)}
        >
            <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
            >
                <motion.path
                    d="M5 13l4 4L19 7"
                    variants={checkVariants}
                    animate={isChecked ? 'checked' : 'unchecked'}
                />
            </svg>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="hidden"
            />
        </motion.div>
    );
};

export default Checkbox;