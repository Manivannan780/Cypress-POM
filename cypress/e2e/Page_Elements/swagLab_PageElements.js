/// <reference types ="Cypress" />

chai.use(require("chai-sorted"))


class swagLab_PageElements {

  //Login Page Elements

  userNameInput = '[data-test="username"]'
  passwordInput = '[data-test="password"]'
  loginBTN = '[id="login-button"]'
  loginPageLogo = 'div.login_logo';
  loginUserNameSection = '[id="login_credentials"]'
  loginPWSection = 'div[class*="login_password"]'
  loginError = 'h3[data-test="error"]'


  hamBurgerBTN = 'div[class="bm-burger-button"]'
  productsPageLogo = 'div.app_logo'
  productName = '[class="inventory_item_name"]'
  productImg = 'div[class="inventory_item_img"]'
  productPrice = 'div[class="inventory_item_price"]'
  addCartBTN = 'div[class="pricebar"] button[class*="btn_inventory"]'
  selectContainer = 'select[class="product_sort_container"]'



  //Logout Section

  allItemsLink = 'nav[class="bm-item-list"] a[id="inventory_sidebar_link"]'
  aboutLink = 'nav[class="bm-item-list"] a[id="about_sidebar_link"]'
  logoutLink = 'nav[class="bm-item-list"] a[id="logout_sidebar_link"]'
  resetLink = 'nav[class="bm-item-list"] a[id="reset_sidebar_link"]'


  //Product Details Page Elements
  productDescriptionSection = 'div[class="inventory_details_desc_container"]'
  productDetailPrice = 'div[class="inventory_details_price"]'
  productDetailName = 'div[class="inventory_details_name"]'
  productDetailDescription = 'div[class="inventory_details_desc"]'
  productDetailsPageBackBTN = 'button[class="inventory_details_back_button"]'
  productDetailsPageRemoveBTN = 'button[class*="btn_secondary btn_inventory"]'
  productDetailsPageADDCartBTN = 'button[class="btn_primary btn_inventory"]'


  //Cart Page Elements

  productCartBTN='div[id="shopping_cart_container"] a[class*="shopping_cart_link"]'
  cartPageProdDesc='div[class="inventory_item_desc"]'
  cartPageContinueBTN='div[class="cart_footer"] a.btn_secondary'
  cartPageCheckoutBTN='div[class="cart_footer"] a.checkout_button'
  cartPageQTY='div[class="cart_quantity"]'
  cartPageRemoveBTN='button[class="btn_secondary cart_button"]'







  checkLoginPageContentsLoaded() {

    cy.get(this.loginPageLogo).should('be.visible');

    cy.get(this.userNameInput).should('be.visible');
    cy.get(this.passwordInput).should('be.visible');
    cy.get(this.loginBTN).should('be.visible').and('be.enabled');
    cy.get(this.loginUserNameSection).should('exist');
    cy.get(this.loginPWSection).should('exist');

  }



  loginValidation(credentails) {

    if (credentails == "Invalid") {
      cy.get(this.loginError).contains('Username and password do not match any user in this service').should('be.visible')
    }
    else if (credentails == "Locked-User") {
      cy.get(this.loginError).contains("Sorry, this user has been locked out.").should('be.visible');

    }

  }


  performRefresh() {

    cy.reload()

  }


  check_ProductsPageContentsLoaded() {

    cy.url().should('include', '/inventory.html')
    cy.get(this.hamBurgerBTN).should('be.visible')
    cy.get(this.productsPageLogo).should('exist')
    cy.get(this.productName).eq(0).should('be.visible')
    cy.get(this.productImg).eq(0).should('be.visible')
    cy.get(this.productPrice).eq(0).should('be.visible')
    cy.get(this.addCartBTN).eq(0).should('be.visible')
    cy.get(this.selectContainer).should('be.visible')
    cy.url().should('include', '/inventory.html')

  }



  checkMenuSectionContentsLoaded() {

    cy.get(this.allItemsLink).contains('All Items').should('be.visible')
    cy.get(this.aboutLink).contains('About').should('be.visible')
    cy.get(this.logoutLink).contains('Logout').should('be.visible')
    cy.get(this.resetLink).contains('Reset App State').should('be.visible')

  }


