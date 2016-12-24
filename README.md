## A Material design LightDM Webkit2 greeter theme

This is a theme for LightDM Webkit2 (`lightdm-webkit2-greeter`).

Arch Linux users can find it in the AUR: [`lightdm-webkit2-theme-material2`](https://aur.archlinux.org/packages/lightdm-webkit2-theme-material2/).

### Screenshots

![](https://cdn.rawgit.com/FallingSnow/lightdm-webkit2-material2/master/screenshots/default.png)
![](https://cdn.rawgit.com/FallingSnow/lightdm-webkit2-material2/master/screenshots/shutdown.png)
![](https://cdn.rawgit.com/FallingSnow/lightdm-webkit2-material2/master/screenshots/settings.png)
![](https://cdn.rawgit.com/FallingSnow/lightdm-webkit2-material2/master/screenshots/zodiac.png)
![](https://cdn.rawgit.com/FallingSnow/lightdm-webkit2-material2/master/screenshots/image.png)
![](https://cdn.rawgit.com/FallingSnow/lightdm-webkit2-material2/master/screenshots/image-random.png)

### Features

I created this for use on Arch Linux, so it only has the basic features of:

- Selecting an available user from a dropdown
- Entering their password
- Seeing their profile picture
- Restart, shutdown, suspend, and hibernate the computer
- Select session (GNOME, KDE, Xfce or other installed DE)
- Select your language
- 4 different types of background (trianglify, image, random-image, and zodiac)
- HiDpi screen support via UI scaling
- Full i18n localization
- And the most important thing, A CLOCK WITH SECONDS!!!

### How to install

[Check our wiki](https://github.com/FallingSnow/lightdm-webkit2-material2/wiki/Installation)

### Setting your own user picture

- Add `Icon=/var/lib/AccountsService/icons/<youraccountname>` to the bottom of `/var/lib/AccountsService/users/<youraccountname>` and place a profile image at `/var/lib/AccountsService/icons/<youraccountname>`

### Setting a custom background image

- Put a `jpg` at `/var/lib/AccountsService/wallpapers/lightdm-webkit.jpg` (*You may need to create the wallpapers directory*) and set background engine to image in the settings

### Setting multiple custom background images to pick from

- Put a `jpg` or a `png` in `/var/lib/AccountsService/wallpapers` or in a directory specified by the `background_images` variable in your `/etc/lightdm/lightdm-webkit2-greeter.conf` (either the `greeter` or the `branding` section) and set the background engine to random image in the settings.

### Tips
#### Lock screen
- Type `dm-tool lock`

### License
This work is free. You can redistribute it and/or modify it under the terms of the WTFPL (Do What The Fuck You Want To Public License), Version 2, as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.<br>
Default avatar: http://www.designshock.com/flat_character/<br>
Fallback image background: No Man's Sky
