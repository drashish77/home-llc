import { DotLottiePlayer, Controls } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
const Loader = () => {
  return (
    <div className="absolute h-full w-full">
      <DotLottiePlayer src="/loader.lottie" autoplay loop>
        <Controls />
      </DotLottiePlayer>
    </div>
  );
};

export default Loader;
