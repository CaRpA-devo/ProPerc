import { CardContainer } from "../atoms/cardcontainer.org";

export function Image_Text_Card({
  imageSrc,
  imageAlt,
  category,
  title,
  description,
  href,
  containerClass = "",
  imageClass = "",
  categoryClass = "",
  titleClass = "",
  descriptionClass = "",
}) {
  return (
    <CardContainer className={`  p-4 ${containerClass}  `}>
      <div className="">
        <div className="">
          <img
            className={`h-48 w-full object-cover md:h-full md:w-48 ${imageClass}`}
            src={imageSrc}
            alt={imageAlt}
          />
        </div>
        <div className="p-8">
          <div
            className={`text-sm font-semibold tracking-wide uppercase ${categoryClass}`}
          >
            {category}
          </div>
          <a
            href={href}
            className={`mt-1 block text-lg leading-tight font-medium hover:underline ${titleClass}`}
          >
            {title}
          </a>
          <p className={`mt-2 ${descriptionClass}`}>{description}</p>
        </div>
      </div>
    </CardContainer>
  );
}
