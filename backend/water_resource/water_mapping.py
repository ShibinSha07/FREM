from flask import Flask, request, jsonify
import requests
import logging
from flask_cors import CORS
from cachetools import TTLCache

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Overpass API Configuration (Alternative URL: "https://overpass-api.de/api/interpreter")
OVERPASS_URL = "https://overpass-api.de/api/interpreter"



# Cache to store responses (TTL: 600 seconds = 10 minutes)
cache = TTLCache(maxsize=100, ttl=600)


def get_water_resources(lat, lon, radius=50000):
    """
    Fetches water bodies (nodes, ways, relations) near a given location.
    Uses Overpass API for OpenStreetMap data.
    """
    query = f"""
    [out:json];
    (
      node["natural"="water"](around:{radius},{lat},{lon});
      way["natural"="water"](around:{radius},{lat},{lon});
      relation["natural"="water"](around:{radius},{lat},{lon});
    );
    out center;
    """

    cache_key = f"{lat},{lon},{radius}"
    
    # Return cached result if available
    if cache_key in cache:
        logger.info(f"Cache hit for {cache_key}")
        return cache[cache_key]

    logger.info(f"Fetching water resources from Overpass API for {cache_key}")

    try:
        response = requests.get(OVERPASS_URL, params={"data": query}, timeout=10)
        response.raise_for_status()
        data = response.json()
    except requests.exceptions.RequestException as e:
        logger.error(f"Overpass API request failed: {e}")
        return None
    except ValueError:
        logger.error("Failed to parse JSON response from Overpass API")
        return None

    if "elements" not in data:
        return []

    water_resources = []
    for element in data["elements"]:
        resource = {
            "type": element["type"],
            "id": element["id"],
            "name": element.get("tags", {}).get("name", "Unnamed Water Body"),
        }

        # Extract coordinates
        if element["type"] == "node":
            resource["lat"] = element["lat"]
            resource["lon"] = element["lon"]
        elif element["type"] in ["way", "relation"] and "center" in element:
            resource["lat"] = element["center"]["lat"]
            resource["lon"] = element["center"]["lon"]

        water_resources.append(resource)

    # Store result in cache
    cache[cache_key] = water_resources

    return water_resources


@app.route("/", methods=["GET"])
def health_check():
    """ Health check endpoint """
    return jsonify({"message": "Water Resources API is running"}), 200


@app.route("/water-resources", methods=["GET"])
def water_resources():
    """
    API endpoint to get water resources near a location.
    Example request: /water-resources?lat=40.7128&lon=-74.0060&radius=5000
    """
    lat = request.args.get("lat")
    lon = request.args.get("lon")
    radius = request.args.get("radius", 5000)  # Default radius: 5000 meters

    if not lat or not lon:
        return jsonify({"error": "Latitude and longitude are required"}), 400

    try:
        lat, lon = float(lat), float(lon)
        radius = int(radius)
        logger.info(f"Received request - Lat: {lat}, Lon: {lon}, Radius: {radius}")
    except ValueError:
        return jsonify({"error": "Invalid latitude, longitude, or radius"}), 400

    data = get_water_resources(lat, lon, radius)
    if data is None:
        return jsonify({"error": "Failed to retrieve data from Overpass API"}), 500

    if not data:
        return jsonify({"message": "No water resources found in the specified area"}), 404

    return jsonify({"water_resources": data}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

