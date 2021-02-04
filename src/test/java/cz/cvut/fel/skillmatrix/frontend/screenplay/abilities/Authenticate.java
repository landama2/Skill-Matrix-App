package cz.cvut.fel.skillmatrix.frontend.screenplay.abilities;

import net.serenitybdd.screenplay.Ability;
import net.serenitybdd.screenplay.Actor;

import static org.junit.Assert.fail;

public class Authenticate implements Ability {

    private final String nickname;
    private final String password;

    public static Authenticate with(String nickname, String password) {
        return new Authenticate(nickname, password);
    }

    public static Authenticate as(Actor actor) {
        if (actor.abilityTo(Authenticate.class) == null) {
            fail();
        }

        return actor.abilityTo(Authenticate.class);
    }

    public String nickname() {
        return this.nickname;
    }

    public String password() {
        return this.password;
    }

    private Authenticate(String nickname, String password) {
        this.nickname = nickname;
        this.password = password;
    }

}
