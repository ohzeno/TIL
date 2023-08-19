a = 0
def test():
    global a
    a += 1

print(a)
test()
print(a)

d = 10
def solution():
    print("Solution")
    b = 0
    c = [0]
    def check():
        global b, d
        try:
            d += 1
            b += 1
        except Exception as err:
            print(err)
            d += 1
            c[0] += 1
    print(b, d, c)
    check()
    print(b, d, c)

solution()
