import bureau from "../../assets/scene-6/bureau-sticker.png";
import tableau from "../../assets/scene-6/tableau-sticker.png";
import classroom from "../../assets/scene-6/classe-scene-nb.png";

const classroomScene = [classroom, tableau, bureau];

export default function Scene6Classroom() {
  return (
    <div className="fixed inset-0 bg-white">
      {classroomScene.map((imageSrc, index) => (
        <img
          key={index}
          src={imageSrc}
          alt={`layer-${index}`}
          className="absolute inset-0 w-full h-full object-contain"
        />
      ))}
    </div>
  );
}