  selectProductName(productsName) {

    cy.get(this.productName).each(function ($prodName, index, allProd) {

      if ($prodName.text() == productsName) {
        cy.get('[class="inventory_item_name"]').eq(index).click();
        return false
      }

    })

  }


  selectADDCartBTN(productsName) {

    cy.get(this.productName).each(function ($prodName, index, allProd) {

      if ($prodName.text() == productsName) {
        cy.get('div[class="pricebar"] button[class*="btn_inventory"]').eq(index).click();
        cy.get('div[class="pricebar"] button[class*="btn_secondary btn_inventory"]').contains("Remove").should('exist')
        return false
      }
    })

  }



  checkProductDetailPageContentsLoaded() {

    cy.get(this.productDescriptionSection).should('exist')
    cy.get(this.productDetailPrice).should('be.visible')
    cy.get(this.productDetailName).should('be.visible')
    cy.get(this.productDetailDescription).should('be.visible')
    cy.get(this.productDetailsPageBackBTN).contains('<- Back').should('be.visible');
    cy.url().should('include', '/inventory-item.html')

  }


  performAddAndRemoveProductFromCart(userOption) {

    if (userOption == "Product-added") {
      cy.get(this.productDetailsPageRemoveBTN).contains("REMOVE").should('be.visible').click()
      cy.get(this.productDetailsPageADDCartBTN).contains("ADD TO CART").should('be.visible')
    }
    else {

      cy.get(this.productDetailsPageADDCartBTN).contains("ADD TO CART").should('be.visible').click()
      cy.get(this.productDetailsPageRemoveBTN).contains("REMOVE").should('be.visible');
    }

  }


  verifySelectedProductDetails(prodName, prodPrice) {

    cy.get(this.productDescriptionSection).should('exist')
    cy.get(this.productDetailName).contains(prodName).should('be.visible')
    cy.get(this.productDetailPrice).contains(prodPrice).should('be.visible')
    cy.get(this.productDetailDescription).should('be.visible')
    cy.get(this.productDetailsPageBackBTN).contains('<- Back').should('be.visible');


  }


  Navigate_BacktoProductsPage() {

    cy.get(this.productDetailsPageBackBTN).contains('<- Back').should('be.visible').click()

  }

  
  navigateProductCartPage(){

    cy.get(this.productCartBTN).should('be.visible').click()

  }


  verifyCartProductDetails(prodName, prodPrice,prodQTY) {

    cy.get(this.cartPageProdDesc).should('be.visible')
    cy.get(this.productName).contains(prodName).should('be.visible')
    cy.get(this.productPrice).contains(prodPrice).should('be.visible')
    cy.get(this.cartPageQTY).contains(prodQTY).should('be.visible')
    cy.get(this.cartPageContinueBTN).contains('Continue Shopping').should('be.visible')
    cy.get(this.cartPageCheckoutBTN).contains('CHECKOUT').should('be.visible')  
    cy.get(this.cartPageRemoveBTN).contains("REMOVE").should('be.visible')

  }





  selectSortDropdown(dropdownOption) {

    cy.get(this.selectContainer).select(dropdownOption)

  }


  checkProductSortStatus(sortOption) {

    cy.log("After Clicking Sort")
    cy.get(this.productName).then($prodNameText => {
      var prodNames = Cypress._.map($prodNameText, $c => $c.innerText)
      cy.log(prodNames)
      console.log(prodNames)
      if (sortOption == "Name (A to Z)") {
        expect(prodNames).to.be.sorted({ ascending: true })
      }
      else {
        expect(prodNames).to.be.sorted({ descending: true })
      }

    })

  }


  sortProductbyPrice(sortOption) {

    cy.get(this.productPrice).then($prodpriceText => {
      var prodPrices = Cypress._.map($prodpriceText, $c => $c.innerText)
      cy.log(prodPrices)
      console.log(prodPrices)

      const specialCharRemove = str => str.replace(/[^0-9.]/g, "")
      const prodPricesNumber = prodPrices.map(specialCharRemove)
      console.log(prodPricesNumber);

      const finalProdPrices = prodPricesNumber.map(parseFloat)
      console.log(finalProdPrices);
      
      if (sortOption == "Price (low to high)") {
        expect(finalProdPrices).to.be.sorted({ ascending: true })
      }
      else {
        expect(finalProdPrices).to.be.sorted({ descending: true })
      }

    })



  }












}

export default swagLab_PageElements

