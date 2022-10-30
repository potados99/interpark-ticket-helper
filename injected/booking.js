let seats = [];
let twoSeats = [];

function buildSeats() {
  const elements = window.top
    .window.frames.ifrmSeat
    .window.frames.ifrmSeatDetail
    .window.document.querySelectorAll('img.stySeat');

  seats = Array.from(elements).map(el => {
    const arguments = extractArgument(el);

    return {
      element: el,
      sid: Number.parseInt(arguments[0].replace('SID', '')),
      grade: arguments[1],
      floor: arguments[2],
      row: arguments[3],
      seat: Number.parseInt(arguments[4]),
      block: arguments[5]
    };
  });
}

function extractArgument(element) {
  const selectSeatCall = element
    .getAttribute('onclick')
    .replace('javascript:', '').trim();

  return /\((.*)\)/
    .exec(selectSeatCall)[1]
    .split(',')
    .map(a => a.replace(/['"]/g, ''));
}

function buildTwoSeats() {
  twoSeats = [];

  for (const seat of seats) {
    const nextSeat = seats.find(s =>
      s.sid === seat.sid + 1 &&
      s.grade === seat.grade &&
      s.floor === seat.floor &&
      s.row === seat.row &&
      s.seat === seat.seat + 1 &&
      s.block === seat.block
    );

    if (nextSeat) {
      twoSeats.push([seat, nextSeat]);
    }
  }
}

function next() {
  window.top
    .window.frames.ifrmSeat
    .window.document.querySelector('#NextStepImage')
    .click();
}

onPressKey('1', () => {
  buildSeats();
  buildTwoSeats();

  if (seats.length === 0) {
    alert('No single seats.');
    return;
  }

  const element = seats[0].element;

  element.click();
});

onPressKey('2', () => {
  buildSeats();
  buildTwoSeats();

  if (twoSeats.length === 0) {
    alert('No double seats.');
    return;
  }

  const elements = twoSeats[0].map(s => s.element);

  for (const el of elements) {
    el.click();
  }
});

onPressKey('9', () => {
  next();
})


