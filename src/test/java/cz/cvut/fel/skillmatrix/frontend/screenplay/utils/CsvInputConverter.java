package cz.cvut.fel.skillmatrix.frontend.screenplay.utils;

public class CsvInputConverter {

    public static String toUsername(String usernameLength) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < Integer.parseInt(usernameLength); i++) {
            sb.append("a");
        }
        return sb.toString();
    }

    public static Passwords toPassword(String passwords) {
        if (passwords.equalsIgnoreCase("don't match")) {
            return new Passwords("abcdef", "defghj");
        }
        if (passwords.equalsIgnoreCase("under 4 chars")) {
            return new Passwords("abc", "abc");
        }
        return new Passwords("password123", "password123");
    }
}
