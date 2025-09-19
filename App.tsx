import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, AnimateSharedLayout, motion, useCycle, useMotionValue} from "framer-motion";
import Accordion from "./Accordion";
import './style.css';
import Switch from "./Switch";
import Checkbox from "./Checkbox";
import {MenuToggle} from "./MenuToggle";
import {Navigation} from "./Navigation";

const numColors = 3;
const makeColor = hue => `hsl(${hue}, 100%, 50%)`;
const colors = Array.from(Array(numColors)).map((_, i) =>
    makeColor(Math.round((360 / numColors) * i))
);

const short = "In de stille ochtend, waar dauwdruppels glinsteren op het gras, begint de dag met een zachte belofte van hoop. De zon klimt langzaam boven de horizon, haar warme stralen omhelzen de wereld en wekken de natuur tot leven."
const long = "In de stille ochtend, waar dauwdruppels glinsteren op het gras, begint de dag met een zachte belofte van hoop. De zon klimt langzaam boven de horizon, haar warme stralen omhelzen de wereld en wekken de natuur tot leven. Vogels beginnen te zingen, hun melodieën vullen de lucht met een symfonie van vreugde. In de verte klinkt het zachte ruisen van een beek, terwijl een koele bries de bladeren van oude eikenbomen streelt. De wereld lijkt even stil te staan, alsof de tijd zelf pauzeert om dit moment van pure schoonheid te eren. Mensen ontwaken, hun gedachten nog wazig van dromen, en stappen een nieuwe dag in, klaar om verhalen te schrijven die zich mengen met de eeuwige cyclus van het leven. Elke stap op het pad, elke ademhaling, voelt als een viering van het bestaan, een dans met het universum dat in al zijn grootsheid toch zo intiem en dichtbij voelt."

const tabs = ["orders", "products", "sectors"];

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};

