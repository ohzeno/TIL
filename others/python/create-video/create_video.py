from moviepy.editor import *
from PIL import Image, ImageDraw, ImageFont
import numpy as np


# 배경 이미지를 로드하고 텍스트를 그리는 함수
def create_text_image_with_background(text, background_image_path,
                                      font_path="NanumGothic.ttf", overlay_opacity=128):
    # 폰트 크기 설정
    max_fontsize = 50
    min_fontsize = 10

    # 배경 이미지 로드
    img = Image.open(background_image_path)
    img_width, img_height = img.size

    # 텍스트 추가를 위한 드로잉 객체 생성
    d = ImageDraw.Draw(img)

    # 상단이 짙고 하단이 옅은 흰색 그라데이션 생성
    gradient = Image.new('RGBA', (img_width, img_height), color=0)
    for y in range(img_height):
        # 투명도는 y값에 따라 점점 줄어듭니다.
        # alpha = int(255 * (1 - (y / img_height) ** 3))  # 상단이 짙고 하단으로 갈수록 투명해짐
        if y < img_height * 2 / 3:
            # 상단 2/3 부분은 기존 투명도 계산 방식 사용
            alpha = int(255 * (1 - (y / img_height) ** 2))  # 상단이 짙고 하단으로 갈수록 투명해짐
        else:
            # 하단 1/3 부분: 초기 alpha 값은 상단 2/3 끝값으로 설정
            # 초기값 설정: y = 2/3일 때 alpha 값
            initial_alpha = 255 * (1 - (2 / 3) ** 2)

            # 하단 1/3에서 alpha는 초기값에서 천천히 감소
            progress_in_lower_third = (y - img_height * 2 / 3) / (img_height / 3)  # 0에서 1까지 변화
            alpha = int(initial_alpha * (1 - progress_in_lower_third * 0.5))  # 50%만 더 감소

        for x in range(img_width):
            gradient.putpixel((x, y), (255, 255, 255, alpha))  # 흰색 + 투명도

    # 배경 이미지와 그라데이션 레이어 합성
    img = Image.alpha_composite(img.convert("RGBA"), gradient)

    # 폰트 설정
    font_size = max_fontsize
    font = ImageFont.truetype(font_path, font_size)

    # 줄 간 여백 설정 (폰트 크기의 20%)
    def get_line_height(font, line):
        bbox = d.textbbox((0, 0), line, font=font)
        return bbox[3] - bbox[1] + int(font_size * 0.2)

    # 텍스트가 이미지 높이에 맞는지 확인
    def fits_in_image(lines, font):
        total_height = sum([get_line_height(font, line) if line.strip() else get_line_height(font, "A") // 2 for line in lines])
        return total_height <= img_height

    # 텍스트 줄바꿈 처리
    lines = text.split("\n")

    # 텍스트가 이미지 안에 맞지 않으면 폰트 크기를 줄여가며 조정
    while not fits_in_image(lines, font) and font_size > min_fontsize:
        font_size -= 1
        font = ImageFont.truetype(font_path, font_size)

    # 텍스트 높이 계산
    total_text_height = sum([get_line_height(font, line) if line.strip() else get_line_height(font, "A") // 2 for line in lines])
    y_offset = (img_height - total_text_height) // 3

    # 텍스트 그리기
    d = ImageDraw.Draw(img)  # 새 드로잉 객체 생성 (합성된 이미지로)
    for line in lines:
        if line.strip() == "":  # 빈 줄 처리
            y_offset += get_line_height(font, "A") // 2  # 빈 줄은 여백만 추가
        else:
            bbox = d.textbbox((0, 0), line, font=font)
            text_width = bbox[2] - bbox[0]
            position = ((img_width - text_width) // 2, y_offset)  # 수평 중앙 배치
            d.text(position, line, font=font, fill=(0, 0, 0))  # 흰색 텍스트 그리기
            y_offset += get_line_height(font, line)  # 줄 간 여백 포함하여 y_offset 조정

    return img.convert("RGB")  # 최종 이미지를 RGB 모드로 변환


# 배경 이미지 경로 설정 (사용할 이미지 파일 경로)
background_image_path = "KakaoTalk_20240912_181604680.jpg"  # 배경 이미지 파일 경로

# 텍스트 내용
text = "\n테스트용 제목\n\n\n\n\n\n테스트용 내용\n\n\n\nㅁㅁㄴㅇㄻㄴㅇㄹ\n\nㅁㄴㅇㄻㄴㄹㅇ\n\nㅁㄴㅇㄻㄴㅇㄹ\n\n\n\nㅁㄴㅇㄻㄴㅇㄹ\n\n\n\nㅁㄴㅇㄻㄴㅇㄹ\n\nㅁㄴㅇㄻㄴㄹ\n\nㅁㄴㅇㄻㄴㅇㄹ\n\nㅁㄴㅇㄻㄴㅇㄹ\n\n\n\nㅁㄴㅇㄻㄴㅇㄹ\n\n\n\nㅁㄴㅇㄹㄴㅁㅇㄹ\n\n바ㅁㄴㅇㄻㄴ\n\nㅁㄴㅇㄻㄴㅇㄹ\n\n\n\nㅁㄴㅇㄻㄴㅇㄹ\n\n\n\nㅁㄴㅇㄻㄴㅇㄹ\n\nㅁㄴㅇㄻㄴ\n\nㅁㄴㅇㄻㄴㅇㄹ\n\n\n\nㅁㄴㅇㄻㄴㄹㅇ\n\nㅁㄴㅇㄻㄴㅇㄹ\n\nㅁㄴㅇㄻㄴㅇㄹ\n\n\n\nㅁㄴㅇㄻㄴㅇㄹ\n\nㅁㄴㅇㄹㄴㅇㄹㄴ\n\nㅁㄴㅇㄻㄴㅇㄻㄴㅇㄹ\n\n\n"

# 텍스트 이미지 생성 (배경 이미지에 텍스트 추가)
text_img = create_text_image_with_background(text, background_image_path, "NanumGothic.ttf", 128)

# PIL 이미지에서 MoviePy 이미지로 변환
text_clip = ImageClip(np.array(text_img)).set_duration(10)  # 영상 지속 시간 10초 설정

# 오디오 파일 이름
audio_name = 'ㅁㄴㅇㄹㄴㅇㄹㄴㄹ'

# 오디오 파일 경로
audio = AudioFileClip(f"{audio_name}.mp3")

# 영상 클립 생성
video = text_clip.set_audio(audio)

# 최종 영상 파일로 저장
video.write_videofile(f"{audio_name}_영상.mp4", fps=24)
