import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import About from '../components/About';
import ContactMe from '../components/ContactMe';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import WorkExperience from '../components/WorkExperience';
import { Experience, PageInfo, Project, Skill, Social } from '../typings';
import { fetchExperiences } from '../utils/fetchExperiences';
import { fetchPageInfo } from '../utils/fetchPageInfo';
import { fetchProjects } from '../utils/fetchProjects';
import { fetchSkills } from '../utils/fetchSkills';
import { fetchSocials } from '../utils/fetchSocials';

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
}

const Home = ({ pageInfo, experiences, projects, skills, socials }: Props) => {
  return (
    <div 
      className='bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scroll-smooth scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80'
    >
      <Head>
        <title>Kyle Tang -  Portfolio</title>
      </Head>

      <Header socials={socials}/>

      <section id='hero' className='snap-center'>
        <Hero pageInfo={pageInfo} />
      </section>

      <section id='about' className='snap-center'>
        <About pageInfo={pageInfo} />
      </section>

      <section id='experience' className='snap-center'>
        <WorkExperience experiences={experiences} />
      </section>

      <section id='skills' className='snap-center'>
        <Skills skills={skills} />
      </section>

      <section id='projects' className='snap-center'>
        <Projects projects={projects} />
      </section>

      <section id='contact' className='snap-center'>
        <ContactMe pageInfo={pageInfo} />
      </section>

      <Link href='#hero'>
        <footer className='sticky bottom-5 w-full cursor-pointer'>
          <div className='flex items-center justify-center'>
            <img 
              className='h-10 w-10 rounded-full filter grayscale hover:grayscale-0 cursor-pointer'
              src="https://kt946.github.io/my-portfolio-react/static/media/mylogo.03f1ddde85ac76243c4bf8d9e0fec6ea.svg" 
              alt="" 
            />
          </div>
        </footer>
      </Link>
    </div>
  );
}

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo();
  const experiences: Experience[] = await fetchExperiences();
  const skills: Skill[] = await fetchSkills();
  const projects: Project[] = await fetchProjects();
  const socials: Social[] = await fetchSocials();

  return {
    props: {
      pageInfo, 
      experiences, 
      projects, 
      skills, 
      socials
    },

    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10,
  };
};