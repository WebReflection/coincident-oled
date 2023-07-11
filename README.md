# coincident-oled

![oled image example](https://raw.githubusercontent.com/WebReflection/electroff/master/examples/oled/oled.jpg)

This is the same [electroff oled demo](https://github.com/WebReflection/electroff/blob/master/examples/oled/README.md) except it's based on [coincident/server](https://github.com/WebReflection/coincident#coincidentserver).

## Hardware

  * this has been tested on [Raspberry Pi Zero 2 W](https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/) but any other Raspberry Pi board should work too
  * [Adafruit PiOLED](https://www.adafruit.com/product/3527)

## /boot/config.txt

```
# not super relevant
dtoverlay=vc4-kms-v3d
initramfs initramfs-linux.img followkernel
display_auto_detect=1
arm_boost=1

# Relevant: Enable i2c and spi (optional)
dtparam=i2c_arm=on
dtparam=i2c=on
dtparam=spi=on
```

## Bootstrap

Please be sure [pigpio](https://github.com/WebReflection/electroff/blob/master/examples/oled/README.md#raspberry-pi-oled-demo) is already available/installed in the Raspberry Pi and there is a (WiFi/Ethernet) network you can reach from any other computer ... then, within your Raspberry Pi terminal:

```sh
mkdir -p oled
cd oled
npm i coincident-oled
# wait for it ... then (sudo required for pigpio):
sudo node -e 'require("coincident-oled")'
```

This should log at some point `http://192.168.X.X:XXXX/` where `IP="192.168.X.X"` and `PORT="XXXX"` (use the right numbers for your intranet case).

### Launch Chrome/ium

Once the *Pi* shows the *URL* with its port to reach, type the following in your terminal:

```sh
IP="192.168.X.X"
PORT="XXXX"
chromium --unsafely-treat-insecure-origin-as-secure=http://$IP:$PORT --kiosk http://$IP:$PORT/
```

This will launch *Chrome/ium* browser in kiosk mode (remove `--kiosk` if not desired) allowing that network address to be handled as it was `localhost` (hence considered secure by default).

Type anything in the *input* field once you start the browsing session, and either press *Enter* or the button to see the content on screen.

### How To Play Around ...

All files in this repo/module are shipped without any build step needed.

You can modify these directly within your `coincident-oled` folder, inside the `node_modules/` path, and either reboot the *node* command, if changes in the server (`index.js`) are needed, or simply by refreshing the browser.

Multiple browsers should be also allowed without issues.
