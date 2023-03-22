import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionTitle}>Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        ClassName="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a beginner software developer with experience in JavaScript, Python,
        React, and SQL. I currently work for a Saas company as a Customer
        Success Manager and I'm looking to transition into a software
        development role. I'm currently learning ThreeJS and working on personal
        projects to improve my skills.
      </motion.p>
    </>
  );
};

export default About;
