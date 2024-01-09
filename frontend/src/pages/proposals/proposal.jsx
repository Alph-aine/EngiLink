import Button from '../../components/button'
import Text from '../../components/text'
import Layout from '../../components/layout'

export default function Proposal() {
  return (
    <Layout>
      <div className='grid lg:grid-cols-12 grid-cols-1 place-items-stretch gap-16'>
        <div className='lg:col-span-8 col-span-full flex flex-col gap-12'>
          <div className='flex flex-col gap-5 w-full'>
            <Text size='md'>About Job</Text>
            <div className='flex flex-col gap-5 p-8 rounded-md border border-bg-secondary'>
              <div className='flex flex-col gap-1 uppercase'>
                <Text size='xs'>ID</Text>
                <Text size='sm'>EREIN313NIH23INI3I5I3N1HH3LLL2HJHU13KPOIJ</Text>
              </div>
              <div className='flex flex-col gap-1 uppercase'>
                <Text size='xs'>TITLE</Text>
                <Text size='sm'>
                  BUILD A PROTYPE FOR A BRIDGE PROJECT IN A MUDDY SOIL OF 300KM
                  IN LENGTH
                </Text>
              </div>
              <Button cx='bg-primary w-fit'>SEE JOB</Button>
            </div>
          </div>
          <div className='flex flex-col gap-10 w-full'>
            <div className='flex justify-between items-center gap-5'>
              <div className='flex flex-col gap-1 uppercase'>
                <Text size='sm'>BID</Text>
                <Text size='md'>$30 per HOUR</Text>
              </div>
              <div className='flex flex-col gap-1 uppercase'>
                <Text size='sm'>DURATION</Text>
                <Text size='md'>&gt; 3 MONTHS</Text>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <Text size='sm'>COVER LETTER</Text>
              <Text size='md' copy>
                track record of success in [Specific areas of expertise], I am
                confident that I possess the skills and qualifications to excel
                in this role and contribute significantly to your team.
                Highlights of my experience: Delivered impactful solutions: Led
                the development of [Project name], a [Project description] that
                resulted in [Positive outcome/measurable achievement]. Mastered
                diverse technologies: Proficient in [List of
                languages/frameworks/tools] and possess a strong understanding
                of [Software development methodologies/architectural
                patterns/cloud platforms]. Championed collaboration: Fostered a
                positive and productive team environment, effectively mentoring
                junior developers and collaborating with cross-functional teams.
                Problem-solving expertise: Consistently identified and resolved
                complex technical challenges through [Specific problem-solving
                approaches/methodologies]. Passionate about innovation:
                Continuously stay updated on industry trends and actively
                explore new technologies to improve development efficiency and
                software quality. Beyond the technical skills, I bring: Strong
                communication and interpersonal skills: Build strong
                relationships with stakeholders, clearly communicate technical
                concepts, and effectively deliver presentations. Leadership
                qualities: Motivate and inspire team members, delegate tasks
                effectively, and provide constructive feedback for continuous
                improvement. Analytical thinking and problem-solving: Approach
                challenges systematically, identify root causes, and propose
                creative solutions. Adaptability and willingness to learn:
                Embrace new technologies and adapt to changing project
                requirements with a positive attitude. I am excited by [Company
                name]'s [What attracts you to the company/mission/values] and
                believe that my skills and experience align perfectly with the
                requirements of this position. I am confident that I can make a
                significant contribution to your team and help drive the
                company's success. Thank you for your time and consideration. I
                am eager to learn more about this opportunity and how I can
                contribute to your team. Please find my resume attached for your
                review, and I am available for an interview at your earliest
                convenience. Sincerely, [Your Name]
              </Text>
            </div>
            <Button cx='bg-primary w-fit'>INTERVIEW</Button>
          </div>
        </div>
        <div className='lg:col-span-4 col-span-full flex flex-col gap-8'>
          <div className='flex flex-col gap-5'>
            <Text size='md'>About Engineer</Text>
            <div className='flex flex-col gap-5 p-8 rounded-md border border-bg-secondary'>
              <div className='flex flex-col gap-1 uppercase'>
                <Text size='xs'>NAME</Text>
                <Text size='sm'>JENNIE YEN</Text>
              </div>
              <div className='flex flex-col gap-1 uppercase'>
                <Text size='xs'>SPECIALTY</Text>
                <Text size='sm'>ELECTRONIC ENGR</Text>
              </div>
              <Button cx='bg-primary w-fit'>SEE PROFILE</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
