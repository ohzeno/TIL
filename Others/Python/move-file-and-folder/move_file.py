import os
import shutil

from_dir = 'D:\data\crawling\cookbook'
to_dir = 'E:\data\cookbook'
file_list = os.listdir(from_dir)  # from_dir의 파일리스트
if from_dir == to_dir:  # 실수로 경로 같게 적은 경우
    print('from_dir과 to_dir은 다른 경로여야 합니다.')
else:  # 경로 다르다면
    for file in file_list:  # 파일 목록에서 확장자 pt인 경우만
        if file.endswith('.pt'):
            try:  # 이동 시도
                shutil.move(os.path.join(from_dir, file), to_dir)
                print(f'{file} moved!')
            except Exception as err:
                # 이미 목표 위치에 파일이 존재하는 경우 시작위치 파일 삭제
                if err.args[0].endswith('already exists'):
                    os.remove(os.path.join(from_dir, file))
                print(err)
                print(f'{file} not moved!')
