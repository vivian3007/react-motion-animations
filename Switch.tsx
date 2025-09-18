import React from 'react'
import {MotionConfig, motion} from "framer-motion";
export default function Switch({ isActive, setIsActive }) {
    return (
        <MotionConfig transition={{ duration: 0.3, ease: "easeOut" }}>
            <motion.div
                className="switch"
                initial={false}
                animate={{ backgroundColor: isActive ? "blue" : "hotpink" }}
                onClick={() => {setIsActive(!isActive)}}
                style={{ justifyContent: isActive ? "flex-end" : "flex-start" }}
            >
                <motion.div layout className="handle" />
            </motion.div>
        </MotionConfig>
    );
}