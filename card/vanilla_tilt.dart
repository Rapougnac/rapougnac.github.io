@JS()
library vanilla_tilt;

import 'dart:html';

import 'package:js/js.dart';

@JS()
class VanillaTilt {
  external factory VanillaTilt.init(Element element, [Map options]);
}

extension TiltedElement on Element {
  external VanillaTilt get vanillaTilt;
}