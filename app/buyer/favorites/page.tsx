"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, MapPin, BedDouble, Bath, CheckCircle2, XCircle, Trash2, Eye } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------
// TYPES
// ---------------------------------------------
interface PropertyPhoto {
  url: string;
  order: number;
}

interface FavoriteProperty {
  favoriteId: string;
  savedAt: string;
  property: {
    id: string;
    title: string;
    location: string;
    areaM2: number;
    rooms: number;
    bathrooms: number;
    price: number;
    isVerified: boolean;
    photos: PropertyPhoto[];
    user: {
      name: string;
      email: string;
    };
  };
}

// ---------------------------------------------
// MOCK DATA — replace with API call to GET /api/favorites
// TODO (backend): fetch(`/api/favorites`) con el userId de Clerk
// ---------------------------------------------
const MOCK_FAVORITES: FavoriteProperty[] = [
  {
    favoriteId: "fav-1",
    savedAt: "2025-01-10T10:00:00Z",
    property: {
      id: "prop-1",
      title: "Modern house in Santa Ana",
      location: "Urban zone, Santa Ana",
      areaM2: 120,
      rooms: 3,
      bathrooms: 2,
      price: 20000,
      isVerified: true,
      photos: [{ url: "/landing-image.png", order: 1 }],
      user: { name: "Luis Rodríguez", email: "luisrodriguez@gmail.com" },
    },
  },
  {
    favoriteId: "fav-2",
    savedAt: "2025-01-12T14:30:00Z",
    property: {
      id: "prop-2",
      title: "Two-story house in Escalón",
      location: "Colonia Escalón, San Salvador",
      areaM2: 280,
      rooms: 5,
      bathrooms: 3,
      price: 25000,
      isVerified: true,
      photos: [{ url: "/landing-image.png", order: 1 }],
      user: { name: "Marta Jiménez", email: "martajimenez@gmail.com" },
    },
  },
  {
    favoriteId: "fav-3",
    savedAt: "2025-01-15T09:15:00Z",
    property: {
      id: "prop-3",
      title: "Enchanting house in Santa Tecla",
      location: "La Libertad, Santa Tecla",
      areaM2: 320,
      rooms: 5,
      bathrooms: 4,
      price: 30000,
      isVerified: false,
      photos: [{ url: "/landing-image.png", order: 1 }],
      user: { name: "Rosa Martínez", email: "rosamartinez@gmail.com" },
    },
  },
];

// ---------------------------------------------
// PROPERTY CARD
// ---------------------------------------------
function PropertyCard({
  item,
  onRemove,
}: {
  item: FavoriteProperty;
  onRemove: (favoriteId: string) => void;
}) {
  const { property } = item;
  const photo = property.photos.sort((a, b) => a.order - b.order)[0];
  const router = useRouter();

  return (
    <div className="flex gap-0 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <div className="relative w-48 min-w-[192px] overflow-hidden">
        <img
          src={photo?.url ?? "/landing-image.png"}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <button
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 shadow"
          aria-label="Quitar de favoritos"
          onClick={() => onRemove(item.favoriteId)}
        >
          <Heart size={16} className="fill-red-500 stroke-red-500" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-2">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            {property.isVerified ? (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-gr-main mb-1">
                <CheckCircle2 size={13} />
                Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 mb-1">
                <XCircle size={13} />
                Unverified
              </span>
            )}
            <h3
              className="text-base font-semibold text-bl-main leading-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {property.title}
            </h3>
          </div>
        </div>

        {/* Location */}
        <p className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={13} />
          {property.location}
        </p>

        {/* Description placeholder */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {/* TODO (backend): agregar campo description al modelo Property si se desea mostrar aquí */}
          This property is located in {property.location}. It has{" "}
          {property.rooms} bedrooms, {property.bathrooms} bathrooms and{" "}
          {property.areaM2} m².
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <BedDouble size={14} />
            {property.rooms} rooms.
          </span>
          <span className="flex items-center gap-1">
            <Bath size={14} />
            {property.bathrooms} baths.
          </span>
          <span className="text-xs text-gray-400">{property.areaM2} m²</span>
        </div>

        <div className="border-t border-gray-100 mt-1 pt-3 flex items-end justify-between gap-4">
          {/* Price & Contact */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Price</p>
            <p
              className="text-lg font-bold text-bl-main"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              ${property.price.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mt-1">Contact</p>
            <p className="text-sm text-gray-600">{property.user.name}</p>
            <p className="text-sm text-gray-500">{property.user.email}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 items-end">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors duration-200 cursor-pointer" 
              style={{ backgroundColor: "var(--bl-main)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--gr-main)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--bl-main)")
              }
              onClick={() => router.push("ruta aquí")}
            >
              <Eye size={14} />
              See details
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-500 border border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors duration-200 cursor-pointer"
              onClick={() => onRemove(item.favoriteId)}
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------
// MAIN PAGE
// ----------------------------------------------
export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteProperty[]>(MOCK_FAVORITES);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // ── GSAP animations --------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade in
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.7,
        ease: "power3.out",
      });

      // Cards stagger on scroll
      const cards = cardsRef.current?.querySelectorAll(".property-card");
      if (cards) {
        cards.forEach((card) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 30,
            duration: 0.55,
            ease: "power2.out",
          });
        });
      }
    });

    return () => ctx.revert();
  }, [favorites]);

  // ── Remove handler --------------------------------------
  // TODO (backend): llamar DELETE /api/favorites/[propertyId] antes de actualizar el estado
  const handleRemove = (favoriteId: string) => {
    setFavorites((prev) => prev.filter((f) => f.favoriteId !== favoriteId));
  };

  // ---------------------------------------------------------
  return (
    <main
      className="min-h-screen bg-wh-main"
      style={{ fontFamily: "var(--font-poppins)" }}
    >

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div ref={headerRef} className="mb-8">
          <h1
            className="text-3xl font-bold text-bl-main mb-1"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Dream Houses
          </h1>
          <p className="text-sm text-gray-400">
            Favorite properties ({favorites.length})
          </p>
        </div>

        {/* Cards */}
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart size={48} className="text-gray-200 mb-4" />
            <p className="text-lg font-medium text-gray-400">
              You don&apos;t have any favorites yet!
            </p>
            <p className="text-sm text-gray-300 mt-1">
              Explore the marketplace and mark your favorite properties
            </p>
          </div>
        ) : (
          <div ref={cardsRef} className="flex flex-col gap-5">
            {favorites.map((item) => (
              <div key={item.favoriteId} className="property-card">
                <PropertyCard item={item} onRemove={handleRemove} />
              </div>
            ))}
          </div>
        )}
      </div>

      
    </main>
  );
}