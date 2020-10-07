(() => {
  'use strict';

  let counter = 0;

  const DISABLED_STATE = 'disabled';
  const elBtnIncrement = document.getElementById('increment');
  const elBtnDecrement = document.getElementById('decrement');
  const container = document.getElementById('container');
  const type = {
    duration: [11, 12, 13, 14, 15, 16, 17, 18],
    palette: ['264653', '2a9d8f', 'e9c46a', 'f4a261', 'e76f51'],
    size: [16, 24, 32, 48, 56, 64],
  };
  const numColors = type.palette.length;
  const numFonts = type.size.length;
  const numDurations = type.duration.length;
  const randomnumber = (items) => Math.floor(Math.random() * items);
  const lyrics = [
    `Back in the days when I was a teenager`,
    `Before I had status and before I had a pager`,
    `You could find the Abstract listenin’ to hip-hop`,
    `My pops used to say, it reminded him of Bebop`,
    `I said, “Well, Daddy, don’t you know that things go in cycles?`,
    `Way that Bobby Brown is just amping like Michael”`,
    `It’s all expected, things are for the lookin’`,
    `If you got the money, Quest is for the bookin’`,
    `Come on everybody, let’s get with the fly mode`,
    `Still got room on the truckload of black boom`,
    `Listen to the rhymes, then get a mental picture`,
    `Of this black man, and black woman fixture`,
    `Why do I say that? ’Cause I gotta speak the truth, man`,
    `Doin’ what we feel for the music is the proof, and`,
    `Planted on the ground, the act is so together`,
    `Bona fide strong, you need leverage to sever`,
    `🎤🎤🎤🎤🎤`,
  ].map((lyric) => ({
    duration: type.duration[randomnumber(numDurations)],
    lyric,
  }));

  const createMarquee = () => {
    let div = document.createElement('div');
    let span = document.createElement('span');
    div.setAttribute('class', 'marquee');
    div.setAttribute('data-number', counter);
    span.setAttribute(
      'style',
      `animation-duration: ${lyrics[counter].duration}s; font-size: ${
        type.size[randomnumber(numFonts)]
      }px; color: #${type.palette[randomnumber(numColors)]}`
    );
    span.setAttribute('class', 'marquee-text');
    span.textContent = lyrics[counter].lyric;
    div.appendChild(span);
    container.appendChild(div);
    counter++;
  };

  const removeMarquee = () => {
    counter--;
    const el = document.querySelector(`[data-number="${counter}"]`);
    el.parentNode.removeChild(el);
  };

  const disableButton = (el) =>
    !el.hasAttribute(DISABLED_STATE)
      ? el.setAttribute(DISABLED_STATE, true)
      : null;

  const enableButton = (el) =>
    el.hasAttribute(DISABLED_STATE) ? el.removeAttribute(DISABLED_STATE) : null;

  const onDecrementClick = () => {
    enableButton(elBtnIncrement);
    removeMarquee();

    if (counter === 0) {
      disableButton(elBtnDecrement);
      return;
    }
  };

  const onIncrementClick = () => {
    enableButton(elBtnDecrement);

    if (counter === lyrics.length) {
      disableButton(elBtnIncrement);
      return;
    }

    createMarquee();
  };

  const addEventListeners = () => {
    elBtnIncrement.addEventListener('click', onIncrementClick);
    elBtnDecrement.addEventListener('click', onDecrementClick);
  };

  const init = () => {
    addEventListeners();
    createMarquee(counter);
  };

  init();
})();
