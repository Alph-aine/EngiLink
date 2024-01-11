import Layout from '../../components/layout'
import Text from '../../components/text'
import JobCard from './card'

export default function Jobs() {
  return (
    <Layout>
      <div className='flex flex-col gap-20'>
        <div className='flex items-center'>
          <Text size='md'>Filter</Text>
        </div>
        <div className='flex flex-col'>
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </div>
    </Layout>
  )
}
