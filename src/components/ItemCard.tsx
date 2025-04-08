interface ItemCardProps {
  maintitle: string;
  subtitle: string;
  bg: string;
  imageUrl?: string; 
  subtitlecolor: string;
}

const ItemCard = ({ maintitle, subtitle, bg, imageUrl, subtitlecolor }: ItemCardProps) => {
  return (
    <div className="h-full w-full flex flex-col justify-between gap-2">
      {/* Image container with colored background */}
      <div 
        className="w-20 aspect-square rounded-lg overflow-hidden relative"
        style={{ backgroundColor: bg }}
      >
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={maintitle}
            className="absolute inset-0 w-full h-full object-cover" 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
      </div>
      
      <div className="flex flex-col gap-1 flex-nowrap max-w-[120px]">
        {/* Service Title with truncation */}
        <h3 className="font-semibold max-w-[85px] whitespace-nowrap overflow-scroll scrollbar-hide" title={maintitle}>
          {maintitle}
        </h3>
        <p className="whitespace-nowrap overflow-hidden text-ellipsis font-semibold" style={{ color: subtitlecolor }} title={subtitle}>{subtitle}</p>
      </div>
    </div>
  );
};

export default ItemCard;