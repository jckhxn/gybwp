import Image from 'next/image'
import Link from 'next/link'
import { PersonProfileSection } from '@/types'

interface PersonProfileProps {
  section: PersonProfileSection
}

export function PersonProfile({ section }: PersonProfileProps) {
  const {
    person,
    showBio = true,
    showSocialLinks = true,
    showEpisodes = true,
    maxEpisodes = 6
  } = section

  if (!person) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">Person not found</p>
        </div>
      </section>
    )
  }

  const profileImage = person.consultingProfile?.profileImage || person.guestProfile?.profileImage
  const bio = person.consultingProfile?.bio || person.guestProfile?.bio
  const socialLinks = person.guestProfile?.socialLinks

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {profileImage && (
              <div className="flex-shrink-0">
                <div className="w-48 h-48 relative rounded-full overflow-hidden">
                  <Image
                    src={profileImage.asset?.url || '/placeholder.svg'}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {person.name}
              </h1>
              
              {person.role === 'host-consultant' && (
                <p className="text-lg text-blue-600 font-medium mb-4">
                  Host & Consultant
                </p>
              )}
              
              {person.role === 'guest' && person.guestProfile && (
                <div className="mb-4">
                  {person.guestProfile.title && (
                    <p className="text-lg font-medium text-gray-700">
                      {person.guestProfile.title}
                    </p>
                  )}
                  {person.guestProfile.company && (
                    <p className="text-lg text-gray-600">
                      {person.guestProfile.company}
                    </p>
                  )}
                </div>
              )}

              {showBio && bio && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {bio}
                  </p>
                </div>
              )}

              {showSocialLinks && socialLinks && (
                <div className="flex gap-4 mt-6">
                  {/* TODO: Render social links */}
                  <p className="text-sm text-gray-500">Social links coming soon</p>
                </div>
              )}

              {person.role === 'host-consultant' && person.consultingProfile?.calendarLink && (
                <div className="mt-6">
                  <Link
                    href={person.consultingProfile.calendarLink}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Schedule a Consultation
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Expertise/Skills */}
          {person.consultingProfile?.expertise && person.consultingProfile.expertise.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {person.consultingProfile.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Episodes */}
          {showEpisodes && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {person.role === 'host-consultant' ? 'Recent Episodes' : 'Episodes Featuring ' + person.name}
              </h3>
              <div className="text-center py-8">
                <p className="text-gray-500">Episodes will be displayed here once episode data is connected</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function PersonBio(props: any) {
  return <div>Person Bio</div>;
}

export function PersonEpisodes(props: any) {
  return <div>Person Episodes</div>;
}
