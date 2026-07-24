import { FadeIn } from "@/components/ui/fade-in";

export default function TechnologyPage() {
  return (
    <div className="pt-24 pb-32 container px-4 md:px-6 mx-auto">
      <FadeIn>
        <h1 className="text-4xl md:text-6xl font-heading text-brand-navy mb-6">Technology & Quality</h1>
        <p className="text-lg text-brand-charcoal/80 max-w-2xl mb-12">
          State-of-the-art print technology combined with premium materials.
        </p>
      </FadeIn>
    </div>
  );
}
