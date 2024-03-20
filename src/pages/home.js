import { useNavigate } from "react-router-dom";

const Home = () => {
const navigate = useNavigate();

  return (
    <div className="w-[100%] h-[100vh] bg-[black] flex justify-center items-center">
      <div>
        <h1 className="text-[white] text-4xl text-center">Krux.club</h1>
        <div className="w-[100%] flex justify-center items-center">
          <button className="bg-[green] text-2lg p-2 mt-4 text-[white]" onClick={() => {
            navigate('/game/infinity-gameover')
          }}>Play Now</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
