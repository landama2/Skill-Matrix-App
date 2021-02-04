package cz.cvut.fel.skillmatrix.frontend.screenplay.tasks;

import cz.cvut.fel.skillmatrix.frontend.screenplay.abilities.Authenticate;
import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.LoginPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.thucydides.core.annotations.Step;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class Login implements Task {

    public static Login withCredentials() {
        return instrumented(Login.class);
    }

    private Authenticate authenticated(Actor actor) {
        return Authenticate.as(actor);
    }

    @Override
    @Step("Logs in as: {0}")
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(LoginPage.loginLink),
                Enter.theValue(authenticated(actor).nickname())
                        .into(LoginPage.username),
                Enter.theValue(authenticated(actor).password())
                        .into(LoginPage.password),
                Click.on(LoginPage.loginButton)
        );
    }
}
