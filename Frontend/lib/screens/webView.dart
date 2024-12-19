import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

class WebPage extends StatelessWidget {
  final String url;
  final String name;

  const WebPage({super.key, required this.url, required this.name});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(name),
      ),
      body: InAppWebView(
        initialUrlRequest: URLRequest(url: WebUri(url)),
      ),
    );
  }
}

void openWebPage(BuildContext context, String url, String name) {
  Navigator.push(
    context,
    MaterialPageRoute(
      builder: (context) => WebPage(
        url: url,
        name: name,
      ),
    ),
  );
}
