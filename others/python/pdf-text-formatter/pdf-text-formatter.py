import sys
import clipboard

sys.stdin = open('input.txt', 'r', encoding='utf-8')
s = ''
for line in sys.stdin:
    s += line
s = s.replace('-\n', '').replace('\n ', ' ').replace('\n', '')
clipboard.copy(s)
