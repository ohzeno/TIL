import sys
sys.setrecursionlimit(5 + 4)

def test(num):
    print(num)
    try:
        test(num + 1)
    except Exception as err:
        print(err)

print(0)
test(1)