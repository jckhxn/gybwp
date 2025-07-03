import { ConsultingServicesSection } from "@/types";

interface ConsultingServicesProps {
  section: ConsultingServicesSection;
}

export function ConsultingServices({ section }: ConsultingServicesProps) {
  const { title = "Services", subtitle, services = [] } = section;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No services configured. Add services in the CMS to display them
              here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
              >
                {service.icon && (
                  <div className="text-4xl mb-4">{service.icon}</div>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3 text-sm text-gray-700"
                      >
                        <span className="text-green-500 mt-1">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function ConsultingCTA(props: any) {
  return <div>Consulting CTA</div>;
}
