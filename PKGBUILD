# Maintainer: Ayrton Sparling <ayrton@sparling.us>
pkgname=lightdm-webkit2-theme-material
pkgver=0.0.2
pkgrel=1
pkgdesc="A material design LightDM theme"

arch=('any')
url="https://github.com/FallingSnow/lightdm-webkit-material"
license=('WTFPL')
depends=('lightdm-webkit2-greeter')
conflicts=('lightdm-webkit-theme-material-git')
source=('')

pkgver() {
	cd "$srcdir/lightdm-webkit-material/"
}

package() {
	install -dm755 "$pkgdir/usr/share/lightdm-webkit/themes/material"
	cp -r "$srcdir/lightdm-webkit2-material/"* \
		"$pkgdir/usr/share/lightdm-webkit/themes/material/"
}
