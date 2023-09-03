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

 
})
