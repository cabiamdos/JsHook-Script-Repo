// 2025/10/04 01:34:50
// write your script...

Java.perform(function() {
  var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
  var NotificationManager = Java.use('android.app.NotificationManager');
  var NotificationChannel = Java.use('android.app.NotificationChannel');
  var NotificationBuilder = Java.use('android.app.Notification$Builder');

  var channelId = "frida_channel_id";
  var channelName = "Frida Notifications";

  // Create notification channel (required for Android 8+)
  var notifManager = context.getSystemService(context.NOTIFICATION_SERVICE);
  var channel = NotificationChannel.$new(channelId, channelName, NotificationManager.IMPORTANCE_DEFAULT);
  notifManager.createNotificationChannel(channel);
  
  // Build notification
  var builder = NotificationBuilder.$new(context, channelId);
  builder.setContentTitle("Frida Notification");
  builder.setContentText("This is a custom notification sent from Frida.");
  builder.setSmallIcon(context.getApplicationInfo().icon);
  
  var notification = builder.build();
  
  // Show notification
  notifManager.notify(1, notification);
});
