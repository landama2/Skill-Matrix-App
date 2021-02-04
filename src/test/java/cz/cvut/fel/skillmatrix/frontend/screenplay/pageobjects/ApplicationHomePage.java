package cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import net.thucydides.core.annotations.DefaultUrl;

@DefaultUrl("http://localhost:8080")
public class ApplicationHomePage extends PageObject {

    public static final Target CATEGORY_NAME = Target
            .the("Category {0}")
            .locatedBy("//div[@id=\"navbarMain\"]//a[@class=\"nav-link\" and text() = \"{0}\"]");

    public static final Target ITEMS = Target
            .the("Item")
            .locatedBy("//div[@class='card-body']/h5[contains(@class, 'product-name')]");
    public static final Target PRODUCT_NAME = Target.the("Product {0}")
            .locatedBy("//div[@class='card-body']/h5[contains(@class, 'product-name') and text() = '{0}']");

    public static final Target GREETING_MESSAGE = Target.the("Greetings {0}")
        .locatedBy("//*[@id=\"home-logged-message\"]");

}
