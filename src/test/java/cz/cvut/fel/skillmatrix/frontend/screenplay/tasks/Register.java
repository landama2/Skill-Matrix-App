package cz.cvut.fel.skillmatrix.frontend.screenplay.tasks;

import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.LoginPage;
import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.RegistrationPage;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.thucydides.core.annotations.Step;


public class Register implements Task {

    String email;
    String username;
    String password1;
    String password2;

    public Register(String username, String email, String password1, String password2) {
        this.username = username;
        this.email = email;
        this.password1 = password1;
        this.password2 = password2;
    }

    public static Register called(String username, String email, String password1, String password2) {
        return Instrumented.instanceOf(Register.class).withProperties(username, email, password1, password2);
    }

    @Step("{0} registers a user")
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
            Click.on(LoginPage.registerLink),
            Enter.theValue(username)
                .into(RegistrationPage.usernameField),
            Enter.theValue(email)
                .into(RegistrationPage.emailField),
            Enter.theValue(password1)
                .into(RegistrationPage.passwordField),
            Enter.theValue(password2)
                .into(RegistrationPage.confirmPasswordField),
            Click.on(RegistrationPage.submitButton)
        );
    }
}
