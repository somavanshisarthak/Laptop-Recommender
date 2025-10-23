from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def load_laptops():
    """Load laptop data from JSON file"""
    try:
        with open('data/laptops.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def filter_laptops_by_budget_and_type(laptops, budget, use_type):
    """Filter laptops by budget and use case"""
    filtered = []
    for laptop in laptops:
        if laptop['price'] <= budget and laptop['use_case'].lower() == use_type.lower():
            filtered.append(laptop)
    return filtered

def sort_laptops_by_value(laptops):
    """Sort laptops by value (performance per price)"""
    # Simple value calculation: prioritize higher RAM and storage for the price
    return sorted(laptops, key=lambda x: (x['ram'] + x['storage']/100) / x['price'], reverse=True)

@app.route('/')
def home():
    """Home endpoint"""
    return jsonify({"message": "Laptop Recommender API is running!"})

@app.route('/recommend')
def recommend():
    """Get laptop recommendations based on budget and use case"""
    try:
        # Get query parameters
        budget = request.args.get('budget', type=int)
        use_type = request.args.get('type', type=str)
        
        # Validate parameters
        if budget is None or use_type is None:
            return jsonify({"error": "Both 'budget' and 'type' parameters are required"}), 400
        
        if budget <= 0:
            return jsonify({"error": "Budget must be greater than 0"}), 400
        
        # Load laptop data
        laptops = load_laptops()
        if not laptops:
            return jsonify({"error": "No laptop data available"}), 500
        
        # Filter laptops by budget and use case
        filtered_laptops = filter_laptops_by_budget_and_type(laptops, budget, use_type)
        
        if not filtered_laptops:
            return jsonify({
                "message": f"No laptops found for budget ₹{budget} and use case '{use_type}'",
                "laptops": []
            })
        
        # Sort by value and get top 5
        sorted_laptops = sort_laptops_by_value(filtered_laptops)
        top_5_laptops = sorted_laptops[:5]
        
        return jsonify({
            "message": f"Found {len(filtered_laptops)} laptops matching your criteria",
            "laptops": top_5_laptops
        })
        
    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

if __name__ == '__main__':
    # Ensure data directory exists
    os.makedirs('data', exist_ok=True)
    app.run(debug=True, host='0.0.0.0', port=5000)
