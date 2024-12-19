import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class NotesPage extends StatelessWidget {
  final String userId; // Pass the current user's ID to this page

  NotesPage({required this.userId});

  Future<bool> isTeacher() async {
    try {
      // Fetch user data from Firestore
      DocumentSnapshot userDoc = await FirebaseFirestore.instance
          .collection('users')
          .doc(userId)
          .get();
      return userDoc.exists &&
          userDoc['role'] == 'teacher'; // Check if the user is a teacher
    } catch (e) {
      print("Error fetching user role: $e");
      return false;
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
      future: isTeacher(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Scaffold(
            appBar: AppBar(title: Text("Notes")),
            body: Center(child: CircularProgressIndicator()),
          );
        }

        bool isUserTeacher = snapshot.data ?? false;

        return Scaffold(
          appBar: AppBar(
            title: Text("Notes"),
            actions: isUserTeacher
                ? [
                    IconButton(
                      icon: Icon(Icons.add),
                      onPressed: () {
                        // Navigate to the "Upload Notes" page
                        Navigator.pushNamed(context, '/uploadNotes');
                      },
                    )
                  ]
                : null,
          ),
          body: StreamBuilder(
            stream: FirebaseFirestore.instance.collection('notes').snapshots(),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return Center(child: CircularProgressIndicator());
              }
              if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
                return Center(child: Text("No notes available"));
              }

              final notes = snapshot.data!.docs;
              return ListView.builder(
                itemCount: notes.length,
                itemBuilder: (context, index) {
                  final note = notes[index];
                  return ListTile(
                    title: Text(note['title']),
                    subtitle: Text("Subject: ${note['subject']}"),
                    trailing: IconButton(
                      icon: Icon(Icons.download),
                      onPressed: () async {
                        final url = note['fileUrl'];
                        // Handle note download or open
                      },
                    ),
                  );
                },
              );
            },
          ),
        );
      },
    );
  }
}
