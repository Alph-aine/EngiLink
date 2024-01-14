import { redirect, useLoaderData } from 'react-router-dom'
import Button from '../../components/button'
import Text from '../../components/text'
import Layout from '../../components/layout'

export const proposalLoader = async ({ params }) => {
  const { employerId, proposalId, jobId } = params
  const user = await getLoggedInEmployer()
  if (!user) return redirect('/employer/auth/signin')

  let proposal = null

  try {
    res = await axios.get(`http://localhost:3000/api/v1/proposal/${proposalId}`)

    proposal = res.data?.proposal
  } catch (e) {
    console.log('An error occurred while loading proposal data')
  }

  if (!proposal)
    return redirect(`employer/${employerId}/jobs/${jobId}/proposals`)
  return { proposal, user }
}

export default function Proposal() {
  const {
    proposal: { job, coverLetter, price },
    user,
  } = useLoaderData()

  return (
    <Layout companyName={user.companyName}>
      <div className='grid lg:grid-cols-12 grid-cols-1 place-items-stretch gap-16 lg:px-16 px-0'>
        <div className='col-span-full flex flex-col gap-12'>
          <div className='flex flex-col gap-5 w-full'>
            <Text size='md'>About Job</Text>
            <div className='flex flex-col gap-5 p-8 rounded-md border border-bg-secondary'>
              <div className='flex flex-col gap-1 uppercase'>
                <Text size='xs'>ID</Text>
                <Text size='sm'>{job}</Text>
              </div>
              <Button
                cx='bg-primary w-fit'
                onClick={() => navigate(`/employer/${user._id}/jobs/${job}`)}
              >
                SEE JOB
              </Button>
            </div>
          </div>
          <div className='flex flex-col gap-10 w-full'>
            <div className='flex justify-between items-center gap-5'>
              <div className='flex flex-col gap-1 uppercase'>
                <Text size='sm'>BID</Text>
                <Text size='md'>{price}</Text>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <Text size='sm'>COVER LETTER</Text>
              <Text size='md' copy>
                {coverLetter}
              </Text>
            </div>
            <Button cx='bg-primary w-fit'>INTERVIEW</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
