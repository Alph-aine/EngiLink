import Layout from '../../components/layout'
import JobCard from './card'

export default function Jobs() {
  return (
    <Layout>
      <div className='flex flex-col'>
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
    </Layout>
  )
}
