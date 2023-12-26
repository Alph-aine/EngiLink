import { StyleSheet, css } from "aphrodite"
import { useState } from "react"
import Skill from "./Skill"

const Skills = ({ skillsList, onRemoveExperience }) => {
  // const skillsList = ["WordPress", "HTML", "CSS", "JavaScript", "BootStrap"]

  return (
    <div className={css(styles.skills)}>
      {skillsList.map((skill, index) => 
        <Skill
          key={index}
          text={skill}
          onRemoveExperience={onRemoveExperience}
        />)}
    </div>
  )
}

const styles = StyleSheet.create({
  skills: {
    display: 'flex',
    gap: '0.5em',
    flexWrap: 'wrap',
    color: '#fff',
    fontFamily: 'var(--accent-font)',
    backgroundColor: 'var(--)',
    border: '1px solid',

  },
})

export default Skills