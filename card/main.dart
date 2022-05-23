@JS()
library main;

import 'dart:html';

import 'package:js/js.dart';

import 'vanilla_tilt.dart';

@JS('console.log')
external void log(dynamic message);

Future<void> main(List<String> args) async {
  log('Hello, world!');
  VanillaTilt.init(querySelector('.tilt')!, {
    'max': 25,
    'speed': 1000,
    'gyroscope': true,
    'gyroscopeMinAngleX': -90,
    'gyroscopeMaxAngleX': 90,
    'gyroscopeMinAngleY': -90,
    'gyroscopeMaxAngleY': 90,
    'gyroscopeSamples': 100,
    'scale': 1.08,
  });

  const String string = 'Hoi!! My name is Rapougnac, (not actually my real name, duh), I\'m starting a career as a backend developer, but I don\'t like we(e)b developement too! :3\n';
  await Future.delayed(const Duration(seconds: 2));
  for (int i = 0; i < string.length; i++) {
    querySelector('.div2 p')!.innerHtml = string.substring(0, i + 1).replaceAllMapped(RegExp(r"(don't)"), (m) => '<strike>${m.group(0)}</strike>');
    await Future.delayed(const Duration(milliseconds: 5));
  }
}
