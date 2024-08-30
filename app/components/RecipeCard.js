import Image from "next/image";

function RecipeCard({ href, imgAlt, imgSrc, children }) {
  return (
    <div className="card rounded-lg w-[360px] mb-10 flex-shrink-0 border shadow-lg overflow-hidden"></div>
  );
}

export default RecipeCard;
