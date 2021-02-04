package cz.cvut.fel.skillmatrix.frontend.screenplay.questions;

import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.ApplicationHomePage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.matchers.WebElementStateMatchers;
import net.serenitybdd.screenplay.questions.Text;
import net.serenitybdd.screenplay.questions.WebElementQuestion;
import net.serenitybdd.screenplay.targets.Target;
import net.serenitybdd.screenplay.waits.Wait;

public class DisplayedMessageQuestion implements Question<String> {

    public Target MESSAGE;

    public DisplayedMessageQuestion(Target MESSAGE) {
        this.MESSAGE = MESSAGE;
    }

    public static Question<String> forUser(Target message) {
        return new DisplayedMessageQuestion(message);
    }

    @Override
    public String answeredBy(Actor actor){
        actor.attemptsTo(Wait.until(WebElementQuestion.the(MESSAGE), WebElementStateMatchers.isEnabled()).forNoLongerThan(5).seconds());
        return Text.of(MESSAGE).viewedBy(actor).resolve().replace("$", "");
    }

}
