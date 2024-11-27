import DELETE_SVG from "./delete.svg";
import LOGO from "./slimeVersion/slimeLogo.png";
import INK_SPLASH from "./ink_splash.gif";

// slime
import SLIME_ATTACK from "./slimeVersion/attack.jpeg";
import SLIME_HEALING from "./slimeVersion/healing.jpeg";
import SLIME_BLOCK_SWAP_HEALTH from "./slimeVersion/block_swap_health.jpeg";
import SLIME_HEALTH_EQUALIZER from "./slimeVersion/health_equalizer.jpeg";
import SLIME_REFLECT_DAMAGE from "./slimeVersion/reflect_damage.jpeg";
import SLIME_SHIELD from "./slimeVersion/shield.jpeg";
import SLIME_SWAP_HEALTH from "./slimeVersion/swap_health.jpeg";

const slimesImg = {
  SLIME_ATTACK,
  SLIME_HEALING,
  SLIME_BLOCK_SWAP_HEALTH,
  SLIME_HEALTH_EQUALIZER,
  SLIME_REFLECT_DAMAGE,
  SLIME_SHIELD,
  SLIME_SWAP_HEALTH,
};
const exportSlime = () => {
  return {
    POTION: slimesImg.SLIME_HEALING,
    SHIELD: slimesImg.SLIME_SHIELD,
    SWORD: slimesImg.SLIME_ATTACK,
    SWAP_HEALTH: slimesImg.SLIME_SWAP_HEALTH,
    BLOCK_SWAP_HEALTH: slimesImg.SLIME_BLOCK_SWAP_HEALTH,
  };
};
export const imgSources = {
  ...exportSlime(),
  DELETE_SVG,
  LOGO,
  INK_SPLASH,
};
