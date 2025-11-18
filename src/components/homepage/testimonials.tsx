import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    name: 'James Carter',
    title: 'Founder, QuantumLeap Inc.',
    quote: "As an employer, finding top-tier talent is always a challenge. Royal Ascent has consistently connected us with exceptional candidates who align with our vision and culture.",
    avatarId: 'testimonial-avatar-2',
  },
  {
    name: 'Isabella Rossi',
    title: 'Cybersecurity Student',
    quote: "The Ethical Hacking course was phenomenal. The content was cutting-edge and the instructors were industry experts. It gave me the confidence to pursue a career in cybersecurity.",
    avatarId: 'testimonial-avatar-3',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">What Our Members Say</h2>
          <p className="mt-2 text-lg text-foreground/80 max-w-2xl mx-auto">
            Success stories from professionals and companies in our elite network.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const avatar = PlaceHolderImages.find(p => p.id === testimonial.avatarId);
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full bg-background border-primary/20">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        {avatar && (
                           <Image
                            src={avatar.imageUrl}
                            alt={testimonial.name}
                            width={80}
                            height={80}
                            className="rounded-full border-2 border-primary mb-4"
                            data-ai-hint={avatar.imageHint}
                          />
                        )}
                        <p className="italic text-foreground/80">"{testimonial.quote}"</p>
                        <div className="mt-4">
                          <p className="font-bold font-headline">{testimonial.name}</p>
                          <p className="text-sm text-primary">{testimonial.title}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="text-primary border-primary hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="text-primary border-primary hover:bg-primary hover:text-primary-foreground" />
        </Carousel>
      </div>
    </section>
  );
}
