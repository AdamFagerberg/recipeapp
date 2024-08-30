
import { useState } from "react";
import Image from "next/image";

function RecipeCard({
  imgSrc,
  imgAlt,
  title,
  time,
  ingredients,
  onEdit,
  onDelete,
  onUpdateRating,
}) {
  const [clickCount, setClickCount] = useState(0);
  const [filledStar, setFilledStar] = useState(0);

  const handleThumbsUp = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    if (newClickCount % 2 === 0 && filledStar < 5) {
      setFilledStar(filledStar + 1);
    }
  };

  return (
    <div className="card rounded-lg w-[360px] mb-10 flex-shrink-0 border shadow-lg overflow-hidden">
      <figure>
        <Image src={imgSrc} alt={imgAlt} width={360} height={200} />
      </figure>
      <h2 className="recipeTitle">{title}</h2>
      <h3 className="cookingTime">{time}</h3>
      <p className="ingredients">{ingredients}</p>
      <div className="betyg">
        <div className="div1">
          <button className="betygButton" onClick={handleThumbsUp}>
            <Image
              id="imgBetyg"
              src="/img/8530677_thumbs_up_icon.png"
              alt="betyg"
              width={24}
              height={24}
            />
          </button>
          <span id="counter">{clickCount}</span>
        </div>
        <div className="div2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Image
              key={i}
              className="imgstarempty"
              src={i < filledStar ? "/img/starblack.png" : "/img/starempty.png"}
              alt="betyg"
              width={24}
              height={24}
            />
          ))}
        </div>
      </div>
      <button id="editBtn" onClick={onEdit}>
        Edit
      </button>
      <button id="deleteBtn" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}

export default RecipeCard;
