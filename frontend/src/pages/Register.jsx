import { useState } from "react"
import RegisterForm from '../components/Register/RegisterForm'
import SkillsSection from '../components/Register/SkillsSection'
import ExperienceSection from "../components/Experience/ExperienceSection"
import CertificationsSection from "../components/Register/CertificationsSection"
import EducationSection from "../components/Register/EducationSection"

const Register = ({ setAuth }) => {
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
    experiences: [],
    certifications: [],
    selectedLevel: '',
    highestDegree: '',
    fieldStudy: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value
    }))
  }

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
    console.log(formData.experiences)
    setFormData(previousFormData => ({
      ...previousFormData,
      experiences: [...formData.experiences, skillInput]
    }))
  }

  const handleRemoveExperience = (experience) => {
    console.log(formData.experiences)
    setFormData(previousFormData => ({
      ...previousFormData,
      experiences: formData.experiences.filter(exp => exp !== experience)
    }))
  } 

  const handleExperienceLevel = (e) => {
    const {value} = e.target
    setFormData(previousFormData => ({
      ...previousFormData,
      selectedLevel: value
    }))
  }

  const handleDegreeOptionChange = selectedOption => {
    setFormData(previousData => ({
      ...previousData,
      highestDegree: selectedOption.value
    }))
  }

  return (
    <div>
      { step === 1 && <RegisterForm formData={formData} handleInputChange={handleInputChange} onStepChange={changeStep} /> }
      { step === 2 && <SkillsSection formData={formData} onSaveExperience={handleSaveExperience} onRemoveExperience={handleRemoveExperience} onStepChange={changeStep} /> }
      { step === 3 && <CertificationsSection formData={formData} onSaveCertification={handleSaveCertification} onRemoveCertification={handleRemoveCertification} onStepChange={changeStep} /> }
      { step === 4 && <ExperienceSection formData={formData} onChangeExpLevel={handleExperienceLevel} onStepChange={changeStep} /> }
      { step === 5 && <EducationSection formData={formData} handleInputChange={handleInputChange} onChangeDegree={handleDegreeOptionChange} onStepChange={changeStep} /> }
    </div>
  )
}



export default Register