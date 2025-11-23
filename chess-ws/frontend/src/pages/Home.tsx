import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Home = () => {
  const navigate= useNavigate();
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex justify-center">
            <img src="/board.png" alt="chess board" className="max-w-96" />
          </div>
          <div className="pt-16">
            <div className="flex justify-center">
              <h1 className="text-4xl font-bold hover:text-amber-950 text-white">PlaY CHeSS</h1>
            </div>
            <div className="mt-4 flex justify-center">
              <Button
                 onClick={() => navigate("/game")}>
                Play
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 