export default function App() {
    const accordionIds = [0, 1, 2, 3];
    const [expanded, setExpanded] = useState<false | number>(0);
    const [isActive, setIsActive] = useState<false | number>(0);
    const [isVisible, setVisible] = useState(true);
    const [index, setIndex] = useState(false);
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const [isNavOpen, toggleOpen] = useCycle(false, true);

    const ref = useRef(null);
    const {top, bottom} = useTouchConstraints(ref);
    const y = useMotionValue(0);

    const containerRef = useRef(null);

    return (
        <div>
            <div className="container">
                <motion.nav
                    className="hamburger-nav"
                    initial={false}
                    animate={isNavOpen ? "open" : "closed"}
                    ref={containerRef}
                >
                    <motion.div className="background" variants={sidebar}/>
                    <Navigation/>
                    <MenuToggle toggle={() => toggleOpen()}/>
                </motion.nav>
                <motion.nav
                    initial={false}
                    animate={isMenuOpen ? "open" : "closed"}
                    className="menu"
                >
                    <motion.button
                        className="menu-button"
                        whileTap={{scale: 0.97}}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        Menu
                        <motion.div
                            variants={{
                                open: {rotate: 180},
                                closed: {rotate: 0}
                            }}
                            transition={{duration: 0.2}}
                            style={{originY: 0.55}}
                        >
                            <svg width="15" height="15" viewBox="0 0 20 20">
                                <path d="M0 7 L 20 7 L 10 16"/>
                            </svg>
                        </motion.div>
                    </motion.button>
                    <motion.ul
                        className="menu-ul"
                        variants={{
                            open: {
                                clipPath: "inset(0% 0% 0% 0% round 10px)",
                                transition: {
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.7,
                                    delayChildren: 0.3,
                                    staggerChildren: 0.05
                                }
                            },
                            closed: {
                                clipPath: "inset(10% 50% 90% 50% round 10px)",
                                transition: {
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.3
                                }
                            }
                        }}
                        style={{pointerEvents: isMenuOpen ? "auto" : "none"}}
                    >
                        <motion.li
                            className="menu-li"
                            variants={{
                                open: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {type: "spring", stiffness: 300, damping: 24}
                                },
                                closed: {opacity: 0, y: 20, transition: {duration: 0.2}}
                            }}>Item 1
                        </motion.li>
                        <motion.li
                            className="menu-li"
                            variants={{
                                open: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {type: "spring", stiffness: 300, damping: 24}
                                },
                                closed: {opacity: 0, y: 20, transition: {duration: 0.2}}
                            }}>Item 2
                        </motion.li>
                        <motion.li
                            className="menu-li"
                            variants={{
                                open: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {type: "spring", stiffness: 300, damping: 24}
                                },
                                closed: {opacity: 0, y: 20, transition: {duration: 0.2}}
                            }}>Item 3
                        </motion.li>
                        <motion.li
                            className="menu-li"
                            variants={{
                                open: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {type: "spring", stiffness: 300, damping: 24}
                                },
                                closed: {opacity: 0, y: 20, transition: {duration: 0.2}}
                            }}>Item 4
                        </motion.li>
                        <motion.li
                            className="menu-li"
                            variants={{
                                open: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {type: "spring", stiffness: 300, damping: 24}
                                },
                                closed: {opacity: 0, y: 20, transition: {duration: 0.2}}
                            }}>Item 5
                        </motion.li>
                    </motion.ul>
                </motion.nav>
                <motion.div className="motion-div" whileHover={{scale: 1.2}} whileTap={{scale: 0.8}}
                            style={{marginLeft: "50px"}}/>
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
                <Checkbox/>

            </div>
            <div className="container">
                <div className="container-accordion">
                    {accordionIds.map((accordionId) => (
                        <Accordion id={accordionId} expanded={expanded} setExpanded={setExpanded}/>
                    ))}
                </div>
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
                <motion.div
                    layout
                    transition={{duration: 1}}
                    onClick={() => setIsCollapseOpen(!isCollapseOpen)}
                    style={{
                        backgroundColor: "hotpink",
                        padding: 40,
                        overflow: "hidden",
                        maxWidth: 200,
                        margin: "20px",
                        borderRadius: "30px",
                        cursor: "pointer"
                    }}
                >
                    <motion.div layout="position" transition={{duration: 1.5}}>
                        {isCollapseOpen ? long : short}
                    </motion.div>
                </motion.div>
                <ul className="tab-ul">
                    {tabs.map((item) => (
                        <li
                            key={item}
                            className={`tab-li ${selectedTab ? "selected" : ""}`}
                            onClick={() => setSelectedTab(item)}
                        >
                            {`${item}`}
                            {item === selectedTab ? (
                                <motion.div className="underline" layoutId="underline"/>
                            ) : null}
                        </li>
                    ))}
                </ul>
                <div className="dot-container">
                    <motion.div
                        className="dot"
                        animate={{scale: [0.75, 1]}}
                        transition={{
                            repeat: Infinity,
                            repeatType: "mirror",
                            duration: 0.9,
                            delay: -0.9
                        }}
                    />
                    <motion.div
                        className="dot"
                        animate={{scale: [0.75, 1]}}
                        transition={{
                            repeat: Infinity,
                            repeatType: "mirror",
                            duration: 0.9,
                            delay: -0.6
                        }}
                    />
                    <motion.div
                        className="dot"
                        animate={{scale: [0.75, 1]}}
                        transition={{
                            repeat: Infinity,
                            repeatType: "mirror",
                            duration: 0.9,
                            delay: -0.3
                        }}
                    />
                </div>
                <motion.input whileFocus={{backgroundColor: "yellow"}}/>
                <Switch isActive={isActive} setIsActive={setIsActive}/>
            </div>
            <div className="container">
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
            </div>

        </div>
    );
}

function SingleImage({
                         color, onClick
                     }) {
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

function Gallery({
                     items, setIndex
                 }) {
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


function useTouchConstraints(ref) {
    const [constraints, setConstraints] = useState({top: 0, bottom: 0});

    useEffect(() => {
        const element = ref.current;
        const viewportHeight = element.offsetHeight;
        const contentHeight = element.firstChild.offsetHeight;

        setConstraints({top: viewportHeight - contentHeight, bottom: 0});
    }, []);

    return constraints;
}
