#!/usr/bin/env python3
"""
Simple test script to verify API endpoints work correctly
"""
import requests
import json

def test_api():
    base_url = "http://localhost:5001"
    
    print("🧪 Testing Laptop Recommender API...")
    print("=" * 50)
    
    # Test 1: Health check endpoint
    print("1. Testing health check endpoint (GET /)")
    try:
        response = requests.get(f"{base_url}/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed: {data['message']}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Make sure Flask server is running on port 5001")
        return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False
    
    # Test 2: Recommendation endpoint with valid parameters
    print("\n2. Testing recommendation endpoint (GET /recommend)")
    try:
        response = requests.get(f"{base_url}/recommend?budget=75000&type=Gaming")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Recommendation request successful")
            print(f"   Message: {data.get('message', 'No message')}")
            print(f"   Found {len(data.get('laptops', []))} laptops")
            if data.get('laptops'):
                first_laptop = data['laptops'][0]
                print(f"   First laptop: {first_laptop['name']} - ₹{first_laptop['price']}")
        else:
            print(f"❌ Recommendation request failed: {response.status_code}")
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"❌ Recommendation error: {e}")
        return False
    
    # Test 3: Recommendation endpoint with missing parameters
    print("\n3. Testing recommendation endpoint with missing parameters")
    try:
        response = requests.get(f"{base_url}/recommend?budget=75000")
        if response.status_code == 400:
            data = response.json()
            print(f"✅ Error handling works: {data.get('error', 'No error message')}")
        else:
            print(f"❌ Expected 400 error, got: {response.status_code}")
    except Exception as e:
        print(f"❌ Error handling test failed: {e}")
        return False
    
    # Test 4: Recommendation endpoint with invalid budget
    print("\n4. Testing recommendation endpoint with invalid budget")
    try:
        response = requests.get(f"{base_url}/recommend?budget=-100&type=Gaming")
        if response.status_code == 400:
            data = response.json()
            print(f"✅ Budget validation works: {data.get('error', 'No error message')}")
        else:
            print(f"❌ Expected 400 error, got: {response.status_code}")
    except Exception as e:
        print(f"❌ Budget validation test failed: {e}")
        return False
    
    print("\n" + "=" * 50)
    print("🎉 All API tests completed!")
    return True

if __name__ == "__main__":
    test_api()
