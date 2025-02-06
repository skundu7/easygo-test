Feature: User API tests for add to cart
=

  Background: Create Token
    Given User gets the token for the requests

  @api
  Scenario: Verify user is able to create an order using API and Fetch the same order
    When User Add an item to the cart
    And I create the order
    Then I can see the order created successfully

  @api
  Scenario: Verify 401-  user is not able to create an order without the Token
    When User Add an item to the cart without Token
    Then User should see 401 error

  @api
  Scenario: Verify 404 -  user is not able to add to the cart for resource not existing  bad url
    When User Add an item to the cart with invalid url
    Then User should see 404 error
