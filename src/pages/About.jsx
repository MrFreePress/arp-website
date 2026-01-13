import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Heart, Users, Target, Award } from 'lucide-react'

const boardOfDirectors = [
  {
    name: "Gilda Evans",
    title: "President",
    image: "/uploads/team/gilda-evans.webp",
    bio: "The founder of the Autism Resource Project (ARP) and host of the Autism Resource Podcast. With decades of experience advocating for neurodivergent and disabled individuals, and as a single mother to three children, the youngest son being autistic, she is passionate about helping others facing similar challenges. After navigating through schools, regional centers, and government offices to support her youngest son's educational and life needs, Gilda recognized the necessity for a central knowledge hub. ARP was established to bring together the scattered supports and services and provide a reliable, 24/7 global community resource where people, whether neurodivergent/disabled or supporting someone who is, can find answers from trusted professionals and sources."
  },
  {
    name: "Debbie Carlitz",
    title: "Vice President",
    image: "/uploads/team/debbie-carlitz.webp",
    bio: "Debbie Carlitz is Founder, President & CEO of Chiromatic LLC. Chiromatic gives the world a better place to sleep. Chiromatic provides a clinical sleeping system that blends science and luxury to help those with back and neck pain experience the healing power of sleep. As CEO since 2008, Deb has combined her passion for restorative sleep with her vision to build an unprecedented mattress that reduces pressure and relieves back pain. She has held numerous executive roles in strategy, sales, product development, marketing, logistics and promotion. Deb serves on the executive committee of the Avocado Green Brand as a founding partner. She is a former practicing attorney in New York state and the mother of an amazing young adult with autism."
  },
  {
    name: "Christopher Cope",
    title: "Vice President",
    image: "/uploads/team/christopher-cope.webp",
    bio: "Chris has spent the past 30 years in marketing, business development and business strategy. His career spans across multiple industries including hotels, wines, live music and event production, and film production studios. In 2021 he co-founded a film and television production studio utilizing the Virtual Production technology. He now provides business plan development, marketing, and business strategy consulting services for a variety of companies. He lends his experience and knowledge of marketing strategy as a volunteer to ARP and as a mentor to entrepreneurs."
  },
  {
    name: "Christine Monaco",
    title: "Secretary",
    image: "/uploads/team/chris-monaco.webp",
    bio: "Chris Monaco is a Senior Director, Clinical Science Analytics & Insights, Oncology Solutions at Precision for Medicine with thirty plus years of clinical research experience helping large pharma, and small to mid-sized biotechnology companies support next generation approaches to drug development outcomes and commercialization. Direct experience has been the cornerstone of Chris's hard work, dedication, and drive. Starting her carrier as a clinical data coordinator, Chris was able drive people and process to high levels of productivity and desired outcomes. Chris's greatest accomplishment of all is being \"mom\" to three amazing human beings."
  },
  {
    name: "Amy Bergrud",
    title: "Treasurer",
    image: "/uploads/team/amy-bergrud.webp",
    bio: "Amy has an undergraduate degree in Accounting from University of Illinois, Urbana-Champaign and an MBA from UCLA. She has over 25 years of professional experience in business operations, management and financial analysis. She is currently the General Manager of Rosenthal – The Malibu Estate Vineyard and oversees the operations and winemaking."
  },
  {
    name: "Commissioner Jack Darakjian",
    title: "Board Member",
    image: "/uploads/team/jack-darakjian.webp",
    bio: "Jack was appointed in 2018. He brings expertise and knowledge of mental illness, developmental disability, and advocacy for those with developmental disabilities to the Los Angeles County Commission on Disabilities. Commissioner Darakjian serves as the Chief Executive of Modern Support Services, LLC (MSS), a Glendale based agency that provides individualized community and home-based services, such as Supported Living Services (SLS) and Independent Living Skills (ILS) to individuals with significant psychological, emotional and physical challenges."
  },
  {
    name: "Denise Sherman",
    title: "Board Member",
    image: "/uploads/team/denise-sherman.webp",
    bio: "Denise Sherman provides website and administrative support for the Autism Research Project. She brings strong skills to the organization from her three decades of experience as the Transportation Coordinator for a local school district where she transports over 3,000 students each day. She spent 20 years as the Treasurer of her church and as an active member of the church council. Denise is passionate about autism research and supports. After going from doctor to doctor for several years, one of her sons was finally, correctly diagnosed as being on the autism spectrum. Denise saw firsthand how the proper resources and interventions can turn someone's life around, and now she is working with ARP to provide resources to other families with neurodiverse children."
  },
  {
    name: "Patrick Rood",
    title: "Board Member",
    image: "/uploads/team/patrick-rood.webp",
    bio: "Patrick Rood the Tax Strategist & Fractional CFO of Rood Financial Services is a 10X Coach & Speaker, 2 time award-winning international best-selling author and author of the new book \"The IRS Dirty Little Secrets\", a Guinness Book of world record holder. As a serial entrepreneur having several business throughout the years and witnessing many successes and failures from entrepreneurs around the country his passion became helping people succeed in Life and Business. He is also the proud father of three beautiful babies."
  }
]

