import requests
import json

# Setup
BASE_URL = "http://127.0.0.1:8000/api"
LOGIN_URL = f"{BASE_URL}/auth/login/"
ANALYTICS_URL = f"{BASE_URL}/analytics/dashboard/"

# Admin credentials
login_data = {
    "email": "admin@aiverse.com",
    "password": "admin123"
}

def check_admin_dashboard():
    print(f"Attempting to login to {LOGIN_URL}...")
    try:
        response = requests.post(LOGIN_URL, json=login_data)
        if response.status_code != 200:
            print(f"Login failed: {response.status_code}")
            print(response.text)
            return
        
        token = response.json().get('access')
        print("Login successful! Token acquired.")
        
        headers = {
            "Authorization": f"Bearer {token}"
        }
        
        print(f"Fetching analytics from {ANALYTICS_URL}...")
        analytics_response = requests.get(ANALYTICS_URL, headers=headers)
        
        if analytics_response.status_code == 200:
            print("Analytics response received:")
            print(json.dumps(analytics_response.json(), indent=2))
        else:
            print(f"Failed to fetch analytics: {analytics_response.status_code}")
            print(analytics_response.text)
            
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    check_admin_dashboard()
