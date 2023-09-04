/// <reference types ="Cypress" />

import swagLab_PageElements from "../Page_Elements/swagLab_PageElements.js"


let swagObj = new swagLab_PageElements()

describe("---SwagLab Login Page Validation---", function () {
  
  before(
    "Loads the Login Page",
    function () {
      cy.Handling_Exception()
      cy.visit("/")
    }
  )

  beforeEach("Loading the External Data", function () {
    cy.fixture("swagLab").as("userData") //Loading External Data
    cy.visit('/')

  })

  it('TC:01- Verify that the user is able to login to the application using a valid username and password.', function () {
    
    swagObj.checkLoginPageContentsLoaded();
    cy.login_Application(this.userData.userName,this.userData.passWord)
    swagObj.check_ProductsPageContentsLoaded();
    cy.logout_Application();

  })

  it('TC:02- Verify that the user is able to login to the application using a Invalid username and password.', function () {
    
    swagObj.checkLoginPageContentsLoaded();
    cy.login_Application(this.userData.otherUserName[1],this.userData.otherPassword[1])
    swagObj.loginValidation("Invalid")
    swagObj.performRefresh();

  })


  it('TC:03- Verify that the user is able to login to the application using a Locked Account username and password.', function () {
    
    swagObj.checkLoginPageContentsLoaded();
    cy.login_Application(this.userData.otherUserName[0],this.userData.otherPassword[0])
    swagObj.loginValidation("Locked-User")
    swagObj.performRefresh();
    
  })



  it('TC:04- Verify that the user is able to add the product from the product detail page.', function () {
  
    swagObj.checkLoginPageContentsLoaded();
    cy.login_Application(this.userData.userName,this.userData.passWord)
    swagObj.check_ProductsPageContentsLoaded();
    swagObj.selectProductName(this.userData.prodNames[0])
    swagObj.checkProductDetailPageContentsLoaded()
    swagObj.verifySelectedProductDetails(this.userData.prodNames[0],this.userData.prodPrices[0]);
    swagObj.performAddAndRemoveProductFromCart("Product-Not-added")
    swagObj.Navigate_BacktoProductsPage();
    cy.logout_Application();
  
  })



  it('TC:05- Verify that the user is able to sort the products in descending order.', function () {
  
    swagObj.checkLoginPageContentsLoaded();
    cy.login_Application(this.userData.userName,this.userData.passWord)
    swagObj.check_ProductsPageContentsLoaded();
    swagObj.selectSortDropdown(this.userData.sortOptions[1])
    swagObj.checkProductSortStatus(this.userData.sortOptions[1])
    cy.logout_Application();
  
  })


  it('TC:06- Verify that the user is able to sort the products in ascending order.', function () {
  
    swagObj.checkLoginPageContentsLoaded();
    cy.login_Application(this.userData.userName,this.userData.passWord)
    swagObj.check_ProductsPageContentsLoaded();
    swagObj.selectSortDropdown(this.userData.sortOptions[0])
    swagObj.checkProductSortStatus(this.userData.sortOptions[0])
    cy.logout_Application();
  
  })



  it('TC:07- Verify that the user is able to sort the product price in ascending order.', function () {
  
    swagObj.checkLoginPageContentsLoaded();
    cy.login_Application(this.userData.userName,this.userData.passWord)
    swagObj.check_ProductsPageContentsLoaded();
    swagObj.selectSortDropdown(this.userData.sortOptions[2])
    swagObj.sortProductbyPrice(this.userData.sortOptions[2])
    cy.logout_Application();
  
  })


  it('TC:08- Verify that the user is able to sort the product price in descending order.', function () {
  
    swagObj.checkLoginPageContentsLoaded();
    cy.login_Application(this.userData.userName,this.userData.passWord)
    swagObj.check_ProductsPageContentsLoaded();
    swagObj.selectSortDropdown(this.userData.sortOptions[3])
    swagObj.sortProductbyPrice(this.userData.sortOptions[3])
    cy.logout_Application();
  
  })


  it('TC:09- Verify that the user is able to add the product to the cart from the product details page.', function () {
  
    swagObj.checkLoginPageContentsLoaded();
    cy.login_Application(this.userData.userName,this.userData.passWord)
    swagObj.check_ProductsPageContentsLoaded();
    swagObj.selectProductName(this.userData.prodNames[2])
    swagObj.checkProductDetailPageContentsLoaded();
    swagObj.verifySelectedProductDetails(this.userData.prodNames[2],this.userData.prodPrices[2])
    swagObj.performAddAndRemoveProductFromCart("product-not-added")
    swagObj.Navigate_BacktoProductsPage()
    cy.logout_Application();
  
  })


  it('TC:10- Verify that the user is able to add the product to the cart from the product details page.', function () {
  
    swagObj.checkLoginPageContentsLoaded();
    cy.login_Application(this.userData.userName,this.userData.passWord)
    swagObj.check_ProductsPageContentsLoaded();
    swagObj.selectProductName(this.userData.prodNames[1])
    swagObj.checkProductDetailPageContentsLoaded();
    swagObj.verifySelectedProductDetails(this.userData.prodNames[1],this.userData.prodPrices[1])
    swagObj.performAddAndRemoveProductFromCart("product-not-added")
    swagObj.navigateProductCartPage()
    swagObj.verifyCartProductDetails(this.userData.prodNames[1],this.userData.prodPrices[1],this.userData.prodQTY[0])
    cy.logout_Application();
  
  })


 
})
