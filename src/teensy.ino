#include <OctoWS2811.h>

const int totalLeds = 256;

int r = 0;
int g = 0;
int b = 0;
int i = 0;

DMAMEM int displayMemory[totalLeds * 6];
int drawingMemory[totalLeds * 6];
const int config = WS2811_GRB | WS2811_800kHz;

OctoWS2811 leds(totalLeds, displayMemory, drawingMemory, config);

void setup() {
  Serial.begin(9600);

  leds.begin();
  leds.show();
}

void loop() {
  while(Serial.available() < 3) {}

  int r = Serial.read();
  int g = Serial.read();
  int b = Serial.read();

  Serial.print(r);
  Serial.print(g);
  Serial.print(b);

  leds.setPixel(i, r, g, b);
  i++;

  leds.show();
}
