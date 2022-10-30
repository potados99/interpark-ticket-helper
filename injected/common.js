/****************************************************************
 * 삽입된 스크립트에서 공통으로 사용될 함수들을 모아놓은 파일입니다.
 *****************************************************************/

/**
 * 주어진 Window에서 특정 키가 눌렸을 때에 수행할 동작을 지정합니다.
 *
 * @param key 어떠한 키가 눌렸을 때에 동작을 수행할까요?
 * @param action 키가 눌렸을 때, 어떤 동작을 수행할까요?
 */
function onPressKey(key, action) {
  window.top.window.addEventListener('load', async function () {
    const topWindow = window.top.window;
    console.log(topWindow);

    const seat = await waitForElement(topWindow, '#ifrmSeat').then(f => f.contentWindow);
    const seatView = await waitForElement(seat, '#ifrmSeatView').then(f => f.contentWindow);
    const seatDetail = await waitForElement(seat, '#ifrmSeatDetail').then(f => f.contentWindow);

    for (const w of [topWindow, seat, seatView, seatDetail]) {
      console.log(`${w.name} will respond on key ${key}`);

      w.addEventListener('keypress', async function (e) {
        if (e.key === key) {
          console.log(`In ${w.name}, ${key} key is pressed.`);
          action();
        }
      }, false);

      console.log(`Now, ${w.name} will respond on ${key} key press.`);
    }
  });
}

function waitForElement(targetWindow, selector) {
  return new Promise(resolve => {
    if (targetWindow.document.querySelector(selector)) {
      return resolve(targetWindow.document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (targetWindow.document.querySelector(selector)) {
        resolve(targetWindow.document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(targetWindow.document.body, {
      childList: true,
      subtree: true
    });
  });
}
