import { useState, useCallback, useRef, useLayoutEffect, useEffect } from 'react';

interface Service {
  key: string;
  icon: string;
  title: string;
  price: string;
  note: string;
  description: string;
  whatYouGet: {
    title: string;
    items: string[];
  };
  advanced: {
    title: string;
    items: string[];
  };
  perfectFor: string;
}

interface ServiceCardsProps {
  services: Service[];
  buildOnThisText: string;
}

export default function ServiceCards({ services, buildOnThisText }: ServiceCardsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const positionsRef = useRef<Map<number, DOMRect>>(new Map());
  const contentRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = useCallback((index: number) => {
    // Store current positions before state change (First)
    cardsRef.current.forEach((card, i) => {
      if (card) {
        positionsRef.current.set(i, card.getBoundingClientRect());
      }
    });

    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  useLayoutEffect(() => {
    // After state change, animate from old position to new position
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const oldPos = positionsRef.current.get(i);
      if (!oldPos) return;

      const newPos = card.getBoundingClientRect(); // (Last)
      const deltaX = oldPos.left - newPos.left;
      const deltaY = oldPos.top - newPos.top;

      // Calculate scale for width animation
      const scaleX = oldPos.width / newPos.width;

      const content = contentRef.current[i];

      // Invert - apply the offset AND scale to card
      card.style.transform = `translate(${deltaX}px, ${deltaY}px) scaleX(${scaleX})`;
      card.style.transition = 'none';
      card.style.willChange = 'transform';
      card.style.overflow = 'hidden'; // Hide overflow during animation

      // Counter-scale the content to prevent text stretching
      if (content) {
        content.style.transform = `scaleX(${1 / scaleX})`;
        content.style.transition = 'none';
        content.style.transformOrigin = 'left center';
      }

      // Force a reflow to ensure the transform is applied
      card.offsetHeight;

      // Play - animate to the natural position
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.style.transition = 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)';
          card.style.transform = '';

          if (content) {
            content.style.transition = 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)';
            content.style.transform = '';
          }

          // Cleanup after animation
          const cleanup = () => {
            card.style.willChange = '';
            card.style.overflow = ''; // Restore overflow
            card.removeEventListener('transitionend', cleanup);
          };
          card.addEventListener('transitionend', cleanup);
        });
      });
    });

    // Clear stored positions
    positionsRef.current.clear();
  }, [expandedIndex]);

  // Auto-scroll to expanded card on mobile
  useEffect(() => {
    if (expandedIndex !== null && window.innerWidth < 768) {
      const card = cardsRef.current[expandedIndex];
      if (card) {
        // Wait for collapse/expand animations to complete (500ms), then scroll
        setTimeout(() => {
          card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 550);
      }
    }
  }, [expandedIndex]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleToggle(index);
      }
    },
    [handleToggle]
  );

  return (
    <div className="flex flex-wrap gap-8">
      {services.map((service, index) => {
        const isExpanded = expandedIndex === index;
        const isCollapsed = expandedIndex !== null && !isExpanded;

        return (
          <article
            key={service.key}
            ref={(el) => (cardsRef.current[index] = el)}
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-controls={`service-content-${service.key}`}
            onClick={() => handleToggle(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`
              glass rounded-[var(--radius-glass)]
              relative cursor-pointer
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
              ${!isCollapsed ? 'p-8 hover:shadow-[var(--shadow-glass-hover)]' : 'p-4'}
              scroll-mt-24
            `}
            style={{
              width: isExpanded ? '100%' : 'calc((100% - 4rem) / 3)',
              flexGrow: 0,
              flexShrink: 0,
              opacity: isCollapsed ? 0.5 : 1,
              transformOrigin: 'left center',
              transition: 'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1), padding 500ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 500ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div ref={(el) => (contentRef.current[index] = el)}>
            {/* Expand Icon */}
            <div
              className={`
                expand-icon
                absolute top-6 right-6 w-8 h-8 flex items-center justify-center
                text-surface-400 pointer-events-none
                transition-all duration-300 ease-[var(--ease-smooth)]
                ${isExpanded ? 'opacity-100 rotate-180' : 'md:opacity-0'}
              `}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* Icon Container */}
            <div className={`rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 transition-all duration-500 ease-[var(--ease-smooth)] ${isCollapsed ? 'w-10 h-10 mb-2' : 'w-14 h-14 mb-6'}`}>
              <div dangerouslySetInnerHTML={{ __html: service.icon }} className={`transition-all duration-500 ease-[var(--ease-smooth)] ${isCollapsed ? 'scale-75' : 'scale-100'}`} />
            </div>

            {/* Title */}
            <h3 className={`font-semibold text-surface-900 transition-all duration-500 ease-[var(--ease-smooth)] ${isCollapsed ? 'text-base mb-1' : 'text-xl mb-2'}`}>
              {service.title}
            </h3>

            {/* Price - hide when collapsed */}
            <div className={`flex items-baseline gap-2 transition-all duration-500 ease-[var(--ease-smooth)] overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0 mb-0' : 'max-h-20 opacity-100 mb-4'}`}>
              <span className="text-2xl font-bold text-primary-600">
                {service.price}
              </span>
              <span className="text-sm text-surface-500">{service.note}</span>
            </div>

            {/* Short Description - hide when collapsed */}
            <p className={`text-surface-600 transition-all duration-500 ease-[var(--ease-smooth)] overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0 mb-0' : 'max-h-40 opacity-100 mb-4'}`}>{service.description}</p>

            {/* Expanded Content */}
            <div
              id={`service-content-${service.key}`}
              className={`
                overflow-hidden
                transition-all duration-500 ease-[var(--ease-smooth)]
                ${
                  isExpanded
                    ? 'max-h-[800px] opacity-100 mt-4 scale-y-100'
                    : 'max-h-0 opacity-0 scale-y-95'
                }
              `}
              style={{
                transformOrigin: 'top',
              }}
              aria-hidden={!isExpanded}
            >
              <div className={`space-y-6 transition-all duration-500 ease-[var(--ease-smooth)] ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-[-10px] opacity-0'}`}>
                {/* What You Get Section */}
                <div>
                  <h4 className="text-sm font-semibold text-surface-700 mb-3 uppercase tracking-wide">
                    {service.whatYouGet.title}
                  </h4>
                  <ul className="space-y-2">
                    {service.whatYouGet.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-surface-600"
                      >
                        <svg
                          className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Advanced Section */}
                <div>
                  <h4 className="text-sm font-semibold text-surface-700 mb-3 uppercase tracking-wide">
                    {service.advanced.title}
                  </h4>
                  <ul className="space-y-2">
                    {service.advanced.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-surface-600"
                      >
                        <svg
                          className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="9 11 12 14 22 4" />
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Perfect For */}
                <div className="pt-4 border-t border-surface-200">
                  <p className="text-sm text-surface-600">
                    <span className="font-semibold text-surface-700">Perfect for: </span>
                    {service.perfectFor}
                  </p>
                </div>

                {/* Build On This - Show connected services */}
                {index < services.length - 1 && (
                  <div className="pt-4 border-t border-surface-200">
                    <p className="text-sm text-surface-600 mb-2">
                      <span className="font-semibold text-surface-700">{buildOnThisText}: </span>
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {services.slice(index + 1).map((nextService) => (
                        <span
                          key={nextService.key}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm"
                        >
                          {nextService.title}
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Screen Reader Text */}
            <span className="sr-only">
              {isExpanded ? 'Collapse details' : 'Expand details'}
            </span>
            </div>
          </article>
        );
      })}

      <style>
        {`
          @media (max-width: 767px) {
            article {
              width: 100% !important;
            }
          }

          @media (hover: hover) {
            article:hover .expand-icon {
              opacity: 1 !important;
              transform: translateY(0);
            }
          }

          @media (max-width: 768px) {
            article .expand-icon {
              opacity: 1 !important;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            article,
            article > div,
            .expand-icon {
              transition: none !important;
            }
          }

          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
          }
        `}
      </style>
    </div>
  );
}
