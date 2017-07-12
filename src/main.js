import VueYoutubePlayer from './components/Youtube';

export default VueYoutubePlayer;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('VueYoutubePlayer', VueYoutubePlayer);
}