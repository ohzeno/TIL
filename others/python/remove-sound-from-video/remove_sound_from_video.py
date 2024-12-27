import moviepy.video.io.VideoFileClip as VideoFileClip

def remove_audio(input_video, output_video):
    video = VideoFileClip.VideoFileClip(input_video)
    video_without_audio = video.without_audio()
    video_without_audio.write_videofile(output_video)
    video.close()
    video_without_audio.close()

input_video = "test.mp4"
output_video = "output_no_audio.mp4"
remove_audio(input_video, output_video)