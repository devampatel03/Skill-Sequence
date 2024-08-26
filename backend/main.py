import mysql.connector

db_config = {
    'user': 'avnadmin',
    'password': 'AVNS_h4eCBRzKkM_Bl1FWHqq',
    'host': 'skill-skillsequence.h.aivencloud.com',
    'database': 'skillsequence',
    'port': '28152',
}

conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

video_path = r'Skill-Sequence-\backend\videos\Video3.mp4'
title = 'Video_3'

with open(video_path, 'rb') as file:
    video_data = file.read()

insert_query = "INSERT INTO videos (title, video) VALUES (%s, %s)"
cursor.execute(insert_query, (title, video_data))

conn.commit()

print("Video uploaded successfully!")

cursor.close()
conn.close()
