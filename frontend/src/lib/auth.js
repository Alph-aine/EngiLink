import axios from 'axios'

export const getLoggedInEmployer = async () => {
  let user = null

  try {
    const res = await axios.get(`http://localhost:3000/api/v1/employer/me`, {
      withCredentials: true,
    })

    user = res.data?.user
  } catch (e) {
    console.log('Error loading employer data')
  }

  return user
}