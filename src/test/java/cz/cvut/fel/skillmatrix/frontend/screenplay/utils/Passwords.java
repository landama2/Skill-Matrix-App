package cz.cvut.fel.skillmatrix.frontend.screenplay.utils;

public class Passwords {

    String password1;
    String password2;

    public Passwords(String password1, String password2) {
        this.password1 = password1;
        this.password2 = password2;
    }

    public String getPassword1() {
        return password1;
    }

    public String getPassword2() {
        return password2;
    }
}
