import { useEffect, useState } from "react"
import { StyleSheet, css } from "aphrodite"
import RegisterForm from '../components/Register/RegisterForm'
import SkillsSection from '../components/Register/SkillsSection'
import ExperienceSection from "../components/Experience/ExperienceSection"
import CertificationsSection from "../components/Register/CertificationsSection"
import EducationSection from "../components/Register/EducationSection"

const Register = () => {
  const [step, setStep] = useState(1)

  const changeStep = change => setStep(currentStep => currentStep + change)

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    skills: [],
    certifications: [],
    experienceLevel: '',
    highestDegree: '',
    fieldOfStudy: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target
    console.log(e.target.name)
    console.log(e.target.value)
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value
    }))
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const handleSaveCertification = (certificationInput) => {
    console.log(formData)
    setFormData(previousFormData => ({
      ...previousFormData,
      certifications: [...formData.certifications, certificationInput]
    }))
  }

  const handleRemoveCertification = (certification) => {
    console.log(formData)
    setFormData(previousFormData => ({
      ...previousFormData,
      certifications: formData.certifications.filter(exp => exp !== certification)
    }))
  }

  const handleSaveExperience = (skillInput) => {
    console.log(formData.skills)
    setFormData(previousFormData => ({
      ...previousFormData,
      skills: [...formData.skills, skillInput]
    }))
  }

  const handleRemoveExperience = (experience) => {
    console.log(formData.skills)
    setFormData(previousFormData => ({
      ...previousFormData,
      skills: formData.skills.filter(exp => exp !== experience)
    }))
  } 

  const handleExperienceLevel = (e) => {
    const {value} = e.target
    setFormData(previousFormData => ({
      ...previousFormData,
      experienceLevel: value
    }))
  }

  const handleDegreeOptionChange = selectedOption => {
    setFormData(previousData => ({
      ...previousData,
      highestDegree: selectedOption.value
    }))
  }

  return (
    <div className={css(styles.register)}>
      { step === 1 && <RegisterForm formData={formData} handleInputChange={handleInputChange} onStepChange={changeStep} /> }
      { step === 2 && <SkillsSection formData={formData} onSaveExperience={handleSaveExperience} onRemoveExperience={handleRemoveExperience} onStepChange={changeStep} /> }
      { step === 3 && <CertificationsSection formData={formData} onSaveCertification={handleSaveCertification} onRemoveCertification={handleRemoveCertification} onStepChange={changeStep} /> }
      { step === 4 && <ExperienceSection formData={formData} onChangeExpLevel={handleExperienceLevel} onStepChange={changeStep} /> }
      { step === 5 && <EducationSection formData={formData} handleInputChange={handleInputChange} onChangeDegree={handleDegreeOptionChange} onStepChange={changeStep} /> }
    </div>
  )
}

const styles = StyleSheet.create({
  register: {
    ':before': {
      content: '""',
      position: 'absolute',
      inset: '0',
      opacity: '0.7',
      backgroundImage: 'url("/imgs/register-pic.jpg")',
      backgroundSize: 'contain',
      backgroundPosition: 'center'
    }
  }
})

export default Register