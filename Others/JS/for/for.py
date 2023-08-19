def test():
    for i in range(4):
        print(f'    test {i}')

for i in range(4):
    print(f'out {i}')
    test()
