package test;
public class test {
    public static void test() {
        for(var i = 0; i < 4; i++) {
            System.out.println("    test" + i);
        }
    }

    public static void main(String[] args) {
        for(var i = 0; i < 4; i++) {
            System.out.println("out "+i);
            test();
        }
    }
}
