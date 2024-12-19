import 'package:carousel_slider/carousel_slider.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_application_1/screens/webView.dart';

// import 'package:url_launcher/url_launcher.dart';
// import 'package:webview_all/webview_all.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey =
      GlobalKey<ScaffoldState>(); // Define GlobalKey for Scaffold
  final CarouselSliderController carouselController =
      CarouselSliderController();
  int currentIdx = 0;

  List imageList = [
    {"id": 1, "image_path": 'assets/images/img1.gif'},
    {"id": 2, "image_path": 'assets/images/img2.webp'},
    {"id": 3, "image_path": 'assets/images/img3.jpg'},
    {"id": 4, "image_path": 'assets/images/img4.jpg'},
    {"id": 5, "image_path": 'assets/images/img5.jpeg'},
    {"id": 6, "image_path": 'assets/images/img6.jpg'},
    {"id": 7, "image_path": 'assets/images/img7.jpeg'},
  ];

  @override
  Widget build(BuildContext context) {
    User? user = FirebaseAuth.instance.currentUser;
    if (user == null) {
      return Scaffold(
        body: Center(child: Text("User not logged in")),
      );
    }
    String userId = user.uid; // Get the UID of the current user

    return Scaffold(
      key: _scaffoldKey, // Assign the key to Scaffold
      appBar: AppBar(
        leading: IconButton(
          onPressed: () {
            _scaffoldKey.currentState
                ?.openDrawer(); // Open the drawer using the key
          },
          icon: const Icon(
            Icons.menu,
            weight: 900, // For boldness if using Flutter 3.10 or later
            color: Colors.white,
          ),
        ),
        title: const Text(
          "APP",
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.blueGrey,
      ),
      drawer: drawer(),
      // backgroundColor: Colors.grey,
      body: Column(
        children: [
          slider(),
          Expanded(
            child: Container(
              color: const Color.fromARGB(255, 211, 211, 211),
              // margin: EdgeInsets.all(10),
              padding: const EdgeInsets.all(10),
              child: GridView.count(
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
                crossAxisCount: 2,
                children: [
                  GestureDetector(
                    onTap: () {
                      // print("cllick");
                      openWebPage(
                          context,
                          "https://iimt.icloudems.com/corecampus/index.php",
                          "ERP");
                      // DetailViewScreen(newsUrl: "");
                    },
                    child: Card(
                      color: Colors.white,
                      child: Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Center(
                          child: Column(
                            children: [
                              SizedBox(
                                  width: MediaQuery.of(context).size.width / 3,
                                  height: MediaQuery.of(context).size.width / 3,
                                  child: Image.asset('assets/images/erp.avif')),
                              const Text(
                                "ERP",
                                style: TextStyle(
                                    fontSize: 20, fontWeight: FontWeight.bold),
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Card(
                    color: Colors.white,
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Center(
                        child: Column(
                          children: [
                            SizedBox(
                                width: MediaQuery.of(context).size.width / 3,
                                height: MediaQuery.of(context).size.width / 3,
                                child: Image.asset(
                                    'assets/images/attendance.jpg')),
                            const Text(
                              "Attendance",
                              style: TextStyle(
                                  fontSize: 20, fontWeight: FontWeight.bold),
                            )
                          ],
                        ),
                      ),
                    ),
                  ),
                  GestureDetector(
                    onTap: () {
                      openWebPage(
                          context, "https://www.iimtindia.net/", "IIMT");
                    },
                    child: Card(
                      color: Colors.white,
                      child: Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Center(
                          child: Column(
                            children: [
                              SizedBox(
                                  width: MediaQuery.of(context).size.width / 3,
                                  height: MediaQuery.of(context).size.width / 3,
                                  child: Image.asset('assets/images/web.png')),
                              const Text(
                                "Website",
                                style: TextStyle(
                                    fontSize: 20, fontWeight: FontWeight.bold),
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Card(
                    color: Colors.white,
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Center(
                        child: Column(
                          children: [
                            SizedBox(
                                width: MediaQuery.of(context).size.width / 3,
                                height: MediaQuery.of(context).size.width / 3,
                                child: Image.asset('assets/images/pyq.webp')),
                            const Text(
                              "PYQ",
                              style: TextStyle(
                                  fontSize: 20, fontWeight: FontWeight.bold),
                            )
                          ],
                        ),
                      ),
                    ),
                  ),
                  Card(
                    color: Colors.white,
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Center(
                        child: Column(
                          children: [
                            SizedBox(
                                width: MediaQuery.of(context).size.width / 3,
                                height: MediaQuery.of(context).size.width / 3,
                                child: Image.asset('assets/images/notes.png')),
                            const Text(
                              "Notes",
                              style: TextStyle(
                                  fontSize: 20, fontWeight: FontWeight.bold),
                            )
                          ],
                        ),
                      ),
                    ),
                  ),
                  Card(
                    color: Colors.white,
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Center(
                        child: Column(
                          children: [
                            SizedBox(
                                width: MediaQuery.of(context).size.width / 3,
                                height: MediaQuery.of(context).size.width / 3,
                                child:
                                    Image.asset('assets/images/faculty.png')),
                            const Text(
                              "Faculty",
                              style: TextStyle(
                                  fontSize: 20, fontWeight: FontWeight.bold),
                            )
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }

//******************************************************************functions***************************************************************************** */
  // Future<void> _launchURL(String url) async {
  //   final Uri uri = Uri.parse(url);
  //   if (await canLaunchUrl(uri)) {
  //     await launchUrl(uri, mode: LaunchMode.externalApplication);
  //   } else {
  //     throw 'Could not launch $url';
  //   }
  // }

  Widget drawer() {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          const DrawerHeader(
            decoration: BoxDecoration(
              color: Colors.blueGrey,
            ),
            child: Text(
              'Navigation Menu',
              style: TextStyle(color: Colors.white, fontSize: 24),
            ),
          ),
          ListTile(
            leading: const Icon(Icons.home),
            title: const Text('Home'),
            onTap: () {
              // Handle navigation
              Navigator.pop(context);
            },
          ),
          ListTile(
            leading: const Icon(Icons.person),
            title: const Text('Profile'),
            onTap: () {
              // Handle navigation
              Navigator.pop(context);
            },
          ),
          ListTile(
            leading: const Icon(Icons.settings),
            title: const Text('Settings'),
            onTap: () {
              // Handle navigation
              Navigator.pop(context);
            },
          ),
          ListTile(
            leading: const Icon(Icons.logout),
            title: const Text('Logout'),
            onTap: () {
              // Handle logout
              Navigator.pop(context);
              Navigator.pop(context);
            },
          ),
        ],
      ),
    );
  }

  //**********************************************************************/
  Widget slider() {
    return Stack(
      children: [
        CarouselSlider(
          items: imageList
              .map((item) => Image.asset(
                    item['image_path'],
                    fit: BoxFit.cover,
                    width: double.infinity,
                  ))
              .toList(),
          carouselController: carouselController,
          options: CarouselOptions(
            scrollPhysics: const BouncingScrollPhysics(),
            autoPlay: true,
            aspectRatio: 2,
            viewportFraction: 1,
            autoPlayInterval: const Duration(seconds: 3),
            autoPlayAnimationDuration: const Duration(seconds: 2),
            onPageChanged: (index, reason) {
              setState(() {
                currentIdx = index;
              });
            },
          ),
        ),
        Positioned(
          bottom: 10,
          left: 0,
          right: 0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: imageList.asMap().entries.map((entry) {
              return GestureDetector(
                onTap: () => carouselController.animateToPage(entry.key),
                child: AnimatedContainer(
                  width: currentIdx == entry.key ? 15.0 : 8.0,
                  height: 8.0,
                  margin: const EdgeInsets.symmetric(horizontal: 4.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(50),
                    color: currentIdx == entry.key ? Colors.white : Colors.grey,
                  ),
                  duration: const Duration(milliseconds: 500),
                  curve: Curves.easeInOut,
                ),
              );
            }).toList(),
          ),
        ),
      ],
    );
  }
}
