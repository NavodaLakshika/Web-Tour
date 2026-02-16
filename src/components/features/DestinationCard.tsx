import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DestinationCardProps {
    name: string;
    image: string;
    location: string;
    rating: number;
    description: string;
    price?: string;
    slug?: string;
}

export const DestinationCard = ({ name, image, location, rating, description, price, slug }: DestinationCardProps) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl shadow-lg bg-white h-[450px] w-full transition-all hover:shadow-2xl hover:-translate-y-2">
            {/* Image */}
            <div className="absolute inset-0 h-full w-full">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-8 transition-transform duration-500 group-hover:translate-y-0">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-3xl font-bold font-heading mb-1">{name}</h3>
                        <div className="flex items-center text-gray-300 text-sm mb-3">
                            <MapPin className="h-4 w-4 mr-1 text-primary" />
                            {location}
                        </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-sm">{rating}</span>
                    </div>
                </div>

                <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500 ease-in-out">
                    <p className="text-gray-200 text-sm line-clamp-3 mb-6 leading-relaxed">
                        {description}
                    </p>

                    <div className="flex items-center justify-between pb-2">
                        {price && (
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 uppercase tracking-wider">Starts from</span>
                                <span className="font-bold text-xl text-primary">{price}</span>
                            </div>
                        )}
                        <Link href={`/destinations/${slug || name.toLowerCase()}`}>
                            <Button size="sm" className="rounded-full gap-2 px-6">
                                Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
