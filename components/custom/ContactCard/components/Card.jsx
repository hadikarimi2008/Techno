import Image from "next/image";

export function CardImage({ description, title, image }) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] bg-[#F8F9FA] border border-gray-100 transition-all hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-[4/3]">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent" />
        <Image
          src={image}
          alt={title}
          className="h-full w-full object-cover hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-black text-[#343A40] tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
