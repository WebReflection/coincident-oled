import coincident from './coincident-server.js';
const { window, server: { johnny, require } } = coincident(self);

const font = require('oled-font-5x7');
const Oled = require('oled-js');

const {ceil, pow} = Math;
const options = {
  width: 128,
  height: 32,
  address: 0x3c
};

const { board, five } = await johnny;
const oled = await new Oled(board, five, options);

const {document} = window;
const input = document.querySelector('input');
const button = document.querySelector('button');

const show = () => {
  button.disabled = true;
  const scale = 2;
  const h = 7;
  oled.clearDisplay();
  oled.setCursor(1, ceil((options.height - h) / pow(2, scale)));
  oled.writeString(font, scale, input.value.trim(), 1, true, 2);
  oled.update();
  button.disabled = false;
};

input.addEventListener('keypress', ({key}) => {
  if (!button.disabled && key === 'Enter') show();
});

button.addEventListener('click', show, {invoke: 'preventDefault'});

button.disabled = false;
