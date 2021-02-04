package cz.cvut.fel.skillmatrix.frontend.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public abstract class BasePage {

    protected WebDriver driver;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    @FindBy(linkText = "Categories")
    WebElement categoryMenu;

    protected abstract String getPageUrl();

    public boolean isOnPage() {
        return driver.getCurrentUrl().equals(getPageUrl());
    }

    public void setField(WebElement field, String value) {
        field.clear();
        field.sendKeys(value);
    }

}
