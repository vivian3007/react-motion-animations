import * as React from "react";
import { motion } from "framer-motion";

const menuItemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

const MenuItem = ({ i }) => {
    return (
        <motion.li
            className="menu-item-li"
            variants={menuItemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <div style={{backgroundColor: `${colors[i]}`}}><h1>{colors[i]}</h1></div>
        </motion.li>
    );
};

const navVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

export const Navigation = () => (
    <motion.ul className="menu-item-ul" variants={navVariants}>
        {[0, 1, 2, 3, 4].map((i) => (
            <MenuItem i={i} key={i} />
        ))}
    </motion.ul>
);

