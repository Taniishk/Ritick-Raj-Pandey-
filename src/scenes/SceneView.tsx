import { SceneRenderProps } from './Scenes01to10';
import {
  Scene01Entrance,
  Scene02Apology,
  Scene03Grumpy,
  Scene04GiantHug,
  Scene05ButterflyParadise,
  Scene06HundredReasons,
  Scene07Princess,
  Scene08Chocolate,
  Scene09RoseSky,
  Scene10BlushingMachine,
} from './Scenes01to10';
import {
  Scene11EyeGalaxy,
  Scene12ForeheadKisses,
  Scene13CloudNine,
  Scene14LoveCafe,
  Scene15Museum,
  Scene16HeartLetters,
  Scene17BeautyUniverse,
  Scene18DanceParty,
  Scene19FlowerShop,
  Scene20SafePlace,
} from './Scenes11to20';
import {
  Scene21StarConstellation,
  Scene22FlirtyGame,
  Scene23DreamGarden,
  Scene24Promises,
  Scene25TeddyArmy,
  Scene26MoonlightBalcony,
  Scene27HeartExplosion,
  Scene28DeepLetter,
  Scene29SurpriseGift,
  Scene30FinalUniverse,
} from './Scenes21to30';

export function SceneView(props: SceneRenderProps) {
  switch (props.meta.id) {
    case 1: return <Scene01Entrance {...props} />;
    case 2: return <Scene02Apology {...props} />;
    case 3: return <Scene03Grumpy {...props} />;
    case 4: return <Scene04GiantHug {...props} />;
    case 5: return <Scene05ButterflyParadise {...props} />;
    case 6: return <Scene06HundredReasons {...props} />;
    case 7: return <Scene07Princess {...props} />;
    case 8: return <Scene08Chocolate {...props} />;
    case 9: return <Scene09RoseSky {...props} />;
    case 10: return <Scene10BlushingMachine {...props} />;
    case 11: return <Scene11EyeGalaxy {...props} />;
    case 12: return <Scene12ForeheadKisses {...props} />;
    case 13: return <Scene13CloudNine {...props} />;
    case 14: return <Scene14LoveCafe {...props} />;
    case 15: return <Scene15Museum {...props} />;
    case 16: return <Scene16HeartLetters {...props} />;
    case 17: return <Scene17BeautyUniverse {...props} />;
    case 18: return <Scene18DanceParty {...props} />;
    case 19: return <Scene19FlowerShop {...props} />;
    case 20: return <Scene20SafePlace {...props} />;
    case 21: return <Scene21StarConstellation {...props} />;
    case 22: return <Scene22FlirtyGame {...props} />;
    case 23: return <Scene23DreamGarden {...props} />;
    case 24: return <Scene24Promises {...props} />;
    case 25: return <Scene25TeddyArmy {...props} />;
    case 26: return <Scene26MoonlightBalcony {...props} />;
    case 27: return <Scene27HeartExplosion {...props} />;
    case 28: return <Scene28DeepLetter {...props} />;
    case 29: return <Scene29SurpriseGift {...props} />;
    case 30: return <Scene30FinalUniverse {...props} />;
    default: return <Scene01Entrance {...props} />;
  }
}
