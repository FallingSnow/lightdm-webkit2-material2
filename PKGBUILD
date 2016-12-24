# Maintainer: Ayrton Sparling <ayrton@sparling.us>
_pkgname=lightdm-webkit2-material2
pkgname=lightdm-webkit2-theme-material2
pkgver=0.0.1
pkgrel=1
pkgdesc="A material design LightDM theme for lightdm-webkit2-greeter"
arch=('any')
url="https://github.com/FallingSnow/${_pkgname}"
license=('WTFPL')
depends=('lightdm-webkit2-greeter')
source=("https://github.com/FallingSnow/${_pkgname}/releases/download/v${pkgver}/${_pkgname}.tar.gz")
sha512sums=('fe59bec78d9ea5c7cea14d99f0914edb2fce722f0796089e4361865b9a7746d8f2984f6ad80f6619e8dd209f9e7c4646942075739a0c4ab5de90a525ed7a4166')

package() {
    rm "$srcdir/lightdm-webkit2-material2.tar.gz"
	install -dm755 "$pkgdir/usr/share/lightdm-webkit/themes/material2"
	cp -r "$srcdir/"* \
		"$pkgdir/usr/share/lightdm-webkit/themes/material2/"
}
