import random
import pandas as pd # Changed to Pandas for easier CSV handling
import numpy as np
import os

# ================================
# CONFIGURATION
# ================================
TOTAL_SAMPLES = 500
BOT_PROPORTION = 0.3 # 30% of traffic is bots

def generate_behavioral_data():
    logs = []
    
    for i in range(TOTAL_SAMPLES):
        is_bot = random.random() < BOT_PROPORTION
        
        if is_bot:
            # Bot: High frequency, very small time gaps
            time_gap = round(random.uniform(0.01, 0.8), 3)
            request_rate = random.randint(40, 100)
            same_ip_attempts = random.randint(10, 30)
            label = 1 # 1 for Anomaly/Bot
        else:
            # Human: Random, larger time gaps
            time_gap = round(random.uniform(1.5, 30.0), 2)
            request_rate = random.randint(1, 12)
            same_ip_attempts = random.randint(1, 3)
            
            # ADDING NOISE: Sometimes humans are fast (double clicking)
            if random.random() < 0.05: 
                time_gap = 0.5 
            label = 0 # 0 for Normal
            
        logs.append([time_gap, request_rate, same_ip_attempts, label])
    
    # Create a DataFrame (Professional Standard)
    df = pd.DataFrame(logs, columns=['time_gap', 'request_rate', 'same_ip', 'is_bot'])
    return df

def save_dataset(df, filename="data/raw/traffic_logs.csv"):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    df.to_csv(filename, index=False)
    print(f"✅ Strong Dataset saved to {filename}")

if __name__ == "__main__":
    dataset = generate_behavioral_data()
    print(dataset.head()) # Shows first 5 rows
    save_dataset(dataset)