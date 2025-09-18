import React from 'react'
import {AnimatePresence, motion} from "framer-motion";

export default function Accordion ({id, expanded, setExpanded}) {
    const isOpen = id === expanded;
    return(
        <div>
            <motion.header
                initial={false}
                animate={{backgroundColor: isOpen ? "#FF0088" : "#0055FF"}}
                onClick={() => setExpanded(isOpen ? false : id)}
            />
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: {opacity: 1, height: "auto"},
                            collapsed: {opacity: 0, height: 0}
                        }}
                        transition={{duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98]}}
                    >
                        <div style={{height: "150px"}}></div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    )
}