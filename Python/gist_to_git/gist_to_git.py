import os
import subprocess

# 원하는 URL들을 '폴더명': 'url' 형태로 딕셔너리에 저장
gistUrls = {
    'Day01': 'https://gist.github.com/d52371c3d32acf1b9a6751e256e88f3c.git',
    'Day02': 'https://gist.github.com/f4907922fb8931541899c0445cf9299a.git',
    'Day03': 'https://gist.github.com/003945c4fdae034e4418ee1fc465c583.git',
    'Day04': 'https://gist.github.com/4f9305bb014b58002f823c3dc9ac4200.git',
    'Day06': 'https://gist.github.com/b3291b81a9adf677fcfd8f5cf66160ef.git',
    'Day07': 'https://gist.github.com/bb64d5abecfd90ba6f87f89a191ac5ca.git',
    'Day08': 'https://gist.github.com/edeca0ca5190353253f9d102f4520eb7.git',
    'Day09': 'https://gist.github.com/919645ca0bbd26d18645f2247cdc5172.git',
    'Day11-12': 'https://gist.github.com/bb2fb8636e48fc9d5c812c0a05bebd70.git',
    'Day13-14': 'https://gist.github.com/a6887c5fb433b57a34e57d1a126f53f5.git',
    'Day16-17': 'https://gist.github.com/15cb0a27f4b2876e0235036498d84444.git',
    'Day18-19': 'https://gist.github.com/a6ddd6ddc924ed674cef6fada90178fb.git',
}

# gist를 옮길 git 레포들(업데이트된 셀레늄 코드 작성하기 귀찮아서 직접 만들어둠)
gitUrls = {
    'Day01': 'https://github.com/ohzeno/Day01.git',
    'Day02': 'https://github.com/ohzeno/Day02.git',
    'Day03': 'https://github.com/ohzeno/Day03.git',
    'Day04': 'https://github.com/ohzeno/Day04.git',
    'Day06': 'https://github.com/ohzeno/Day06.git',
    'Day07': 'https://github.com/ohzeno/Day07.git',
    'Day08': 'https://github.com/ohzeno/Day08.git',
    'Day09': 'https://github.com/ohzeno/Day09.git',
    'Day11-12': 'https://github.com/ohzeno/Day11-12.git',
    'Day13-14': 'https://github.com/ohzeno/Day13-14.git',
    'Day16-17': 'https://github.com/ohzeno/Day16-17.git',
    'Day18-19': 'https://github.com/ohzeno/Day18-19.git',
}

for folderName, gistUrl in gistUrls.items():
    # 폴더 이름으로 클론
    subprocess.run(['git', 'clone', gistUrl, folderName])

    # 클론한 폴더 내로 이동
    os.chdir(folderName)

    # 원격 레포지토리 GitHub쪽으로 변경
    subprocess.run(['git', 'remote', 'set-url', 'origin', gitUrls[folderName]])

    # 변경한 원격 레포지토리로 푸시
    subprocess.run(['git', 'push', '-u', 'origin', 'master'])

    # 상위 폴더로 돌아감
    os.chdir('..')
