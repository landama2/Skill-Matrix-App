package cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;

public class LoggedInMenu extends PageObject {

    public static final Target category = Target
        .the("Category menu item")
        .locatedBy("//*[@id=\"navbarResponsive\"]/ul/li[4]/a/span");

}
