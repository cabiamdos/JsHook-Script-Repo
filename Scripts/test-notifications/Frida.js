// 2025/10/04 01:34:50
// write your script...

Java.perform(function () {
  var Context = Java.use('android.content.Context');
  var ActivityThread = Java.use('android.app.ActivityThread');
  var NotificationManager = Java.use('android.app.NotificationManager');
  var NotificationChannel = Java.use('android.app.NotificationChannel');
  var NotificationBuilder = Java.use('android.app.Notification$Builder');

  var app = ActivityThread.currentApplication();
  var context = app.getApplicationContext();

  // Get the NotificationManager using proper static constant for service name
  var notifManager = context.getSystemService(Context.NOTIFICATION_SERVICE.value);

  // Create Notification Channel for Android 8+
  var channelId = "frida_channel_id";
  var channelName = "Frida Notifications";
  var IMPORTANCE_DEFAULT = NotificationManager.IMPORTANCE_DEFAULT.value;

  var channel = NotificationChannel.$new(channelId, channelName, IMPORTANCE_DEFAULT);
  notifManager.createNotificationChannel(channel);

  // Build the notification
  var builder = NotificationBuilder.$new(context, channelId);
  builder.setContentTitle("Frida Notification");
  builder.setContentText("This is a custom notification sent from Frida.");
  builder.setSmallIcon(context.getApplicationInfo().icon);

  // Build the notification object
  var notification = builder.build();

  // Post the notification with ID 1
  notifManager.notify(1, notification);

  console.log("Notification posted successfully.");
});
