#include <WiFi.h>
#include <HTTPClient.h>

// WiFi Credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Backend API Endpoint
const char* serverUrl = "http://YOUR_BACKEND_IP/api/waste/bin-status";

const char* serverName = "http://192.168.X.X/esp/update-bin-status";  // Update with actual backend IP or domain

// Pin Configurations
#define TRASH_SENSOR_PIN 34  // Example IR sensor pin for bin full detection
#define CLASSIFICATION_SENSOR_PIN 35  // Example pin for AI waste type detection
#define BIN_FULL_THRESHOLD 600  // Adjust threshold for full detection

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }

    Serial.println("Connected to WiFi!");
    pinMode(TRASH_SENSOR_PIN, INPUT);
    pinMode(CLASSIFICATION_SENSOR_PIN, INPUT);
}

void loop() {
    int binStatus = analogRead(TRASH_SENSOR_PIN);
    int wasteType = analogRead(CLASSIFICATION_SENSOR_PIN); // Simulated AI sensor reading

    bool binFull = binStatus > BIN_FULL_THRESHOLD; // Check if bin is full

    if (binFull) {
        Serial.println("🚨 Bin is FULL! Sending update...");
        sendBinStatus(true);
    }

    // Simulate waste type classification (example values)
    if (wasteType > 500) {
        sendWasteType("plastic");
    } else if (wasteType > 300) {
        sendWasteType("organic");
    } else {
        sendWasteType("metal");
    }

    delay(10000); // Check every 10 seconds
}

// Function to send bin status to backend
void sendBinStatus(bool isFull) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(serverUrl);
        http.addHeader("Content-Type", "application/json");

        String payload = "{\"binFull\":" + String(isFull ? "true" : "false") + "}";
        int httpResponseCode = http.POST(payload);

        Serial.print("Bin Status Response: ");
        Serial.println(httpResponseCode);
        http.end();
    } else {
        Serial.println("WiFi Disconnected. Cannot send bin status.");
    }
}

// Function to send detected waste type
void sendWasteType(String wasteType) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin("http://YOUR_BACKEND_IP/api/waste/classify");
        http.addHeader("Content-Type", "application/json");

        String payload = "{\"userId\":\"12345\", \"wasteType\":\"" + wasteType + "\"}";
        int httpResponseCode = http.POST(payload);

        Serial.print("Waste Classification Response: ");
        Serial.println(httpResponseCode);
        http.end();
    } else {
        Serial.println("WiFi Disconnected. Cannot send waste type.");
    }
}
