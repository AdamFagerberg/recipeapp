import { useState } from "react";
import Image from "next/image";

function RecipeCard({
  imgSrc: initialImgSrc,
  imgAlt,
  title: initialTitle,
  time: initialTime,
  ingredients: initialIngredients,
  instructions: initialInstructions,
  onDelete,
}) {
  const [clickCount, setClickCount] = useState(0);
  const [filledStar, setFilledStar] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [time, setTime] = useState(initialTime);
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [instructions, setInstructions] = useState(initialInstructions);
  const [imgSrc, setImgSrc] = useState(initialImgSrc);

  const handleThumbsUp = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    if (newClickCount % 2 === 0 && filledStar < 5) {
      setFilledStar(filledStar + 1);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="card rounded-lg w-[360px] mb-10 flex-shrink-0 border shadow-lg overflow-hidden">
      <figure>
        <img src={imgSrc} alt={imgAlt} width={360} height={200} />
      </figure>
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="recipeTitle inputStyle"
          />
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="cookingTime inputStyle"
          />
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="ingredients inputStyle"
          />
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="instructions inputStyle"
          />
          <button className="saveBtn" onClick={handleSave}>
            Save
          </button>
        </>
      ) : (
        <>
          <h2 className="recipeTitle">{title}</h2>
          <h3 className="cookingTime">{time}</h3>
          <p className="ingredients">{ingredients}</p>
          <p className="instructions">{instructions}</p>
          <div className="betyg">
            <div className="div1">
              <button className="betygButton" onClick={handleThumbsUp}>
                <Image
                  id="imgBetyg"
                  src="/8530677_thumbs_up_icon.png"
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
                  src={i < filledStar ? "/starblack.png" : "/starempty.png"}
                  alt="betyg"
                  width={24}
                  height={24}
                />
              ))}
            </div>
          </div>
          <button id="editBtn" onClick={handleEdit}>
            Edit
          </button>
          <button id="deleteBtn" onClick={onDelete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default RecipeCard;
