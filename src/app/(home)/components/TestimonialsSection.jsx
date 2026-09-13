import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, ExternalLink } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    text: "Everything Auto has been taking care of my family's cars for over 3 years. They are honest, reliable, and always explain what needs to be done. I wouldn't trust anyone else with my vehicle!",
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "Mike Rodriguez", 
    rating: 5,
    text: "Best auto shop in Franklin Square! They fixed my brake issue quickly and for a fair price. The staff is professional and the work is top quality. Highly recommend!",
    date: "2024-01-10"
  },
  {
    id: 3,
    name: "Jennifer Chen",
    rating: 5,
    text: "I've been coming to Everything Auto for 5 years and they never disappoint. They always take the time to explain what's wrong and give me options. True professionals!",
    date: "2024-01-08"
  }
];

export default function TestimonialsSection() {
  const renderStars = (rating) => {
    return (
      <div className="flex justify-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Our Community
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We&apos;re proud of our 5-star rating on Google. Here&apos;s what our satisfied customers have to say about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
              <CardContent className="p-8 text-center">
                <Quote className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                {renderStars(testimonial.rating)}
                <p className="text-gray-600 italic mb-6">&quot;{testimonial.text}&quot;</p>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{new Date(testimonial.date).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <a href="https://www.google.com/search?q=everything+auto+franklin+square+reviews" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="btn-primary font-bold text-lg px-8 py-4">
              <ExternalLink className="w-5 h-5 mr-2" />
              Read More Reviews on Google
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}