const advisoryBoard = [
  {
    name: "Richard Rove, MBA, CPA, CFP",
    title: "Advisory Board",
    image: "/uploads/team/richard-rove.webp",
    bio: "Business career spent in the investing, financing, and ownership of a variety of businesses, ranging from residential real estate to farming. Experience in all aspects of bookkeeping, accounting, and financial statement preparation for non-profit as well as for profit companies. Current ownership of 9 residential buildings with 116 units and over 1,000 acres of pasture and irrigated farmland."
  },
  {
    name: "Dr. Nora Baladarian",
    title: "Advisory Board",
    image: "/uploads/team/nora-baladarian.webp",
    bio: "Dr. Baladerian is a licensed psychologist and marriage & family therapist and author with a private practice in Los Angeles, CA. She specializes treating trauma, anxiety, depression, and other difficulties. She is also a Certified Sex Educator and is fluent in Spanish. She began her work with individuals with intellectual & developmental disabilities as one of the first 10 employees when Harbor Regional Center opened in 1973. Now she focuses her work on providing psychological treatment for individuals with disabilities and their families."
  },
  {
    name: "Dr. Nancy Irwin",
    title: "Advisory Board",
    image: "/uploads/team/nancy-irwin.webp",
    bio: "Dr. Irwin is an addictions specialist and trauma expert in private practice in West Los Angeles. She is also a primary therapist on staff at Seasons Recovery Center, a luxury rehab facility in Malibu, California. Dr. Irwin is also the author of YOU-TURN: CHANGING DIRECTION IN MIDLIFE, and co-authored BREAKING THROUGH! STORIES OF HOPE AND RECOVERY. She is a frequent media guest, having appeared on Anderson Cooper, The Doctors, Dr. Drew, Nightline, E!, Megyn Kelly, HLN, CNN, and more."
  },
  {
    name: "KD Harris",
    title: "Advisory Board",
    image: "/uploads/team/kd-harris.webp",
    bio: "KD is a physically disabled cisgender Black woman who has served for the past 40 years as a scholar-practitioner-activist with a practice centered around the advancement of social and educational justice for learners who have been historically marginalized. She is one of the co-founders and for the past 8 years have served as the Executive Director of the social impact non-profit, Let's Talk LD, which provides student advocacy, parent education, and professional training and development services designed to improve outcomes for individuals who are neurodivergent."
  },
  {
    name: "Dr. Daniel Franklin, PhD",
    title: "Advisory Board",
    image: "/uploads/team/daniel-franklin.webp",
    bio: "Daniel Franklin, PhD, BCET, is the author of Helping Your Child with Language-Based Learning Disabilities (2018). He holds a master's degree from the Harvard Graduate School of Education in Reading, Language, and Learning Disabilities, a PhD from UCLA in Education, and he is a Board Certified Educational Therapist (BCET). Daniel has over 30 years of experience in education as an educational therapist, teacher, administrator, and educational consultant. Daniel is the founder, president, and clinical director of Franklin Educational Services, Inc."
  },
  {
    name: "Chris Latham",
    title: "Advisory Board",
    image: "/uploads/team/chris-latham.webp",
    bio: "Chris Latham is a CERTIFIED FINANCIAL PLANNER™ and has worked with clients for the past 27 years, helping to ensure their financial wealth. He focuses on making smart money decisions for clients, tax mitigation, taking care of heirs, protecting assets, and magnifying charitable contributions. Owning his own practice for nearly 20 years, Chris has been able to focus on the things that truly matter to his clients and will benefit them most."
  },
  {
    name: "Richard Schreiber",
    title: "Advisory Board",
    image: "/uploads/team/richard-schreiber.webp",
    bio: "Richard Schreiber is an IT and AI expert with over twenty-five years of experience working for some of the largest Fortune 500 companies and mega law firms. As an autism advocate, his deepest passions as the father of an autistic daughter pushed him to found the NYC Autism Community Group in Manhattan to help parents with children on the spectrum navigate the day-to-day challenges, and the Autism Innovation Community Foundation to promote more homeopathic, innovative and tech/AI autism solutions. His best-selling book, Autism Care Revolution, describes his family's story."
  },
  {
    name: "John Mews",
    title: "Advisory Board",
    image: "/uploads/team/john-mews.webp",
    bio: "John Mews, LMFT, NMT, is the CEO, Owner & Founder of Mewsic Moves LLC, a private practice dedicated to supporting families of neurodiverse individuals as well as individuals with mental health challenges. With over 20 years of experience, John is a Licensed Marriage & Family Therapist and Neurologic Music Therapist, specializing in family and individual counseling. Inspired by his upbringing alongside an intellectually disabled uncle, John has a deep commitment to seeing the potential in every individual."
  },
  {
    name: "Rian Denich",
    title: "Advisory Board",
    image: "/uploads/team/rian-denich.webp",
    bio: "Early on in his life Rian knew that he wanted to do meaningful work, the thought of helping others has always been his biggest source of motivation, and he is passionate about finance. During his college years Rian attended California State University Northridge where he earned honors degrees in both Business Administration and Finance with an emphasis in Financial Planning. Now in his own practice, Rian specializes in comprehensive financial planning which allows him to relate the assets he manages to his client's individual circumstances and create unique strategies."
  },
  {
    name: "Scott Frank",
    title: "Advisory Board",
    image: "/uploads/team/scott-frank.webp",
    bio: "Scott is the President of AT&T Intellectual Property. He is responsible for the identification, development, protection, management, marketing, licensing, and sale of all company-wide intellectual property for AT&T. Scott is Chair/President of the Global Intellectual Property Alliance, and a Board member for multiple other IP and tech research organizations. He is a former White House Advisor on International Trade Related to Intellectual Property and former Chair of the State Bar of Georgia's Intellectual Property Law Section."
  }
]

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              About Autism Resource Project
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Building a supportive community for autism, neurodiversity, and disabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              The Autism Resource Project exists to provide accessible, trusted information and support to individuals with autism, their families, caregivers, and service providers. We believe in creating a world where every person in the neurodiverse community feels heard, supported, and celebrated.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Compassion</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We approach every interaction with empathy, understanding, and genuine care for our community members.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Community</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We believe in the power of connection and shared experiences to support and uplift one another.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We are committed to providing high-quality, evidence-based resources and information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
            <p>
              The Autism Resource Project was born from a simple yet powerful idea: no family should have to navigate the autism journey alone. Founded by individuals who have experienced firsthand the challenges of finding reliable information and support, ARP has grown into a comprehensive resource hub serving thousands of families across the country.
            </p>
            <p>
              What started as a small collection of resources has evolved into a vibrant community featuring our popular podcast, extensive resource library, local community connections, and much more. We've had the privilege of interviewing leading experts, sharing inspiring stories, and connecting families with the support they need.
            </p>
            <p>
              Today, we continue to expand our reach and deepen our impact, always staying true to our core mission: to be a warm, welcoming companion on your neurodiverse journey.
            </p>
          </div>
        </div>
      </section>

      {/* Board of Directors Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Board of Directors</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Meet the dedicated leaders guiding the Autism Resource Project
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardOfDirectors.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.title}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Advisory Board</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Expert advisors providing guidance and expertise
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisoryBoard.map((member, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.title}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 text-blue-100">
            Be part of a supportive community that understands your journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Get Involved</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Link to="/donate">Support Our Mission</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
