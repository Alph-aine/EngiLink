import Button from '../../components/button'
import Text from '../../components/text'
import ProposalCard from './card'
import DropDown, { DropItem } from '../../components/dropdown'
import Layout from '../../components/layout'

export default function Proposals() {
  return (
    <Layout>
      <div className='flex flex-col gap-20'>
        <div className='flex flex-col gap-3'>
          <Text size='md'>Select a Job</Text>
          <DropDown
            title='Choose from your posted jobs'
            initialActive='Name (asc)'
          >
            <DropItem
              value='Name (asc)'
              onClick={() => console.log('Selected a value')}
            >
              DRAW THE FOUNDATIONS PLAN OF A SEWAGE SYSTEM FOR A RURAL VILLAGE
            </DropItem>
            <DropItem
              value='Name (desc)'
              onClick={() => setSort('Name (desc)')}
            >
              JOIN A WELL SUPHISTICATED TEAM TO PRODUCE THE WORLD BEST
              ELECTRONICS
            </DropItem>
          </DropDown>
        </div>
        <div className='flex flex-col gap-24'>
          <div className='flex'>
            <Text size='md' faded>
              Filters
            </Text>
          </div>
          <div className='flex flex-col gap-10'>
            <ProposalCard />
            <ProposalCard />
            <ProposalCard />
          </div>
          <Button cx='bg-primary lg:w-fit w-full mx-auto '>LOAD MORE</Button>
        </div>
      </div>
    </Layout>
  )
}
