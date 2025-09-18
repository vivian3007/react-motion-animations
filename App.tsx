import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, AnimateSharedLayout, motion, useMotionValue} from "framer-motion";
import Accordion from "./Accordion";
import './style.css';
import Switch from "./Switch";
export default function App () {
    const accordionIds = [0, 1, 2, 3];
    const [expanded, setExpanded] = useState<false | number>(0);
    const [isActive, setIsActive] = useState<false | number>(0);
    const [isVisible, setVisible] = useState(true);
    const [index, setIndex] = useState(false);

    const ref = useRef(null);
    const { top, bottom } = useScrollConstraints(ref);
    const y = useMotionValue(0);

    return (
        <div>
            <div className="container">
                <motion.div className="motion-div" whileHover={{scale: 1.2}} whileTap={{scale: 0.8}}/>
                <motion.div className="motion-div" whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                            transition={{type: "spring", stiffness: 400, damping: 10}}/>
                <motion.div className="motion-div" animate={{
                    backgroundColor: ["#22dddd", "#fe0222"]
                }} transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                }}/>
                <motion.div className="motion-div"
                            whileHover={{scale: 1.1, rotate: 90}}
                />
                <motion.div className="motion-div"
                            whileTap={{scale: 0.9, rotate: 90, borderRadius: "100%"}}
                            transition={{duration: 0.6}}
                />
                <motion.div className="motion-div"
                            initial={{opacity: 0.3}}
                            whileHover={{opacity: 1}}
                            transition={{duration: 0.6}}
                />
                <motion.div
                    className="motion-div"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onTap={() => setVisible(!isVisible)}
                >
                    <AnimatePresence>
                        {isVisible && (
                            <motion.div
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 15,
                                    backgroundColor: "#fff"
                                }}
                                initial={{opacity: 0, scale: 0.75}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0}}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
                <motion.input whileFocus={{backgroundColor: "yellow"}}/>
                <Switch isActive={isActive} setIsActive={setIsActive}/>
            </div>
            <div className="container">
                <div className="container-accordion">
                    {accordionIds.map((accordionId) => (
                        <Accordion id={accordionId} expanded={expanded} setExpanded={setExpanded}/>
                    ))}
                </div>
                <Gallery items={colors} setIndex={setIndex}/>
                <AnimatePresence>
                    {index !== false && (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 0.6}}
                            exit={{opacity: 0}}
                            key="overlay"
                            className="overlay"
                            onClick={() => setIndex(false)}
                        />
                    )}

                    {index !== false && (
                        <SingleImage
                            key="image"
                            index={index}
                            color={colors[index]}
                            setIndex={setIndex}
                            onClick={() => setIndex(false)}
                        />
                    )}
                </AnimatePresence>
                <div className="scroll-container" ref={ref}>
                    <motion.div
                        drag="y"
                        dragConstraints={{top, bottom}}
                        className="scrollable"
                        style={{y}}
                    >
                        <div className="item"/>
                        <div className="item"/>
                        <div className="item"/>
                        <div className="item"/>
                        <div className="item"/>
                        <div className="item"/>
                        <div className="item"/>
                        <div className="item"/>
                    </motion.div>
                </div>
            </div>

        </div>
    );
}

function SingleImage({color, onClick}) {
    return (
        <div className="single-image-container" onClick={onClick}>
            <motion.div
                layoutId={color}
                className="single-image"
                style={{backgroundColor: color}}
            />
        </div>
    );
}

function Gallery({items, setIndex}) {
    return (
        <ul className="gallery-container">
            {items.map((color, i) => (
                <motion.li
                    className="gallery-item"
                    key={color}
                    onClick={() => setIndex(i)}
                    style={{backgroundColor: color}}
                    layoutId={color}
                />
            ))}
        </ul>
    );
}

const numColors = 3;
const makeColor = hue => `hsl(${hue}, 100%, 50%)`;
const colors = Array.from(Array(numColors)).map((_, i) =>
    makeColor(Math.round((360 / numColors) * i))
);

function useScrollConstraints(ref) {
    const [constraints, setConstraints] = useState({ top: 0, bottom: 0 });

    useEffect(() => {
        const element = ref.current;
        const viewportHeight = element.offsetHeight;
        const contentHeight = element.firstChild.offsetHeight;

        setConstraints({ top: viewportHeight - contentHeight, bottom: 0 });
    }, []);

    return constraints;
}