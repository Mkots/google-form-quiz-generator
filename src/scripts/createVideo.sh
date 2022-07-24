convert cover.jpg -resize 720x480\! rigth_cover.jpg && ffmpeg -loop 1 -i rigth_cover.jpg -i audio.mp3 -c:v libx264 -tune stillimage -c:a aac -b:a 192k -pix_fmt yuv420p -shortest video.mp4

